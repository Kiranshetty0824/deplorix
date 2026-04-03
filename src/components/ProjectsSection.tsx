import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Code2, Layers, Clock, Users, CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import projectWeb from "@/assets/project-web.jpg";
import projectApp from "@/assets/project-app.jpg";
import projectDesign from "@/assets/project-design.jpg";
import internshipImg from "@/assets/internship.jpg";

const cardColors = [
  "bg-blue-50 dark:bg-blue-950/40",
  "bg-amber-50 dark:bg-amber-950/40",
  "bg-green-50 dark:bg-green-950/40",
  "bg-purple-50 dark:bg-purple-950/40",
];

const projects = [
  {
    title: "FinFlow Dashboard",
    category: "Web App",
    image: projectWeb,
    description: "A comprehensive financial management dashboard designed for businesses to track expenses, revenue, invoices, and generate detailed financial reports in real-time.",
    techStack: ["React.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Chart.js", "Express.js", "JWT Auth"],
    duration: "3 Months",
    team: "4 Developers",
    highlights: [
      "Real-time financial analytics with interactive charts and graphs",
      "Automated invoice generation and payment tracking system",
      "Role-based access control for admin, accountant, and viewer roles",
      "Export reports in PDF and Excel formats",
      "Integrated with multiple payment gateways for seamless transactions",
      "Responsive design optimized for desktop and tablet use",
    ],
    process: "We started with in-depth client consultations to understand their financial workflows. The UI/UX was designed in Figma with multiple iterations. Development followed an Agile approach with 2-week sprints. The backend was built with Node.js and MongoDB for scalable data handling. Rigorous testing and QA ensured accuracy in all financial calculations before deployment.",
  },
  {
    title: "HealthTrack Mobile",
    category: "Mobile App",
    image: projectApp,
    description: "A health and fitness tracking mobile application that helps users monitor their daily activities, set fitness goals, track nutrition, and connect with health professionals.",
    techStack: ["React Native", "TypeScript", "Firebase", "Redux", "Node.js", "PostgreSQL", "Google Fit API", "Apple HealthKit"],
    duration: "4 Months",
    team: "5 Developers",
    highlights: [
      "Step counter, calorie tracker, and workout logging with detailed analytics",
      "Personalized diet plans and nutrition tracking with barcode scanning",
      "Integration with Google Fit and Apple HealthKit for seamless data sync",
      "Push notifications for medication reminders and fitness goals",
      "In-app chat with certified health professionals",
      "Available on both Android and iOS platforms",
    ],
    process: "Research phase involved studying competitor apps and conducting user surveys. We designed user flows prioritizing simplicity and engagement. React Native was chosen for cross-platform efficiency. Firebase handled real-time data sync and authentication. The app went through extensive beta testing with 200+ users before the final release, incorporating feedback at every stage.",
  },
  {
    title: "EduConnect Platform",
    category: "SaaS",
    image: projectDesign,
    description: "A full-featured SaaS platform connecting students, teachers, and institutions for online learning, course management, live classes, and performance tracking.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "WebRTC", "Stripe", "AWS S3"],
    duration: "5 Months",
    team: "6 Developers",
    highlights: [
      "Live video classes with screen sharing and interactive whiteboard",
      "Course creation tools with drag-and-drop content builder",
      "Automated quiz generation and AI-powered grading system",
      "Student performance dashboards with progress analytics",
      "Stripe-integrated subscription and one-time payment models",
      "Multi-tenant architecture supporting multiple institutions",
    ],
    process: "We collaborated closely with educational institutions to understand pain points in online learning. The platform was architected as a multi-tenant SaaS using Next.js for SSR performance. WebRTC powers the live class feature. Prisma ORM with PostgreSQL ensures robust data management. The project followed CI/CD practices with automated testing pipelines for reliable deployments.",
  },
  {
    title: "ShopEase Commerce",
    category: "E-Commerce",
    image: internshipImg,
    description: "A modern e-commerce platform with a focus on user experience, featuring product catalogs, cart management, secure checkout, order tracking, and an admin dashboard for store management.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Razorpay", "Redis", "Cloudinary", "Tailwind CSS"],
    duration: "3.5 Months",
    team: "4 Developers",
    highlights: [
      "Dynamic product catalog with advanced filtering and search",
      "Secure checkout with Razorpay payment gateway integration",
      "Real-time order tracking with SMS and email notifications",
      "Admin dashboard for inventory, orders, and customer management",
      "Image optimization with Cloudinary for fast page loads",
      "Redis-powered caching for high-performance product listing",
    ],
    process: "The project kicked off with market research and competitor analysis. We created detailed wireframes and prototypes in Figma. The frontend was built with React.js for a smooth SPA experience. Node.js and Express handled the backend APIs. MongoDB was chosen for flexible product schema. Performance optimization using Redis caching and Cloudinary image CDN ensured sub-second page loads.",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
              onClick={() => setSelectedProject(project)}
            >
              <div className={`rounded-3xl overflow-hidden hover-lift border border-transparent hover:border-border/30 transition-all duration-500 ${cardColors[i % cardColors.length]}`}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={960}
                    height={640}
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-background font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                      <ExternalLink className="w-5 h-5" /> Explore Project
                    </span>
                  </div>
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

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <Badge variant="secondary">{selectedProject.category}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {selectedProject.duration}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {selectedProject.team}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                    <Code2 className="w-4 h-4 text-primary" /> Tech Stack Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-primary" /> Key Features & Highlights
                  </h4>
                  <div className="grid gap-2">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-secondary/50 p-4 border border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    How We Built It
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedProject.process}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
