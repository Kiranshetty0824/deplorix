import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Sparkle, RefreshCw } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { divisions, getDivision } from "@/data/divisions";
import { type } from "@/lib/typography";
import { trackEvent } from "@/lib/analytics";
import { openInquiry } from "./ServiceInquiryForm";
import { setServiceContext } from "@/lib/service-context";

type Brief = {
  divisionId: string;
  divisionReason: string;
  recommendedServices: { title: string; why: string }[];
  goals: string[];
  scope: string[];
  phases: { name: string; detail: string; duration: string }[];
  timeline: string;
  nextStep: string;
  briefText: string;
};

const audiences = ["Business", "Startup", "Student", "Institution"];
const budgets = ["Under ₹25k", "₹25k – ₹1L", "₹1L – ₹5L", "Above ₹5L", "Not sure yet"];
const timelines = ["ASAP", "2–4 weeks", "1–3 months", "Flexible"];

const Chips = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <p className={type.caption}>{label}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(active ? "" : o)}
            className={`rounded-full px-3.5 py-1.5 border transition-colors duration-300 ${
              active
                ? `bg-foreground text-background border-transparent ${type.pillActive}`
                : `text-muted-foreground hover:text-foreground border-border/60 ${type.pillIdle}`
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  </div>
);

const ProjectAdvisor = () => {
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brief, setBrief] = useState<Brief | null>(null);

  const division = brief ? getDivision(brief.divisionId) ?? divisions[0] : null;

  const generate = async () => {
    if (description.trim().length < 20) {
      setError("Please describe your project in at least 20 characters.");
      return;
    }
    setLoading(true);
    setError(null);
    setBrief(null);
    trackEvent("advisor_generate", { audience, budget, timeline });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/project-advisor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ description, audience, budget, timeline }),
        }
      );
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? "We couldn't generate your brief just now. Please try again.");
        return;
      }
      setBrief(data.brief as Brief);
      const d = getDivision(data.brief.divisionId);
      if (d) {
        setServiceContext({
          divisionId: d.id,
          service: data.brief.recommendedServices?.[0]?.title,
        });
      }
      trackEvent("advisor_result", { division: data.brief.divisionId });
    } catch {
      setError("We couldn't reach the advisor. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendAsRequest = () => {
    if (!brief || !division) return;
    trackEvent("advisor_send_request", { division: division.id });
    openInquiry(division.id, {
      service: brief.recommendedServices[0]?.title,
      message: brief.briefText,
    });
  };

  return (
    <section id="advisor" className="section-padding scroll-mt-28">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <span className={type.eyebrow}>AI Project Advisor</span>
          <h2 className={`mt-4 ${type.displayLg}`}>Describe it. Get a plan.</h2>
          <p className={`mt-6 ${type.lead} max-w-2xl mx-auto`}>
            Tell us what you're trying to build or grow. You'll get a matched Deplorix division,
            the exact services involved, and a short project brief you can send straight to us.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-3xl bg-secondary/40 border border-border/50 p-6 md:p-10">
            <Label htmlFor="advisor-input" className={type.label}>
              What do you need?
            </Label>
            <Textarea
              id="advisor-input"
              rows={4}
              maxLength={1200}
              className="mt-2 bg-background"
              placeholder="e.g. We run a dental clinic in Bangalore and want an online booking site with reminders, plus help getting found on Google."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="mt-6 grid sm:grid-cols-3 gap-6">
              <Chips label="You are" options={audiences} value={audience} onChange={setAudience} />
              <Chips label="Budget" options={budgets} value={budget} onChange={setBudget} />
              <Chips label="Timeline" options={timelines} value={timeline} onChange={setTimeline} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={generate}
                disabled={loading}
                className="rounded-full gap-2 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Building your brief…
                  </>
                ) : (
                  <>
                    <Sparkle size={16} /> Get my recommendation
                  </>
                )}
              </Button>
              {brief && !loading && (
                <Button variant="ghost" onClick={generate} className="rounded-full gap-2">
                  <RefreshCw size={14} /> Try again
                </Button>
              )}
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-destructive">
                {error}
              </p>
            )}

            {loading && (
              <div className="mt-8 space-y-3" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-4 rounded-full bg-border/60 animate-pulse"
                    style={{ width: `${90 - i * 18}%` }}
                  />
                ))}
              </div>
            )}

            <AnimatePresence>
              {brief && division && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`mt-8 rounded-3xl p-6 md:p-8 ${division.bg}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${division.iconBg} flex items-center justify-center shrink-0`}
                    >
                      <division.icon size={22} className="text-foreground" />
                    </div>
                    <div>
                      <p className={type.caption}>Best fit</p>
                      <h3 className={`mt-1 ${type.displayMd}`}>{division.name}</h3>
                      <p className={`mt-2 ${type.body}`}>{brief.divisionReason}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    {brief.recommendedServices?.map((s) => (
                      <div
                        key={s.title}
                        className="rounded-2xl bg-background/70 border border-border/40 p-5"
                      >
                        <p className={type.headingSm}>{s.title}</p>
                        <p className={`mt-1.5 ${type.bodySm}`}>{s.why}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <p className={type.headingXs}>Goals</p>
                      <ul className={`mt-2 space-y-1.5 ${type.bodySm}`}>
                        {brief.goals?.map((g) => (
                          <li key={g} className="flex gap-2">
                            <span className="text-foreground">—</span>
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className={type.headingXs}>Suggested scope</p>
                      <ul className={`mt-2 space-y-1.5 ${type.bodySm}`}>
                        {brief.scope?.map((s) => (
                          <li key={s} className="flex gap-2">
                            <span className="text-foreground">—</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className={type.headingXs}>How we'd run it</p>
                    <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {brief.phases?.map((p, i) => (
                        <div
                          key={p.name}
                          className="rounded-2xl bg-background/70 border border-border/40 p-4"
                        >
                          <p className={type.caption}>Phase {i + 1}</p>
                          <p className={`mt-1 ${type.headingSm}`}>{p.name}</p>
                          <p className={`mt-1 ${type.bodySm}`}>{p.detail}</p>
                          <p className="mt-2 text-xs font-semibold text-foreground">{p.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                    <div>
                      <p className={type.caption}>Estimated timeline</p>
                      <p className={type.metricValue}>{brief.timeline}</p>
                    </div>
                    <div className="max-w-md">
                      <p className={type.caption}>Next step</p>
                      <p className={`mt-1 ${type.bodySm}`}>{brief.nextStep}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Button size="lg" onClick={sendAsRequest} className="rounded-full gap-2 font-semibold">
                      Send this as my request <ArrowRight size={16} />
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full font-semibold bg-background/70"
                    >
                      <Link
                        to={`/work/${division.id}`}
                        onClick={() => trackEvent("advisor_work_click", { division: division.id })}
                      >
                        See relevant work
                      </Link>
                    </Button>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    This recommendation is AI-generated from our real service list. A human from the
                    team confirms scope and timelines before anything starts.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProjectAdvisor;
