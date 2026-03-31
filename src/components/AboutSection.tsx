import AnimatedSection from "./AnimatedSection";
import { Zap, Shield, Users } from "lucide-react";

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
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Why DeploriX
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Crafted with precision
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine thoughtful design with powerful engineering to build
            products that make a difference.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.15}>
              <div className="glass-card p-8 md:p-10 hover-lift group h-full">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-primary-foreground transition-colors duration-500">
                  <feature.icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
