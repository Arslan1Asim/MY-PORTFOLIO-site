import { GraduationCap } from "lucide-react";
import { education, profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="01 / About"
          title="Technical problem solving, with the interface taken seriously."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-5">
            {profile.about.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="surface-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <div
                className="absolute -top-24 -right-16 size-56 rounded-full bg-primary/15 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative flex items-center gap-4">
                <div className="relative shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-2 size-16">
                  <img
                    src={profile.photo}
                    alt={`${profile.name} profile photo`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.role}</p>
                </div>
              </div>

              <div className="relative mt-8">
                <p className="eyebrow flex items-center gap-2">
                  <GraduationCap className="size-3.5" aria-hidden="true" />
                  Education
                </p>
                <ul className="mt-4 space-y-4">
                  {education.map((item) => (
                    <li key={item.degree} className="border-l border-border pl-4">
                      <p className="text-sm font-medium text-foreground">{item.degree}</p>
                      <p className="text-sm text-muted-foreground">{item.school}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground/80">
                        {item.period}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
