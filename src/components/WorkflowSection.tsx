import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  { number: "01", title: "Discovery", description: "We learn about your vision, goals, and target audience through in-depth research." },
  { number: "02", title: "Design", description: "Wireframes, prototypes, and pixel-perfect designs that bring your idea to life." },
  { number: "03", title: "Develop", description: "Clean, scalable code with modern frameworks. Test-driven, always." },
  { number: "04", title: "Deploy & Grow", description: "Launch with confidence. We monitor, iterate, and scale alongside you." },
];

const WorkflowSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Process
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            How we work
          </h2>
        </AnimatedSection>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border origin-top"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex items-start mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } md:text-${i % 2 === 0 ? "right" : "left"}`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground border-4 border-background z-10" />

              <div className={`w-full pl-14 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <span className="text-sm font-mono text-muted-foreground">{step.number}</span>
                <h3 className="text-2xl font-semibold text-foreground mt-1 mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
