import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import StartProjectDialog from "./StartProjectDialog";
import HeroPhone from "./HeroPhone";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [projectOpen, setProjectOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Hero background image */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-background/85" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-secondary rounded-full blur-3xl opacity-60 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-40 animate-float animate-delay-300" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left — copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider uppercase text-muted-foreground bg-secondary rounded-full border border-border/60">
              Introducing DeploriX Technologies
            </span>
          </motion.div>

          <h1 className="sr-only">
            Building Innovative Software &amp; AI Solutions for Startups and Students — DeploriX Technologies, Bangalore
          </h1>

          <motion.div
            role="presentation"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] text-foreground"
          >
            Build.
            <br />
            Deploy.
            <br />
            <span className="text-gradient">Grow.</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Five specialist divisions building websites, apps, brands, support teams
            and student projects — shipped, documented and supported.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
          >
            <Button
              variant="hero"
              size="lg"
              className="text-base px-8 py-6 gap-2 w-full sm:w-auto"
              onClick={() => setProjectOpen(true)}
            >
              Start a Project <ArrowRight size={18} />
            </Button>
            <Button
              asChild
              variant="hero-outline"
              size="lg"
              className="text-base px-8 py-6 w-full sm:w-auto"
            >
              <Link to="/explore">Explore Our Work</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right — 3D phone */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <HeroPhone source="hero" />
        </motion.div>
      </div>

      <StartProjectDialog open={projectOpen} onOpenChange={setProjectOpen} />
    </section>
  );
};

export default HeroSection;
