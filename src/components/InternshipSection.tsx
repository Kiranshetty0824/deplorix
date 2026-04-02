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
    items: [
      { icon: Code, text: "Frontend Developers" },
      { icon: Server, text: "Backend Developers" },
      { icon: Palette, text: "UI/UX Designers" },
      { icon: Bug, text: "Testers" },
    ],
  },
  {
    icon: Rocket, title: "Real Project Execution",
    items: [
      { icon: Briefcase, text: "Live client projects" },
      { icon: GitBranch, text: "Product development" },
    ],
  },
  {
    icon: CalendarCheck, title: "Weekly System",
    items: [
      { icon: Users, text: "Team meetings" },
      { icon: Target, text: "Progress reviews" },
      { icon: CalendarCheck, text: "Regular feedback" },
    ],
  },
  {
    icon: Compass, title: "Mentorship",
    items: [
      { icon: Compass, text: "Guided step-by-step" },
      { icon: Target, text: "Regular monitoring" },
    ],
  },
  {
    icon: Trophy, title: "Final Growth",
    items: [
      { icon: Award, text: "Presentation skills" },
      { icon: Trophy, text: "Confidence building" },
    ],
  },
  {
    icon: Briefcase, title: "What You Gain",
    items: [
      { icon: Briefcase, text: "Real experience" },
      { icon: GitBranch, text: "GitHub portfolio" },
      { icon: Linkedin, text: "LinkedIn growth" },
      { icon: Award, text: "Placement readiness" },
    ],
  },
];

const blockColors = [
  "craft-section-blue",
  "craft-section-yellow",
  "craft-section-green",
  "craft-section-peach",
  "craft-section-purple",
  "craft-section-mint",
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
      className="group"
    >
      <div className={`craft-card ${blockColors[index]} p-6 hover-lift h-full`}>
        <div className="w-12 h-12 rounded-xl bg-card/70 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
          <block.icon size={22} />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-4">{block.title}</h3>
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
              <item.icon size={15} className="shrink-0" />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const InternshipSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });

  const handleApply = () => {
    const subject = encodeURIComponent("Internship Application - DeploriX Technologies");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCollege: ${form.college}`
    );
    window.location.href = `mailto:deplorixtechnologies@gmail.com?subject=${subject}&body=${body}`;
    setDialogOpen(false);
  };

  return (
    <section id="resources" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="craft-card craft-section-yellow p-6 md:p-10 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-foreground text-primary-foreground rounded-full mb-5">
                Careers & Training
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                Not a Typical Internship
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Experience real-world projects, team collaboration, and mentorship that transforms you into an industry-ready developer.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  className="rounded-full bg-card/70 backdrop-blur-sm border-border/50"
                  onClick={() => setDialogOpen(true)}
                >
                  Learn more
                </Button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-card shadow-lg">
              <img
                src={internshipImg}
                alt="Interns collaborating in a mentorship session"
                className="w-full h-auto object-cover"
                loading="lazy"
                width={1280}
                height={854}
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {contentBlocks.map((block, i) => (
            <ContentCard key={block.title} block={block} index={i} />
          ))}
        </div>

        <AnimatedSection delay={0.3} className="text-center">
          <Button
            size="lg"
            className="rounded-full text-base px-10 py-6 gap-2"
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
            <Button onClick={handleApply} className="w-full rounded-full" size="lg" disabled={!form.name || !form.email || !form.phone || !form.college}>
              Submit Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default InternshipSection;
