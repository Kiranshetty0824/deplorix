import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { divisions } from "@/data/divisions";
import { caseStudyHref, projectsForDivision } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";

type Props = {
  /** Pause the auto-rotation (used on the explore page where the user drives it). */
  autoRotate?: boolean;
  /** Controlled active division id. */
  activeId?: string;
  onActiveChange?: (id: string) => void;
  source?: string;
};

/**
 * Floating 3D phone mockup. Cycles through the service divisions, showing what
 * each division does plus real work we've shipped, each linking to its case study.
 */
const HeroPhone = ({ autoRotate = true, activeId, onActiveChange, source = "hero" }: Props) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const controlledIndex = activeId ? divisions.findIndex((d) => d.id === activeId) : -1;
  const index = controlledIndex >= 0 ? controlledIndex : internalIndex;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [18, -6]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-10, 12]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (!autoRotate) return;
    const t = setInterval(() => setInternalIndex((i) => (i + 1) % divisions.length), 4600);
    return () => clearInterval(t);
  }, [autoRotate]);

  const active = divisions[index];
  const work = projectsForDivision(active.id);

  const select = (i: number) => {
    setInternalIndex(i);
    onActiveChange?.(divisions[i].id);
    trackEvent("hero_phone_division_click", { division: divisions[i].id, source });
  };

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
      <div className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full bg-secondary blur-3xl opacity-70" aria-hidden />

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
          className="relative w-[240px] h-[500px] sm:w-[268px] sm:h-[556px] rounded-[3rem] p-[10px] bg-foreground"
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
                className="px-4 pt-5 pb-16 h-full overflow-hidden"
              >
                <div className={`w-11 h-11 rounded-2xl ${active.iconBg} flex items-center justify-center`}>
                  <active.icon size={20} className="text-foreground" />
                </div>
                <p className="mt-3 text-lg font-bold tracking-tight text-foreground leading-tight">{active.name}</p>
                <p className="mt-1 text-[12px] text-muted-foreground leading-snug">{active.tagline}</p>

                <div className="mt-3 space-y-1.5">
                  {active.subServices.slice(0, 2).map((s) => (
                    <div key={s.title} className="rounded-xl bg-secondary px-3 py-1.5">
                      <p className="text-[12px] font-semibold text-foreground leading-tight">{s.title}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Our work
                </p>
                <div className="mt-2 space-y-2">
                  {work.length > 0
                    ? work.slice(0, 2).map((p) => (
                        <Link
                          key={p.slug}
                          to={caseStudyHref(active.id)}
                          onClick={() =>
                            trackEvent("hero_phone_work_click", { division: active.id, project: p.slug, source })
                          }
                          className="flex items-center gap-2 rounded-xl border border-border/60 p-1.5 hover:border-foreground/40 transition-colors"
                        >
                          <img
                            src={p.image}
                            alt={`${p.title} screenshot`}
                            loading="lazy"
                            className="h-10 w-14 rounded-lg object-cover"
                          />
                          <span className="min-w-0">
                            <span className="block text-[12px] font-semibold text-foreground leading-tight truncate">
                              {p.title}
                            </span>
                            <span className="block text-[10px] text-muted-foreground leading-tight truncate">
                              {p.category}
                            </span>
                          </span>
                        </Link>
                      ))
                    : active.work.slice(0, 2).map((w) => (
                        <Link
                          key={w.title}
                          to={caseStudyHref(active.id)}
                          className="block rounded-xl border border-border/60 px-3 py-2 hover:border-foreground/40 transition-colors"
                        >
                          <p className="text-[12px] font-semibold text-foreground leading-tight">{w.title}</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">{w.type}</p>
                        </Link>
                      ))}
                </div>

                <Link
                  to={caseStudyHref(active.id)}
                  onClick={() => trackEvent("hero_phone_cta_click", { division: active.id, source })}
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[12px] font-semibold text-primary-foreground hover:bg-foreground/90 transition-colors"
                >
                  See case study <ArrowRight size={13} />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Tab bar */}
            <div className="absolute bottom-0 inset-x-0 border-t border-border/60 bg-background/90 backdrop-blur px-4 py-3 flex justify-center gap-1.5">
              {divisions.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  aria-label={d.name}
                  onClick={() => select(i)}
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
