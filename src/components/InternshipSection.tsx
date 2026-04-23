import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users, Rocket, CalendarCheck, Compass, Trophy, Briefcase, ArrowRight,
  Code, Palette, Bug, Server, GitBranch, Linkedin, Award, Target,
} from "lucide-react";
import internshipImg from "@/assets/internship.jpg";

const contentBlocks = [
  {
    icon: Users, title: "Team-Based Work",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    items: [
      { icon: Code, text: "Frontend Developers" },
      { icon: Server, text: "Backend Developers" },
      { icon: Palette, text: "UI/UX Designers" },
      { icon: Bug, text: "Testers" },
    ],
  },
  {
    icon: Rocket, title: "Real Project Execution",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    items: [
      { icon: Briefcase, text: "Live client projects" },
      { icon: GitBranch, text: "Product development" },
    ],
  },
  {
    icon: CalendarCheck, title: "Weekly System",
    bg: "bg-green-50 dark:bg-green-950/40",
    iconBg: "bg-green-100 dark:bg-green-900/50",
    items: [
      { icon: Users, text: "Team meetings" },
      { icon: Target, text: "Progress reviews" },
      { icon: CalendarCheck, text: "Regular feedback" },
    ],
  },
  {
    icon: Compass, title: "Mentorship",
    bg: "bg-teal-50 dark:bg-teal-950/40",
    iconBg: "bg-teal-100 dark:bg-teal-900/50",
    items: [
      { icon: Compass, text: "Guided step-by-step" },
      { icon: Target, text: "Regular monitoring" },
    ],
  },
  {
    icon: Trophy, title: "Final Growth",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    items: [
      { icon: Award, text: "Presentation skills" },
      { icon: Trophy, text: "Confidence building" },
    ],
  },
  {
    icon: Briefcase, title: "What You Gain",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    iconBg: "bg-orange-100 dark:bg-orange-900/50",
    items: [
      { icon: Briefcase, text: "Real experience" },
      { icon: GitBranch, text: "GitHub portfolio" },
      { icon: Linkedin, text: "LinkedIn growth" },
      { icon: Award, text: "Placement readiness" },
    ],
  },
];

const ContentCard = ({ block, index }: { block: typeof contentBlocks[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group rounded-3xl ${block.bg} p-6 hover-lift border border-transparent hover:border-border/30 transition-all duration-500`}
    >
      <div className={`w-12 h-12 rounded-xl ${block.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
        <block.icon size={22} className="text-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-4">{block.title}</h3>
      <ul className="space-y-2.5">
        {block.items.map((item) => (
          <li key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
            <item.icon size={15} className="shrink-0" />
            {item.text}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const InternshipSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string>("");

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeError("");
    if (!file) {
      setResume(null);
      return;
    }
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      setResumeError("Please upload a PDF or Word document.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setResumeError("Resume must be under 5MB.");
      return;
    }
    setResume(file);
  };

  const handleApply = () => {
    const subject = encodeURIComponent("Internship Application - DeploriX Technologies");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCollege: ${form.college}\n\nResume: ${resume ? `${resume.name} (${(resume.size / 1024).toFixed(1)} KB) — please attach this file before sending.` : "Not provided"}`
    );
    window.location.href = `mailto:deplorixtechnologies@gmail.com?subject=${subject}&body=${body}`;
    setDialogOpen(false);
  };

  return (
    <section id="resources" className="section-padding bg-surface-elevated">
      <div className="max-w-7xl mx-auto">
        {/* Header with image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-foreground text-primary-foreground rounded-full mb-6">
              Careers & Training
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Not a Typical Internship
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Experience real-world projects, team collaboration, and mentorship that transforms you into an industry-ready developer.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="glass-card overflow-hidden">
              <img
                src={internshipImg}
                alt="Interns collaborating in a mentorship session"
                className="w-full h-auto object-cover rounded-2xl"
                loading="lazy"
                width={1280}
                height={854}
              />
            </div>
          </AnimatedSection>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contentBlocks.map((block, i) => (
            <ContentCard key={block.title} block={block} index={i} />
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="glass-card p-8 text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm text-muted-foreground italic">
              "Internship details and pricing are available only on the Careers page."
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="text-center">
          <Button
            variant="hero"
            size="lg"
            className="text-base px-10 py-6 gap-2"
            onClick={() => setDialogOpen(true)}
          >
            Apply for Internship <ArrowRight size={18} />
          </Button>
        </AnimatedSection>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for Internship</DialogTitle>
            <DialogDescription>
              Fill in your details and we'll get back to you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="intern-name">Full Name</Label>
              <Input id="intern-name" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="intern-email">Email Address</Label>
              <Input id="intern-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="intern-phone">Phone Number</Label>
              <Input id="intern-phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="intern-college">College Name</Label>
              <Input id="intern-college" placeholder="Your college name" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} />
            </div>
            <Button onClick={handleApply} className="w-full" size="lg" disabled={!form.name || !form.email || !form.phone || !form.college}>
              Submit Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default InternshipSection;
