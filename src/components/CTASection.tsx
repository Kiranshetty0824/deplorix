import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import StartProjectDialog from "./StartProjectDialog";

const CTASection = () => {
  const [projectOpen, setProjectOpen] = useState(false);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-green-100 dark:bg-green-900/40 p-10 md:p-16">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-green-200/50 dark:bg-green-800/30 rounded-full -translate-y-1/2" />
            <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-green-200/40 dark:bg-green-800/20 rounded-full translate-y-1/3" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic font-medium tracking-tight text-foreground">
                Let's get started
              </h2>
              <p className="mt-4 text-lg md:text-xl text-foreground/70 max-w-md">
                Tell us what you want to build. We’ll help you define the right next step.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="rounded-full text-base px-8 py-6 bg-green-50 dark:bg-green-100 text-foreground dark:text-green-950 border-none hover:bg-white dark:hover:bg-green-50 shadow-sm"
                  onClick={() => setProjectOpen(true)}
                >
                  Start a Project
                </Button>
                <Button
                  size="lg"
                  className="rounded-full text-base px-8 py-6 bg-foreground text-primary-foreground hover:bg-foreground/90"
                  onClick={() => window.location.href = "mailto:deplorixtechnologies@gmail.com?subject=Book a Call"}
                >
                  Book a Call
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
