import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { projectFilters, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./Reveal";

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="03 / Projects"
          title="Work, written as problem → approach → outcome."
          description="Where a result or link doesn't exist yet, the placeholder stays visible rather than being filled with fiction."
        />

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="mt-10 inline-flex flex-wrap gap-1 rounded-full border border-border bg-surface/60 p-1"
          >
            {projectFilters.map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  filter === item ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {filter === item ? (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{item}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="surface-panel group relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8"
              >
                <div
                  className="pointer-events-none absolute -top-32 -right-24 size-64 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <span className="eyebrow">{project.category}</span>
                    <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{project.tagline}</p>
                  </div>
                </div>

                {project.images?.length ? (
                  <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                    {project.images.map((image, index) => (
                      <div
                        key={image.src}
                        className={cn(
                          "overflow-hidden rounded-2xl border border-border bg-surface-2/40",
                          index === 0 && "sm:col-span-2",
                        )}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative mt-6 flex aspect-[16/7] items-center justify-center rounded-2xl border border-dashed border-border bg-surface-2/40 px-4 text-center font-mono text-[11px] text-muted-foreground">
                    {project.imageNote}
                  </div>
                )}


                <div className="relative mt-7 space-y-5 text-sm">
                  <div>
                    <p className="eyebrow">Problem</p>
                    <p className="mt-2 text-muted-foreground">{project.problem}</p>
                  </div>
                  <div>
                    <p className="eyebrow">What I did</p>
                    <ul className="mt-2 space-y-1.5">
                      {project.approach.map((step) => (
                        <li key={step} className="flex gap-2.5 text-muted-foreground">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow">Outcome</p>
                    <p className="mt-2 text-muted-foreground">{project.outcome}</p>
                  </div>
                </div>

                <ul className="relative mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">
            No projects in this category yet, UI/UX work lives in the section below.
          </p>
        ) : null}
      </div>
    </section>
  );
}
