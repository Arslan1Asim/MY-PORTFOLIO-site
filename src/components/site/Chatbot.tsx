import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageSquareText, Send, X } from "lucide-react";
import { getAgentReply, suggestedQuestions } from "@/lib/agent-responses";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = { id: string; role: "user" | "agent"; text: string };

const welcome: Message = {
  id: "welcome",
  role: "agent",
  text: `Hi, I'm ${profile.name}'s portfolio assistant. Ask me about his background, skills, projects or how to get in touch.`,
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || loading) return;
    setError(null);
    setInput("");
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", text }]);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 650));
      const reply = getAgentReply(text);
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "agent", text: reply }]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-expanded={open}
        aria-controls="portfolio-agent"
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        className="fixed right-4 bottom-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_20px_45px_-20px_rgba(0,0,0,0.9)] sm:right-6 sm:bottom-6"
      >
        {open ? <X className="size-6" /> : <MessageSquareText className="size-6" />}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="portfolio-agent"
            role="dialog"
            aria-label="Portfolio assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="surface-panel fixed right-4 bottom-22 z-50 flex h-[min(70vh,540px)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl sm:right-6 sm:bottom-24"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <MessageSquareText className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">Portfolio Assistant</p>
                <p className="text-[11px] text-muted-foreground">
                  Scripted answers, not a live AI model yet
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[92%] text-sm whitespace-pre-line text-foreground/90"
                  }
                >
                  {m.text}
                </div>
              ))}

              {loading ? (
                <div className="flex gap-1.5 py-1" aria-live="polite" aria-label="Assistant is typing">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-1.5 rounded-full bg-muted-foreground"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              ) : null}

              {error ? <p className="text-sm text-destructive">{error}</p> : null}
            </div>

            <div className="border-t border-border px-4 py-3">
              <ul className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {suggestedQuestions.map((q) => (
                  <li key={q}>
                    <button
                      type="button"
                      onClick={() => void ask(q)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs whitespace-nowrap text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {q}
                    </button>
                  </li>
                ))}
              </ul>

              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <label htmlFor="agent-input" className="sr-only">
                  Ask the portfolio assistant a question
                </label>
                <Input
                  id="agent-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question…"
                  className="rounded-full"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="size-10 shrink-0 rounded-full"
                >
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
