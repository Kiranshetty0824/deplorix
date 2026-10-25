import AnimatedSection from "./AnimatedSection";
import { Zap, Shield, Users, CheckCircle2 } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "We ship at speed without compromising quality. Agile processes, rapid iteration.",
  },
  {
    icon: Shield,
    title: "Built to Scale",
    description: "Production-grade architecture from day one. Your product grows with your business.",
  },
  {
    icon: Users,
    title: "Human-Centred",
    description: "Every screen serves a purpose. We design experiences people genuinely enjoy.",
  },
];

const AboutSection = () => {
  return (
    <section id="solutions" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-16 md:mb-20">
          <AnimatedSection>
            <span className="pill-label">Why DeploriX</span>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-foreground">
              Crafted with precision.
              <br />
              <span className="text-ghost">Delivered with care.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              We combine thoughtful design with solid engineering to build products, brands and
              teams that make a measurable difference.
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3 text-sm text-foreground/80">
              {["Bangalore-based team", "Fixed milestones & timelines", "Post-launch support", "Real client projects"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand" /> {item}
                  </li>
                )
              )}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-6 bg-glow rounded-[2.5rem] blur-2xl opacity-90" aria-hidden />
              <div className="relative rounded-[2rem] overflow-hidden border border-border/70 bg-card p-2 shadow-[var(--shadow-elevated)]">
                <img
                  src={aboutTeam}
                  alt="DeploriX team collaborating in a modern workspace"
                  className="w-full h-auto rounded-[1.6rem] object-cover"
                  loading="lazy"
                  width={1024}
                  height={1024}
                />
              </div>
              <div className="float-card absolute -bottom-6 -left-4 md:-left-8 px-5 py-4">
                <p className="text-2xl font-semibold text-foreground">40+</p>
                <p className="text-xs text-muted-foreground">Products shipped</p>
              </div>
              <div className="absolute -top-5 -right-3 md:-right-6 rounded-2xl bg-brand-gradient px-5 py-4 shadow-[var(--shadow-brand)]">
                <p className="text-2xl font-semibold text-brand-foreground">98%</p>
                <p className="text-xs text-brand-foreground/85">On-time delivery</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.12}>
              <div className="card-soft p-8 hover-lift group h-full">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon size={22} className="text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
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
