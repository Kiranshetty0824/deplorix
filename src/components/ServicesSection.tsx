import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import { Globe, Smartphone, Palette, Megaphone } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, performant web applications built with cutting-edge technologies.",
    features: ["React & Next.js", "Scalable APIs", "Cloud Architecture"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile apps that users love.",
    features: ["iOS & Android", "React Native", "Flutter"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Research-driven design that converts and delights.",
    features: ["User Research", "Prototyping", "Design Systems"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven strategies that grow your audience.",
    features: ["SEO & SEM", "Content Strategy", "Analytics"],
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="glass-card p-8 md:p-10 hover-lift h-full flex flex-col">
        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-primary-foreground transition-all duration-500">
          <service.icon size={24} />
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-3">{service.title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
        <ul className="mt-auto space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1 h-1 rounded-full bg-foreground" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="products" className="section-padding bg-surface-elevated">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Services
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Everything you need
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, we provide end-to-end solutions for your digital journey.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
