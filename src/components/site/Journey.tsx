import { journey } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="05 / Journey"
          title="Each layer was added because the previous one wasn't enough."
          description="Not a résumé timeline, the actual order in which the skills stacked up."
        />

        <ol className="relative mt-14 border-l border-border pl-6 sm:pl-10">
          {journey.map((stage, i) => (
            <li key={stage.id} className="relative pb-10 last:pb-0">
              <Reveal delay={i * 0.05}>
                <span
                  className="absolute top-1.5 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-primary ring-4 ring-background sm:-left-[calc(2.5rem+5px)]"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold sm:text-2xl">{stage.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  {stage.detail}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
