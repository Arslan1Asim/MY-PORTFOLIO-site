import { motion } from "motion/react";
import { Brain, Code2, PenTool } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

const icons: Record<string, LucideIcon> = {
  ai: Brain,
  dev: Code2,
  design: PenTool,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-72 bg-accent/5 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="02 / Skills"
          title="Three toolkits that keep overlapping."
          description="No invented proficiency scores, just the tools I actually work in, grouped by how I use them."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = icons[group.id] ?? Code2;
            return (
              <Reveal key={group.id} delay={gi * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="surface-panel group h-full rounded-3xl p-6 transition-colors hover:border-primary/40"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary transition-colors group-hover:border-primary/50">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{group.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{group.blurb}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-surface-2/60 px-3 py-1.5 text-xs text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
