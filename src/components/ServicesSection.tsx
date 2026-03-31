import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Globe, Smartphone, Palette, Megaphone } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, performant web applications built with cutting-edge technologies.",
    features: ["React & Next.js", "Scalable APIs", "Cloud Architecture"],
    details: "We build responsive, fast-loading web applications using React, Next.js, Node.js, and cloud-native architecture. From landing pages to complex SaaS platforms, we handle frontend, backend, databases, deployment, and everything in between. Our web solutions are optimized for performance, SEO, and scalability.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile apps that users love.",
    features: ["iOS & Android", "React Native", "Flutter"],
    details: "Our mobile development team creates beautiful, performant apps for both iOS and Android. Using React Native and Flutter, we deliver cross-platform solutions that feel native. We handle the entire lifecycle — UI/UX design, development, testing, App Store/Play Store submission, and ongoing maintenance.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Research-driven design that converts and delights.",
    features: ["User Research", "Prototyping", "Design Systems"],
    details: "Great products start with great design. We conduct user research, create wireframes and interactive prototypes, build comprehensive design systems, and deliver pixel-perfect interfaces. Our designs are grounded in usability principles and focused on driving conversions and user satisfaction.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven strategies that grow your audience.",
    features: ["SEO & SEM", "Content Strategy", "Analytics"],
    details: "We craft data-driven digital marketing strategies that deliver measurable results. From SEO and SEM to social media marketing and content strategy, we help you reach the right audience. Our analytics-first approach ensures every campaign is optimized for maximum ROI.",
  },
];

const ServiceCard = ({
  service,
  index,
  onOpen,
}: {
  service: typeof services[0];
  index: number;
  onOpen: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-pointer"
      onClick={onOpen}
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
        <span className="mt-6 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          Click to learn more →
        </span>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [selected, setSelected] = useState<typeof services[0] | null>(null);

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
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              onOpen={() => setSelected(service)}
            />
          ))}
        </div>
      </div>

      {/* Service Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <selected.icon size={20} />
                  </div>
                  <DialogTitle className="text-xl">{selected.title}</DialogTitle>
                </div>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.details}</p>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">What's included:</h4>
                  <ul className="space-y-2">
                    {selected.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={`mailto:deplorixtechnologies@gmail.com?subject=Inquiry about ${selected.title}`}
                  className="inline-flex items-center justify-center w-full rounded-full px-6 py-3 text-sm font-medium bg-foreground text-primary-foreground hover:bg-foreground/90 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;
