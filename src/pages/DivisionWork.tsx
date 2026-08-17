import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import AnimatedSection from "@/components/AnimatedSection";
import { getDivision } from "@/data/divisions";
import { divisionExtras } from "@/data/division-extras";

const BASE_URL = "https://deplorixtechnologies.site";

const DivisionWork = () => {
  const { divisionId = "" } = useParams();
  const division = getDivision(divisionId);
  const extras = divisionExtras[divisionId];

  if (!division || !extras) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={extras.seo.title}
        description={extras.seo.description}
        canonical={`${BASE_URL}/work/${division.id}`}
      />
      <Navbar />

      <main className="pt-28 md:pt-36 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Back to divisions
          </Link>

          <AnimatedSection className="mt-8">
            <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Relevant Work — {division.name}
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              {division.tagline}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{extras.intro}</p>
          </AnimatedSection>

          {/* Impact metrics */}
          <AnimatedSection className="mt-12">
            <div className={`grid sm:grid-cols-3 gap-4 rounded-3xl p-6 md:p-8 ${division.bg}`}>
              {extras.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl bg-background/70 border border-border/40 p-5 text-center">
                  <p className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{m.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Case studies */}
          <div className="mt-14 space-y-6">
            {extras.caseStudies.map((cs, i) => (
              <AnimatedSection key={cs.slug} delay={i * 0.08}>
                <article className="rounded-3xl border border-border/50 bg-surface-elevated p-8 md:p-10">
                  <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
                    {cs.type}
                  </span>
                  <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {cs.title}
                  </h2>
                  <p className="mt-4 text-base text-muted-foreground leading-relaxed">{cs.challenge}</p>

                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">What we did</h3>
                      <ul className="space-y-2">
                        {cs.approach.map((line) => (
                          <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check size={14} className="mt-0.5 shrink-0 text-foreground" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">Outcome</h3>
                      <ul className="space-y-2">
                        {cs.outcome.map((line) => (
                          <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check size={14} className="mt-0.5 shrink-0 text-foreground" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          {/* Testimonial */}
          <AnimatedSection className="mt-14">
            <blockquote className={`rounded-3xl p-8 md:p-10 ${division.bg}`}>
              <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed">
                “{extras.testimonial.quote}”
              </p>
              <footer className="mt-5 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{extras.testimonial.author}</span> —{" "}
                {extras.testimonial.role}
              </footer>
            </blockquote>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection className="mt-12">
            <div className="rounded-3xl border border-border/50 bg-background p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-base font-serif italic text-foreground">{division.cta}</p>
              <Link
                to={`/?division=${division.id}#service-inquiry`}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-foreground text-primary-foreground hover:bg-foreground/90 transition-colors shrink-0"
              >
                {division.ctaLabel} <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DivisionWork;
