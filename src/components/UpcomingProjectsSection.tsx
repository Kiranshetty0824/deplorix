import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import { Calendar, Truck, Landmark, Users } from "lucide-react";

const upcomingProjects = [
  {
    icon: Calendar,
    title: "Collevnto",
    subtitle: "College Event Management Platform",
    description:
      "A comprehensive platform designed to help colleges conduct events seamlessly — from planning and promotion to ticket generation, attendee management, and post-event analytics. Everything your institution needs in one place.",
    tags: ["Event Management", "Ticketing", "Analytics"],
    bg: "bg-secondary",
    iconBg: "bg-accent",
  },
  {
    icon: Truck,
    title: "TruckBook",
    subtitle: "Truck Booking App",
    description:
      "A smart logistics solution that connects shippers with truck owners. Book trucks on-demand, track shipments in real time, and manage freight operations with ease — built for speed and reliability.",
    tags: ["Logistics", "Booking", "Real-time Tracking"],
    bg: "bg-secondary",
    iconBg: "bg-accent",
  },
  {
    icon: Landmark,
    title: "LocalBank",
    subtitle: "Local Banking Management App",
    description:
      "A modern banking management application tailored for local and community banks. Manage accounts, transactions, loans, and customer records with a secure, intuitive interface designed for efficiency.",
    tags: ["FinTech", "Banking", "Security"],
    bg: "bg-secondary",
    iconBg: "bg-accent",
  },
  {
    icon: Users,
    title: "WorkSpher",
    subtitle: "Employee Management Application",
    description:
      "An all-in-one employee management app for tracking attendance, managing payroll, handling leave requests, and monitoring performance — empowering HR teams and managers to work smarter.",
    tags: ["HR Tech", "Payroll", "Performance"],
    bg: "bg-secondary",
    iconBg: "bg-accent",
  },
];

const UpcomingProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="upcoming" className="section-padding bg-surface-elevated" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Coming Soon
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Upcoming Projects
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Exciting products currently in development. Stay tuned for launch updates.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {upcomingProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className={`rounded-3xl p-8 md:p-10 hover-lift h-full flex flex-col border border-transparent hover:border-border/30 transition-all duration-500 ${project.bg}`}>
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${project.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <project.icon size={24} className="text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  In Development
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjectsSection;
