import { useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { contact } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal, SectionHeading } from "./Reveal";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          _subject: `Portfolio message from ${values.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };


  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="aurora-bg absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="06 / Contact" title={contact.headline} description={contact.blurb} />

            <Reveal delay={0.1}>
              <div className="mt-10 space-y-3">
                <div className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
                  <Mail className="size-4 text-primary" aria-hidden="true" />
                  <span className="font-mono text-sm text-muted-foreground">{contact.email}</span>
                </div>
                {contact.links.map((link) => (
                  <div
                    key={link.label}
                    className="glass-panel flex items-center justify-between gap-3 rounded-2xl px-4 py-3"
                  >
                    <span className="text-sm font-medium">{link.label}</span>
                    {link.url ? (
                      <a
                        href={link.url}
                        className="font-mono text-xs text-primary underline-offset-4 hover:underline"
                      >
                        {link.handle}
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-muted-foreground">{link.handle}</span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form onSubmit={onSubmit} noValidate className="surface-panel rounded-3xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    value={values.name}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    placeholder="Your name"
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className="text-xs text-destructive">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    placeholder="you@example.com"
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className="text-xs text-destructive">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  rows={6}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  placeholder="What would you like to build or talk about?"
                />
                {errors.message ? (
                  <p id="contact-message-error" className="text-xs text-destructive">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button type="submit" disabled={status === "sending"} className="rounded-full">
                  {status === "sending" ? "Sending…" : "Send"}
                  <Send className="size-4" aria-hidden="true" />
                </Button>
                <p aria-live="polite" className="text-sm">
                  {status === "success" ? (
                    <span className="text-signal">
                      Thanks, your message is on its way to my inbox.
                    </span>
                  ) : null}
                  {status === "error" ? (
                    <span className="text-destructive">
                      Something went wrong. Fix any fields above, or email me directly at{" "}
                      {contact.email}.
                    </span>
                  ) : null}

                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
