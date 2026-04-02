import AnimatedSection from "./AnimatedSection";
import { Zap, Shield, Users } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "We ship products at speed without compromising quality. Agile processes, rapid iteration.",
  },
  {
    icon: Shield,
    title: "Built to Scale",
    description: "Enterprise-grade architecture from day one. Your product grows with your business.",
  },
  {
    icon: Users,
    title: "Human-Centered",
    description: "Every pixel serves a purpose. We design experiences people genuinely love to use.",
  },
];

const AboutSection = () => {
  return (
    <section id="solutions" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Why DeploriX
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Crafted with precision
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We combine thoughtful design with powerful engineering to build
            products that make a difference.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="craft-card craft-section-blue p-6 md:p-10 mb-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Team</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A diverse group of designers, developers, and strategists united by a passion for building exceptional digital experiences.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden bg-card shadow-lg">
                <img
                  src={aboutTeam}
                  alt="DeploriX team collaborating in a modern workspace"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width={1024}
                  height={1024}
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.15}>
              <div className="bg-card rounded-3xl p-8 hover-lift group h-full border border-border/30">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-primary-foreground transition-colors duration-500">
                  <feature.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
