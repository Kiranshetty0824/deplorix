import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  { number: "01", title: "Discovery", description: "We learn about your vision, goals, and target audience through in-depth research." },
  { number: "02", title: "Design", description: "Wireframes, prototypes, and pixel-perfect designs that bring your idea to life." },
  { number: "03", title: "Develop", description: "Clean, scalable code with modern frameworks. Test-driven, always." },
  { number: "04", title: "Deploy & Grow", description: "Launch with confidence. We monitor, iterate, and scale alongside you." },
];

const stepColors = ["craft-section-yellow", "craft-section-blue", "craft-section-green", "craft-section-peach"];

const WorkflowSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Process
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            How we work
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`craft-card ${stepColors[i]} p-7 h-full`}>
                <span className="text-3xl font-bold text-foreground/20">{step.number}</span>
                <h3 className="text-xl font-bold text-foreground mt-3 mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
