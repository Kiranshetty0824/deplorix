import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { divisions } from "@/data/divisions";

/**
 * Floating 3D phone mockup shown beside the hero headline.
 * Cycles through the service divisions, each screen also showing sample work.
 */
const HeroPhone = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [18, -6]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-10, 12]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % divisions.length), 4200);
    return () => clearInterval(t);
  }, []);

  const active = divisions[index];

  const handleMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative flex items-center justify-center"
      style={{ perspective: 1200 }}
    >
      {/* Ambient glow */}
      <div className="absolute w-72 h-72 rounded-full bg-secondary blur-3xl opacity-70" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 60, rotateY: 24 }}
        animate={{ opacity: 1, y: [0, -14, 0], rotateY: 0 }}
        transition={{
          opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          rotateY: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Phone body */}
        <div
          className="relative w-[268px] h-[556px] rounded-[3rem] p-[10px] bg-foreground"
          style={{ boxShadow: "0 45px 80px -30px hsl(0 0% 0% / 0.55), 0 0 0 1px hsl(0 0% 0% / 0.25)" }}
        >
          {/* Side buttons */}
          <span className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-foreground/70" />
          <span className="absolute -left-[3px] top-44 h-14 w-[3px] rounded-l bg-foreground/70" />
          <span className="absolute -right-[3px] top-40 h-16 w-[3px] rounded-r bg-foreground/70" />

          {/* Screen */}
          <div className="relative h-full w-full rounded-[2.5rem] bg-background overflow-hidden">
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-foreground z-20" />

            {/* Status bar */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-4 text-[11px] font-semibold text-foreground">
              <span>9:41</span>
              <span className="tracking-widest">DEPLORIX</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="px-5 pt-6"
              >
                <div className={`w-11 h-11 rounded-2xl ${active.iconBg} flex items-center justify-center`}>
                  <active.icon size={20} className="text-foreground" />
                </div>
                <p className="mt-4 text-lg font-bold tracking-tight text-foreground leading-tight">{active.name}</p>
                <p className="mt-1 text-[12px] text-muted-foreground leading-snug">{active.tagline}</p>

                <div className="mt-4 space-y-2">
                  {active.subServices.slice(0, 3).map((s) => (
                    <div key={s.title} className="rounded-xl bg-secondary px-3 py-2">
                      <p className="text-[12px] font-semibold text-foreground leading-tight">{s.title}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Recent work
                </p>
                <div className="mt-2 space-y-2">
                  {active.work.slice(0, 2).map((w) => (
                    <div
                      key={w.title}
                      className="rounded-xl border border-border/60 px-3 py-2"
                    >
                      <p className="text-[12px] font-semibold text-foreground leading-tight">{w.title}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">{w.type}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tab bar */}
            <div className="absolute bottom-0 inset-x-0 border-t border-border/60 bg-background/90 backdrop-blur px-4 py-3 flex justify-center gap-1.5">
              {divisions.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  aria-label={d.name}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-foreground" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating stat chips */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          style={{ transform: "translateZ(60px)" }}
          className="absolute -left-10 top-24 hidden lg:block glass-card px-4 py-3"
        >
          <p className="text-xl font-bold tracking-tight text-foreground">5</p>
          <p className="text-[11px] text-muted-foreground">Divisions</p>
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          style={{ transform: "translateZ(60px)" }}
          className="absolute -right-10 bottom-28 hidden lg:block glass-card px-4 py-3"
        >
          <p className="text-xl font-bold tracking-tight text-foreground">50+</p>
          <p className="text-[11px] text-muted-foreground">Projects shipped</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroPhone;
