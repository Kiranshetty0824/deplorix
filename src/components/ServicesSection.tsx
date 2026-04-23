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
import { Globe, Smartphone, Palette, Megaphone, Share2, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, performant web applications built with cutting-edge technologies.",
    features: ["React & Next.js", "Scalable APIs", "Cloud Architecture", "E-commerce Solutions", "CMS Integration"],
    details: "We build responsive, fast-loading web applications using React, Next.js, Node.js, and cloud-native architecture. From landing pages to complex SaaS platforms, we handle frontend, backend, databases, deployment, and everything in between. Our web solutions are optimized for performance, SEO, and scalability. Whether you need a simple portfolio site or a full-fledged enterprise application, our team delivers clean, maintainable code that grows with your business.",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile apps that users love.",
    features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization", "Push Notifications"],
    details: "Our mobile development team creates beautiful, performant apps for both iOS and Android. Using React Native and Flutter, we deliver cross-platform solutions that feel native. We handle the entire lifecycle — UI/UX design, development, testing, App Store/Play Store submission, and ongoing maintenance. From MVPs to enterprise-grade apps, we ensure your mobile presence is seamless, secure, and scalable.",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Research-driven design that converts and delights.",
    features: ["User Research", "Prototyping", "Design Systems", "Wireframing", "Usability Testing"],
    details: "Great products start with great design. We conduct user research, create wireframes and interactive prototypes, build comprehensive design systems, and deliver pixel-perfect interfaces. Our designs are grounded in usability principles and focused on driving conversions and user satisfaction. We use tools like Figma and Adobe XD to iterate rapidly, ensuring every interaction feels intuitive and every screen tells your brand story.",
    bg: "bg-green-50 dark:bg-green-950/40",
    iconBg: "bg-green-100 dark:bg-green-900/50",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven strategies that grow your audience.",
    features: ["SEO & SEM", "Content Strategy", "Analytics", "PPC Campaigns", "Email Marketing"],
    details: "We craft data-driven digital marketing strategies that deliver measurable results. From SEO and SEM to content strategy and email marketing, we help you reach the right audience. Our analytics-first approach ensures every campaign is optimized for maximum ROI. We set up tracking, A/B testing, and conversion funnels so you always know what's working and where to invest next.",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build your brand presence across all social platforms.",
    features: ["Content Creation", "Community Management", "Paid Ads", "Influencer Outreach", "Performance Analytics"],
    details: "We help brands grow their social media presence with tailored strategies for Instagram, LinkedIn, Facebook, Twitter, and more. Our team handles everything from content calendars and creative design to paid ad campaigns and influencer partnerships. We focus on building authentic engagement, growing your follower base, and converting social traffic into real business results. Monthly reports keep you informed on reach, engagement, and ROI.",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    iconBg: "bg-orange-100 dark:bg-orange-900/50",
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
      <div className={`rounded-3xl p-8 md:p-10 hover-lift h-full flex flex-col border border-transparent hover:border-border/30 transition-all duration-500 ${service.bg}`}>
        <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
          <service.icon size={24} className="text-foreground" />
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

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                    <selected.icon size={24} />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selected.title}</DialogTitle>
                    <DialogDescription className="mt-1">{selected.description}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="mt-2 space-y-5">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <h4 className="text-sm font-semibold text-foreground mb-2">About this service</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.details}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">What's included:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selected.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded-lg bg-secondary/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  href={`mailto:deplorixtechnologies@gmail.com?subject=Inquiry about ${selected.title}`}
                  className="inline-flex items-center justify-center w-full rounded-full px-6 py-3 text-sm font-medium bg-foreground text-primary-foreground hover:bg-foreground/90 transition-colors"
                >
                  Get in Touch About {selected.title}
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
