import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MousePointer2, Plus } from "lucide-react";
import StartProjectDialog from "./StartProjectDialog";
import LogoStrip from "./LogoStrip";

const ease = [0.22, 1, 0.36, 1] as const;

const Avatar = ({ initials, tone = "ink" }: { initials: string; tone?: "ink" | "brand" | "peach" }) => (
  <span
    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-2 ring-card ${
      tone === "brand"
        ? "bg-brand-gradient text-brand-foreground"
        : tone === "peach"
          ? "bg-peach text-foreground"
          : "bg-primary text-primary-foreground"
    }`}
  >
    {initials}
  </span>
);

const ProgressCard = ({
  initials,
  title,
  started,
  step,
  value,
  tone,
}: {
  initials: string;
  title: string;
  started: string;
  step: string;
  value: number;
  tone?: "ink" | "brand" | "peach";
}) => (
  <div className="float-card w-60 p-4">
    <div className="flex items-center gap-3">
      <Avatar initials={initials} tone={tone} />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{title}</p>
        <p className="text-[11px] text-muted-foreground">{started}</p>
      </div>
    </div>
    <p className="mt-3 text-[11px] font-medium text-foreground/80">{step}</p>
    <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.4, delay: 0.9, ease }}
        className="h-full rounded-full bg-primary"
      />
    </div>
  </div>
);

const Floating = ({
  children,
  className,
  delay = 0,
  drift = 10,
}: {
  children: React.ReactNode;
  className: string;
  delay?: number;
  drift?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, ease }}
    className={`absolute z-20 ${className}`}
  >
    <motion.div
      animate={{ y: [0, -drift, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const HeroSection = () => {
  const [projectOpen, setProjectOpen] = useState(false);

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      {/* Glow + grid background */}
      <div className="absolute inset-0 bg-glow" aria-hidden />
      <div className="absolute inset-x-0 top-10 h-[720px] bg-grid" aria-hidden />
      {[
        "left-[22%] top-[22%]",
        "left-[52%] top-[18%]",
        "right-[22%] top-[44%]",
        "left-[30%] top-[62%]",
      ].map((pos) => (
        <Plus key={pos} size={18} strokeWidth={1.25} className={`absolute ${pos} text-foreground/25 hidden md:block`} aria-hidden />
      ))}

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Floating cards (desktop) */}
        <Floating className="hidden lg:block left-0 top-6" delay={0.5}>
          <ProgressCard
            initials="CO"
            title="Collevnto"
            started="College event platform"
            step="In development"
            value={60}
          />
        </Floating>
        <Floating className="hidden lg:block right-0 top-2" delay={0.65} drift={14}>
          <ProgressCard
            initials="TB"
            title="TruckBook"
            started="Truck booking app"
            step="In development"
            value={45}
            tone="brand"
          />
        </Floating>
        <Floating className="hidden lg:block left-6 top-[300px]" delay={0.8}>
          <div className="relative flex items-center gap-2.5 rounded-full bg-primary pl-1.5 pr-5 py-1.5 shadow-[var(--shadow-card)]">
            <Avatar initials="DT" tone="peach" />
            <div>
              <p className="text-xs font-semibold text-primary-foreground">Deplorix Tech</p>
              <p className="text-[10px] text-primary-foreground/70">Web & app engineering</p>
            </div>
            <MousePointer2 size={20} className="absolute -top-5 -right-4 fill-foreground text-foreground rotate-[80deg]" />
          </div>
        </Floating>
        <Floating className="hidden lg:block right-6 top-[310px]" delay={0.95}>
          <div className="relative flex items-center gap-2.5 rounded-full bg-brand-gradient pl-1.5 pr-5 py-1.5 shadow-[var(--shadow-brand)]">
            <Avatar initials="DP" />
            <div>
              <p className="text-xs font-semibold text-brand-foreground">Deplorix Projects</p>
              <p className="text-[10px] text-brand-foreground/80">Final-year mentors</p>
            </div>
            <MousePointer2 size={20} className="absolute -top-5 -left-4 fill-brand text-brand" />
          </div>
        </Floating>

        {/* Headline */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="pill-label"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Software, AI & digital studio in Bangalore
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="relative mt-6 text-[2.6rem] leading-[1.1] sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground"
          >
            Build. Deploy. Grow.
            <br />
            Software That Ships
            <br />
            <span className="text-ghost">For Startups & Students</span>
            <br />
            In Bangalore.

          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="mt-7 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Five specialist divisions building websites, apps, AI, brands, support teams and
            final-year projects — shipped, documented and supported.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              variant="hero-outline"
              className="h-12 px-7 text-[15px] w-full sm:w-auto"
              onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
            <Button
              variant="hero"
              className="h-12 px-7 text-[15px] gap-2 w-full sm:w-auto"
              onClick={() => setProjectOpen(true)}
            >
              Get Started <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="relative mt-20 md:mt-24">
        <LogoStrip />
      </div>

      <StartProjectDialog open={projectOpen} onOpenChange={setProjectOpen} />
    </section>
  );
};

export default HeroSection;
