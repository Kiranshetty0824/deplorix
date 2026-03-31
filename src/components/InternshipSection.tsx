import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import { GraduationCap, Code, Rocket, ArrowRight } from "lucide-react";

const perks = [
  { icon: Code, text: "Hands-on real-world projects" },
  { icon: GraduationCap, text: "Mentorship from senior engineers" },
  { icon: Rocket, text: "Career-ready portfolio on completion" },
];

const InternshipSection = () => {
  return (
    <section id="resources" className="section-padding bg-surface-elevated">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Careers & Training
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Launch your career in tech
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Our internship program gives aspiring developers the skills,
              mentorship, and real-world experience to thrive in the industry.
            </p>

            <ul className="mt-8 space-y-4">
              {perks.map((perk) => (
                <li key={perk.text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <perk.icon size={18} className="text-foreground" />
                  </div>
                  <span className="text-foreground">{perk.text}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" className="mt-10 text-base px-8 py-6 gap-2">
              Apply Now <ArrowRight size={18} />
            </Button>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="glass-card p-8 md:p-10">
              <div className="space-y-6">
                {["Web Development", "Mobile Development", "UI/UX Design", "DevOps & Cloud"].map(
                  (track, i) => (
                    <div
                      key={track}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/60 hover:bg-secondary transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-mono text-muted-foreground">
                          0{i + 1}
                        </span>
                        <span className="font-medium text-foreground">{track}</span>
                      </div>
                      <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-background border border-border">
                        12 weeks
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;
