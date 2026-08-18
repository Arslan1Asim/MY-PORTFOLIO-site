import { Suspense, lazy, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const HeroScene = lazy(() => import("./HeroScene"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

function Fallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="size-[62%] max-w-[420px] rounded-full border border-primary/25 bg-primary/5 blur-[1px]" />
      <div className="absolute size-[42%] max-w-[280px] rounded-full border border-accent/30" />
      <div className="absolute size-[24%] max-w-[160px] rounded-full bg-primary/20 blur-2xl" />
    </div>
  );
}

export function HeroVisual() {
  const reduced = useReducedMotion();
  const [state, setState] = useState<"pending" | "on" | "off">("pending");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setCompact(mobile);
    setState(supportsWebGL() && !reduced ? "on" : "off");
  }, [reduced]);

  if (state !== "on") return <Fallback />;

  return (
    <div className="absolute inset-0">
      <Suspense fallback={<Fallback />}>
        <HeroScene compact={compact} />
      </Suspense>
    </div>
  );
}
