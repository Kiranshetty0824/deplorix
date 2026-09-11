import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import HeroPhone from "@/components/HeroPhone";
import AnimatedSection from "@/components/AnimatedSection";
import { divisions } from "@/data/divisions";
import { caseStudyHref, projectsForDivision } from "@/data/projects";
import { type } from "@/lib/typography";
import { trackEvent } from "@/lib/analytics";

const BASE_URL = "https://deplorixtechnologies.site";

/** Interactive phone explorer — pick a division, see the work, open the case study. */
const Explore = () => {
  const [activeId, setActiveId] = useState(divisions[0].id);
  const active = divisions.find((d) => d.id === activeId) ?? divisions[0];
  const work = projectsForDivision(active.id);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Explore Our Divisions & Work | DeploriX Technologies"
        description="Tap through DeploriX's five divisions on an interactive phone — see what each team builds, the projects we've shipped, and open the full case study."
        canonical={`${BASE_URL}/explore`}
      />
      <Navbar />

      <main className="pt-28 md:pt-36 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <span className={type.eyebrow}>Interactive Explorer</span>
            <h1 className={`mt-4 ${type.displayLg}`}>Explore what we build</h1>
            <p className={`mt-5 ${type.lead}`}>
              Pick a division, see the work it has shipped, and open the full case study.
            </p>
          </AnimatedSection>

          <div className="mt-14 grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <HeroPhone autoRotate={false} activeId={activeId} onActiveChange={setActiveId} source="explore" />
            </div>

            <div>
              {/* Division selector */}
              <div className="flex flex-wrap gap-2">
                {divisions.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setActiveId(d.id);
                      trackEvent("division_selector_click", { division: d.id, source: "explore" });
                    }}
                    className={`relative rounded-full px-4 py-2 transition-colors ${
                      d.id === activeId
                        ? `${type.pillActive} text-foreground`
                        : `${type.pillIdle} text-muted-foreground hover:text-foreground`
                    }`}
                  >
                    {d.id === activeId && (
                      <motion.span
                        layoutId="explore-pill"
                        className={`absolute inset-0 rounded-full ${d.bg} border border-border/50`}
                        transition={{ type: "spring", stiffness: 340, damping: 30 }}
                      />
                    )}
                    <span className="relative">{d.short}</span>
                  </button>
                ))}
              </div>

              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`mt-6 rounded-3xl p-7 md:p-9 ${active.bg}`}
              >
                <h2 className={type.displayMd}>{active.name}</h2>
                <p className={`mt-2 ${type.tagline}`}>{active.tagline}</p>
                <p className={`mt-4 ${type.body}`}>{active.overview}</p>

                <h3 className={`mt-7 ${type.headingXs}`}>What's included</h3>
                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  {active.subServices.map((s) => (
                    <div key={s.title} className="rounded-2xl bg-background/70 border border-border/40 px-4 py-3">
                      <p className={type.headingXs}>{s.title}</p>
                      <p className={`mt-1 ${type.bodySm}`}>{s.summary}</p>
                    </div>
                  ))}
                </div>

                {work.length > 0 && (
                  <>
                    <h3 className={`mt-7 ${type.headingXs}`}>Work we've shipped</h3>
                    <div className="mt-3 grid sm:grid-cols-2 gap-3">
                      {work.map((p) => (
                        <Link
                          key={p.slug}
                          to={caseStudyHref(active.id)}
                          onClick={() =>
                            trackEvent("proof_block_cta_click", { division: active.id, location: "explore_page" })
                          }
                          className="group rounded-2xl overflow-hidden bg-background/80 border border-border/40 hover:border-foreground/30 transition-colors"
                        >
                          <img
                            src={p.image}
                            alt={`${p.title} project screenshot`}
                            loading="lazy"
                            className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="p-4">
                            <span className={type.caption}>{p.category}</span>
                            <p className={`mt-1 ${type.headingSm}`}>{p.title}</p>
                            <p className={`mt-1 ${type.bodySm}`}>{p.summary}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                <Link
                  to={caseStudyHref(active.id)}
                  className={`mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 ${type.button} bg-foreground text-primary-foreground hover:bg-foreground/90 transition-colors`}
                >
                  Read the {active.short} case study <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
