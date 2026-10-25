import AnimatedSection from "./AnimatedSection";
import { Zap, Shield, Users } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "We ship products at speed without compromising quality. Agile processes, rapid iteration.",
    bg: "bg-secondary",
    iconBg: "bg-accent",
  },
  {
    icon: Shield,
    title: "Built to Scale",
    description: "Enterprise-grade architecture from day one. Your product grows with your business.",
    bg: "bg-secondary",
    iconBg: "bg-accent",
  },
  {
    icon: Users,
    title: "Human-Centered",
    description: "Every pixel serves a purpose. We design experiences people genuinely love to use.",
    bg: "bg-secondary",
    iconBg: "bg-accent",
  },
];

const AboutSection = () => {
  return (
    <section id="solutions" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <AnimatedSection>
            <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Why DeploriX
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Crafted with precision
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              We combine thoughtful design with powerful engineering to build
              products that make a difference.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-3xl overflow-hidden border border-border/50" style={{ boxShadow: 'var(--shadow-card)' }}>
              <img
                src={aboutTeam}
                alt="DeploriX team collaborating in a modern workspace"
                className="w-full h-auto object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </div>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.15}>
              <div className={`rounded-3xl p-8 md:p-10 hover-lift group h-full border border-transparent hover:border-border/30 transition-all duration-500 ${feature.bg}`}>
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon size={22} className="text-foreground" />
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
