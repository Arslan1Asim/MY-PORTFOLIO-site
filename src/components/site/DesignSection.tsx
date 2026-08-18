import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { designPractice, projects } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function DesignSection() {
  const umtProject = projects.find((p) => p.id === "umt-website-prototype");

  return (
    <section id="uiux" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="04 / UI/UX"
          title="I design the thing before I build the thing."
          description="Figma is where the structure gets decided: flows, wireframes, components, then a prototype that can be clicked and criticised."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {designPractice.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="glass-panel h-full rounded-2xl p-5">
                <p className="font-display text-sm font-semibold text-primary">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {umtProject ? (
          <Reveal delay={0.1}>
            <motion.a
              href="#umt-website-prototype"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="surface-panel group mt-8 flex flex-col overflow-hidden rounded-3xl sm:flex-row"
            >
              {umtProject.images?.[0] ? (
                <div className="relative aspect-[4/3] w-full sm:aspect-auto sm:w-2/5">
                  <img
                    src={umtProject.images[0].src}
                    alt={umtProject.images[0].alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 sm:to-surface/60" />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <span className="eyebrow">{umtProject.category}</span>
                <h3 className="mt-3 text-lg font-semibold">{umtProject.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{umtProject.tagline}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary">
                  View full case in Projects
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

