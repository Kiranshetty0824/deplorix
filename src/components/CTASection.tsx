import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding bg-foreground text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Ready to build something extraordinary?
          </h2>
          <p className="mt-6 text-lg opacity-60 max-w-2xl mx-auto">
            Let's turn your idea into a product people love. Get in touch and
            we'll start the conversation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base px-8 py-6 gap-2 bg-primary-foreground text-foreground border-none hover:bg-primary-foreground/90 hover:text-foreground"
            >
              Start a Project <ArrowRight size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base px-8 py-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Book a Call
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;
