import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import projectWeb from "@/assets/project-web.jpg";
import projectApp from "@/assets/project-app.jpg";
import projectDesign from "@/assets/project-design.jpg";
import internshipImg from "@/assets/internship.jpg";

const projects = [
  { title: "FinFlow Dashboard", category: "Web App", image: projectWeb },
  { title: "HealthTrack Mobile", category: "Mobile App", image: projectApp },
  { title: "EduConnect Platform", category: "SaaS", image: projectDesign },
  { title: "ShopEase Commerce", category: "E-Commerce", image: internshipImg },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Portfolio
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Selected work
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              <div className="glass-card overflow-hidden hover-lift">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={960}
                    height={640}
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-1">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
