import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import StartProjectDialog from "./StartProjectDialog";

const CTASection = () => {
  const [projectOpen, setProjectOpen] = useState(false);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card px-8 py-14 md:px-16 md:py-20 text-center shadow-[var(--shadow-card)]">
            <div className="absolute inset-0 bg-glow opacity-90" aria-hidden />
            <div className="absolute inset-0 bg-grid" aria-hidden />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="pill-label">Let's get started</span>
              <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground">
                Tell us what you want to build.
                <br />
                <span className="text-ghost">We'll define the next step.</span>
              </h2>
              <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="hero" className="h-12 px-7 gap-2" onClick={() => setProjectOpen(true)}>
                  Start a Project <ArrowRight size={16} />
                </Button>
                <Button
                  variant="hero-outline"
                  className="h-12 px-7 gap-2"
                  onClick={() => (window.location.href = "mailto:deplorixtechnologies@gmail.com?subject=Book a Call")}
                >
                  Book a Call <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <StartProjectDialog open={projectOpen} onOpenChange={setProjectOpen} />
    </section>
  );
};

export default CTASection;
