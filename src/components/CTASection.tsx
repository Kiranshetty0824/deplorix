import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import StartProjectDialog from "./StartProjectDialog";

const CTASection = () => {
  const [projectOpen, setProjectOpen] = useState(false);

  return (
    <section className="px-5 md:px-10 lg:px-20 py-12">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="craft-card craft-section-green p-8 md:p-14">
            <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Let's get started
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Start for free. No credit card required. Let's turn your idea into a product people love.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="rounded-full text-base px-8 py-6 w-full sm:w-auto"
                onClick={() => setProjectOpen(true)}
              >
                Start a Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base px-8 py-6 bg-card/70 backdrop-blur-sm border-border/50 w-full sm:w-auto"
                onClick={() => window.location.href = "mailto:deplorixtechnologies@gmail.com?subject=Book a Call"}
              >
                Book a Call
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <StartProjectDialog open={projectOpen} onOpenChange={setProjectOpen} />
    </section>
  );
};

export default CTASection;
