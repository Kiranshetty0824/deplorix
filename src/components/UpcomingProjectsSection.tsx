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
      "A comprehensive platform designed to help colleges conduct events seamlessly — from planning and promotion to ticket generation, attendee management, and post-event analytics.",
    tags: ["Event Management", "Ticketing", "Analytics"],
  },
  {
    icon: Truck,
    title: "TruckBook",
    subtitle: "Truck Booking App",
    description:
      "A smart logistics solution that connects shippers with truck owners. Book trucks on-demand, track shipments in real time, and manage freight operations with ease.",
    tags: ["Logistics", "Booking", "Real-time Tracking"],
  },
  {
    icon: Landmark,
    title: "LocalBank",
    subtitle: "Local Banking Management App",
    description:
      "A modern banking management application tailored for local and community banks. Manage accounts, transactions, loans, and customer records with a secure interface.",
    tags: ["FinTech", "Banking", "Security"],
  },
  {
    icon: Users,
    title: "WorkSpher",
    subtitle: "Employee Management Application",
    description:
      "An all-in-one employee management app for tracking attendance, managing payroll, handling leave requests, and monitoring performance.",
    tags: ["HR Tech", "Payroll", "Performance"],
  },
];

const cardColors = ["craft-section-blue", "craft-section-yellow", "craft-section-green", "craft-section-purple"];

const UpcomingProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="upcoming" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Coming Soon
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Upcoming Projects
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Exciting products currently in development. Stay tuned for launch updates.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5">
          {upcomingProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className={`craft-card ${cardColors[i]} p-8 md:p-10 hover-lift h-full flex flex-col`}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-card/70 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:bg-foreground group-hover:text-primary-foreground transition-all duration-500">
                    <project.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-card/60 backdrop-blur-sm text-muted-foreground shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-foreground/30 animate-pulse" />
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
