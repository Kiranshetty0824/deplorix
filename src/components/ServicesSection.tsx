import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { divisions, type Division, type SubService } from "@/data/divisions";
import { divisionExtras } from "@/data/division-extras";
import { openInquiry } from "./ServiceInquiryForm";
import { type as typo } from "@/lib/typography";
import { trackEvent } from "@/lib/analytics";


const SubServiceCard = ({ item, index }: { item: SubService; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl bg-background/70 border border-border/40 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 text-left p-5"
        aria-expanded={open}
      >
        <span>
          <span className={`block ${typo.headingSm}`}>{item.title}</span>
          <span className={`mt-1 block ${typo.bodySm}`}>{item.summary}</span>
        </span>
        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="px-5 pb-5 space-y-2 border-t border-border/40 pt-4">
              {item.includes.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check size={14} className="mt-0.5 shrink-0 text-foreground" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ImpactMetrics = ({ divisionId }: { divisionId: string }) => {
  const extras = divisionExtras[divisionId];
  if (!extras) return null;
  return (
    <div className="grid grid-cols-3 gap-3">
      {extras.metrics.map((m) => (
        <div key={m.label} className="rounded-2xl bg-background/70 border border-border/40 p-5 text-center">
          <p className={typo.metricValue}>{m.value}</p>
          <p className={`mt-1 ${typo.metricLabel}`}>{m.label}</p>
        </div>
      ))}
    </div>
  );
};

const Testimonial = ({ divisionId }: { divisionId: string }) => {
  const extras = divisionExtras[divisionId];
  if (!extras) return null;
  return (
    <blockquote className="rounded-2xl bg-background/70 border border-border/40 p-6">
      <p className={typo.quote}>“{extras.testimonial.quote}”</p>
      <footer className={`mt-4 ${typo.bodySm}`}>
        <span className="font-semibold text-foreground">{extras.testimonial.author}</span> — {extras.testimonial.role}
      </footer>
    </blockquote>
  );
};

const RelevantWork = ({ division }: { division: Division }) => (
  <div>
    <div className="flex items-center justify-between gap-4 mb-3">
      <h4 className={typo.headingXs}>See relevant work</h4>
      <Link
        to={`/work/${division.id}`}
        onClick={() =>
          trackEvent("proof_block_cta_click", { division: division.id, location: "services_proof_block" })
        }
        className={`inline-flex items-center gap-1.5 ${typo.link} hover:gap-2.5 transition-all duration-300`}
      >
        View case studies <ArrowRight size={14} />
      </Link>
    </div>
    <div className="grid sm:grid-cols-3 gap-3">
      {division.work.map((w) => (
        <div key={w.title} className="rounded-2xl bg-background/70 border border-border/40 p-4">
          <span className={typo.caption}>{w.type}</span>
          <p className={`mt-1 ${typo.headingSm}`}>{w.title}</p>
          <p className={`mt-1 ${typo.bodySm}`}>{w.note}</p>
        </div>
      ))}
    </div>
  </div>
);

const ServicesSection = () => {
  const [activeId, setActiveId] = useState(divisions[0].id);
  const [selected, setSelected] = useState<Division | null>(null);
  const active = divisions.find((d) => d.id === activeId) ?? divisions[0];

  return (
    <section id="products" className="section-padding bg-surface-elevated">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className={typo.eyebrow}>Our Divisions</span>
          <h2 className={`mt-4 ${typo.displayLg}`}>Five divisions. One standard.</h2>
          <p className={`mt-6 ${typo.lead} max-w-2xl mx-auto`}>
            Each division runs its own specialised services — built, staffed, and delivered end-to-end by Deplorix.
          </p>
        </AnimatedSection>

        {/* Division selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {divisions.map((d) => {
            const isActive = d.id === activeId;
            return (
              <button
                key={d.id}
                onClick={() => {
                  setActiveId(d.id);
                  trackEvent("division_selector_click", { division: d.id, location: "services_section" });
                }}
                className={`relative rounded-full px-5 py-2.5 transition-colors duration-300 ${
                  isActive ? `text-background ${typo.pillActive}` : `text-muted-foreground hover:text-foreground ${typo.pillIdle}`
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="division-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-foreground"
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <d.icon size={15} />
                  {d.short}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active division panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-3xl p-8 md:p-12 border border-transparent ${active.bg}`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className={`w-14 h-14 rounded-2xl ${active.iconBg} flex items-center justify-center mb-6`}>
                  <active.icon size={24} className="text-foreground" />
                </div>
                <h3 className={typo.displayMd}>{active.name}</h3>
                <p className={`mt-2 ${typo.tagline}`}>{active.tagline}</p>
                <p className={`mt-4 ${typo.body}`}>{active.blurb}</p>
              </div>

              <button
                onClick={() => {
                  setSelected(active);
                  trackEvent("proof_block_cta_click", { division: active.id, location: "explore_division" });
                }}
                className={`inline-flex items-center gap-1.5 self-start ${typo.link} hover:gap-2.5 transition-all duration-300`}
              >
                Explore this division
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-3">
              {active.subServices.map((s, i) => (
                <SubServiceCard key={s.title} item={s} index={i} />
              ))}
            </div>

            <div className="mt-10">
              <ImpactMetrics divisionId={active.id} />
            </div>

            <div className="mt-6">
              <RelevantWork division={active} />
            </div>

            <div className="mt-6">
              <Testimonial divisionId={active.id} />
            </div>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-background/70 border border-border/40 p-6">
              <p className="text-base font-serif italic text-foreground">{active.cta}</p>
              <button
                type="button"
                onClick={() => {
                  trackEvent("proof_block_cta_click", { division: active.id, location: "division_cta" });
                  openInquiry(active.id);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-foreground text-primary-foreground hover:bg-foreground/90 transition-colors shrink-0"
              >
                {active.ctaLabel} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-2xl ${selected.iconBg} flex items-center justify-center shrink-0`}>
                    <selected.icon size={24} />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold">{selected.name}</DialogTitle>
                    <DialogDescription className="mt-1 font-serif italic">
                      {selected.tagline}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-2 space-y-6">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Overview</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.overview}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Everything included</h4>
                  <div className="space-y-3">
                    {selected.subServices.map((s) => (
                      <div key={s.title} className="rounded-xl bg-secondary/30 p-4">
                        <p className="text-base font-semibold text-foreground">{s.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{s.summary}</p>
                        <ul className="mt-3 space-y-1.5">
                          {s.includes.map((line) => (
                            <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Check size={14} className="mt-0.5 shrink-0 text-foreground" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Who it's for</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.audience}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">How we work</h4>
                  <ol className="space-y-2">
                    {selected.process.map((step, i) => (
                      <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-[11px] font-semibold text-foreground shrink-0">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">See relevant work</h4>
                  <div className="space-y-2">
                    {selected.work.map((w) => (
                      <div key={w.title} className="flex items-start gap-3 rounded-xl bg-secondary/30 p-3">
                        <Badge variant="secondary" className="shrink-0">{w.type}</Badge>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{w.title}</p>
                          <p className="text-sm text-muted-foreground">{w.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-sm font-serif italic text-foreground">{selected.cta}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const id = selected.id;
                      setSelected(null);
                      openInquiry(id);
                    }}
                    className="inline-flex items-center justify-center gap-2 flex-1 rounded-full px-6 py-3 text-sm font-semibold bg-foreground text-primary-foreground hover:bg-foreground/90 transition-colors"
                  >
                    {selected.ctaLabel} <ArrowRight size={16} />
                  </button>
                  <Link
                    to={`/work/${selected.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-border/60 text-foreground hover:bg-secondary transition-colors"
                  >
                    View case studies
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;
