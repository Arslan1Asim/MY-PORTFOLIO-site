import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <div className="aurora-bg absolute inset-0 -z-20" aria-hidden="true" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <motion.div
        style={{ y: visualY }}
        className="pointer-events-none absolute top-[18%] right-[-22%] -z-10 aspect-square w-[92vw] max-w-[560px] opacity-70 sm:top-1/2 sm:right-[-8%] sm:w-[62vw] sm:-translate-y-1/2 sm:opacity-90 lg:right-[2%] lg:w-[46vw]"
      >
        <div className="relative h-full w-full">
          <HeroVisual />
        </div>
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: fade }}
        className="mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="glass-panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            {profile.status}
          </span>

          <h1 className="mt-7 text-4xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{profile.headline}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            {profile.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group rounded-full">
              <a href="#projects">
                View My Work
                <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="group rounded-full bg-transparent">
              <a href="#contact">
                Let&apos;s Connect
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {profile.highlights.map((item) => (
              <div key={item.label}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-1.5 text-sm text-foreground/90">{item.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}
