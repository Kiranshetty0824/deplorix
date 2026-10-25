import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import { FileText, BookOpen, Compass, Presentation, Check, Star } from "lucide-react";

const plans = [
  {
    name: "Basic",
    highlight: false,
    features: [
      "Project topic selection guidance",
      "Basic documentation template",
      "2 mentorship sessions",
      "Code review support",
    ],
  },
  {
    name: "Popular",
    highlight: true,
    features: [
      "Everything in Basic",
      "Full project development support",
      "Complete documentation assistance",
      "Weekly mentorship sessions",
      "Presentation preparation",
      "Deployment assistance",
    ],
  },
  {
    name: "Advanced",
    highlight: false,
    features: [
      "Everything in Popular",
      "Research paper assistance",
      "Advanced tech stack guidance",
      "Unlimited mentorship sessions",
      "Mock viva preparation",
      "Post-submission support",
    ],
  },
];

const services = [
  { icon: FileText, title: "Project Development", desc: "End-to-end development of your final year project with modern technologies.", bg: "bg-secondary", iconBg: "bg-accent" },
  { icon: BookOpen, title: "Documentation", desc: "Professional documentation following university standards and guidelines.", bg: "bg-secondary", iconBg: "bg-accent" },
  { icon: Compass, title: "Guidance", desc: "Expert mentorship from planning to execution with regular check-ins.", bg: "bg-secondary", iconBg: "bg-accent" },
  { icon: Presentation, title: "Presentation Support", desc: "Slides, demo prep, and mock presentations for confident delivery.", bg: "bg-secondary", iconBg: "bg-accent" },
];

const PlanCard = ({ plan, index }: { plan: typeof plans[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-3xl border p-8 flex flex-col h-full transition-all duration-500 ${
        plan.highlight
          ? "bg-foreground text-primary-foreground border-foreground shadow-2xl scale-[1.02]"
          : "bg-secondary hover-lift border-transparent hover:border-border/30"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-foreground text-foreground text-xs font-semibold rounded-full flex items-center gap-1">
          <Star size={12} /> Most Popular
        </div>
      )}
      <h3 className={`text-2xl font-bold ${plan.highlight ? "" : "text-foreground"}`}>
        {plan.name}
      </h3>
      <ul className="mt-6 space-y-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check size={16} className={`mt-0.5 shrink-0 ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`} />
            <span className={plan.highlight ? "text-primary-foreground/90" : "text-muted-foreground"}>
              {f}
            </span>
          </li>
        ))}
      </ul>
      <a
        href="mailto:deplorixtechnologies@gmail.com?subject=Final Year Project Inquiry - ${plan.name} Plan"
        className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
          plan.highlight
            ? "bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
            : "bg-foreground text-primary-foreground hover:bg-foreground/90"
        }`}
      >
        Get Started
      </a>
    </motion.div>
  );
};

const FYPSection = () => {
  return (
    <section id="fyp" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Academic Projects
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Final Year Projects
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete support for your academic project — from development to documentation to presentation.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.1}>
              <div className={`rounded-3xl p-6 text-center hover-lift h-full border border-transparent hover:border-border/30 transition-all duration-500 ${s.bg}`}>
                <div className={`w-12 h-12 mx-auto rounded-xl ${s.iconBg} flex items-center justify-center mb-4`}>
                  <s.icon size={22} className="text-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{s.title}</h4>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">Choose Your Plan</h3>
          <p className="mt-3 text-muted-foreground">Flexible plans to match your project needs</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FYPSection;
