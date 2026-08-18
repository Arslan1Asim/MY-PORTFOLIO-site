/**
 * Mock knowledge base for the portfolio agent.
 *
 * NOTE: these are scripted responses, not a live AI model. To connect a real
 * model later, replace `getAgentReply` with a call to your backend endpoint —
 * the chat UI already handles loading and error states.
 */
import { contact, education, profile, projects, skillGroups } from "@/data/portfolio";

export const suggestedQuestions = [
  "Who is Arslan?",
  "What technologies does he use?",
  "Tell me about the Mobile Price Predictor project",
  "What UI/UX work has he done?",
  "How can I contact Arslan?",
  "How much do you charge per hour?",
  "What services do you offer?",
  "Are you available for freelance work?",
];


type Rule = { keywords: string[]; answer: () => string };

const rules: Rule[] = [
  {
    keywords: ["who", "about", "background", "yourself", "arslan is"],
    answer: () =>
      `${profile.name} is a Computer Science graduate working across AI, machine learning, prompt engineering and UI/UX design. ${profile.about[0]}`,
  },
  {
    keywords: ["education", "study", "degree", "university", "school"],
    answer: () => education.map((e) => `• ${e.degree}, ${e.school} (${e.period})`).join("\n"),
  },
  {
    keywords: ["mobile price", "price predictor", "phone price", "random forest"],
    answer: () => {
      const p = projects.find((x) => x.id === "mobile-price-predictor")!;
      return `${p.title}: ${p.tagline}\n\n${p.approach.map((a) => `• ${a}`).join("\n")}\n\nOutcome: ${p.outcome}`;
    },
  },
  {
    keywords: ["flyrank", "ml project", "machine learning project", "data analysis"],
    answer: () => {
      const p = projects.find((x) => x.id === "flyrank")!;
      return `${p.title}: ${p.tagline}\n\n${p.approach.map((a) => `• ${a}`).join("\n")}\n\nOutcome: ${p.outcome}`;
    },
  },
  {
    keywords: ["travel", "umt", "project", "built", "portfolio work"],
    answer: () =>
      `Current projects on the site:\n${projects.map((p) => `• ${p.title}, ${p.category}`).join("\n")}\n\nOpen the Projects section for the full problem → approach → outcome breakdown.`,
  },
  {
    keywords: ["ui", "ux", "figma", "design", "wireframe", "prototype"],
    answer: () => {
      const umt = projects.find((x) => x.id === "umt-website-prototype");
      return umt
        ? `Design is a core part of his work: Figma, UI design, UX, wireframing and prototyping. See the full ${umt.title} case study in the Projects section.`
        : "Design is a core part of his work: Figma, UI design, UX, wireframing and prototyping.";
    },
  },
  {
    keywords: ["tech", "skill", "stack", "tools", "language", "python", "react"],
    answer: () =>
      skillGroups.map((g) => `${g.title}: ${g.items.join(", ")}`).join("\n\n"),
  },
  {
    keywords: ["contact", "email", "hire", "reach", "connect", "linkedin", "github"],
    answer: () =>
      `You can reach him through the Contact section. Email: ${contact.email}. Links: ${contact.links.map((l) => `${l.label} (${l.handle})`).join(", ")}.`,
  },
  {
    keywords: ["charge", "rate", "price", "cost", "hourly", "per hour", "budget", "quote"],
    answer: () =>
      "It usually depends on the type of work. Hit me up and I can have a look at your requirements, then I can quote you the service charges.",
  },
  {
    keywords: ["services", "service", "offer", "what do you do", "work you do"],
    answer: () =>
      "He offers services across AI and machine learning, prompt engineering, UI/UX design in Figma, wireframing, prototyping, and front end web development with React.",
  },
  {
    keywords: ["available", "freelance", "internship", "collaborate", "part time", "full time", "remote"],
    answer: () =>
      "He is open to freelance projects, internships, collaborations, and remote work. Send your requirements through the Contact section and he will get back to you.",
  },
  {
    keywords: ["ai agent", "prompt", "agents", "llm"],
    answer: () =>
      "He works on prompt engineering and AI agents, structuring instructions, constraints and evaluation so a model produces something dependable rather than just plausible.",
  },
];


export function getAgentReply(input: string): string {
  const q = input.toLowerCase();
  const hit = rules.find((rule) => rule.keywords.some((k) => q.includes(k)));
  if (hit) return hit.answer();
  return `I can answer questions about Arslan's background, skills, projects, UI/UX work, availability, rates, services and how to get in touch. Try one of the suggested questions below.`;
}

