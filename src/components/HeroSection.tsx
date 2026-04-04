import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import StartProjectDialog from "./StartProjectDialog";

const HeroSection = () => {
  const [projectOpen, setProjectOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sky-100">
      {/* Sky background with subtle clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200/60 via-sky-100 to-sky-50" />

      {/* Decorative cloud shapes */}
      <div className="absolute top-[15%] left-[10%] w-48 h-20 bg-white/70 rounded-full blur-2xl" />
      <div className="absolute top-[10%] right-[15%] w-64 h-24 bg-white/60 rounded-full blur-3xl" />
      <div className="absolute top-[25%] right-[30%] w-36 h-16 bg-white/50 rounded-full blur-2xl" />
      <div className="absolute bottom-[30%] left-[20%] w-56 h-20 bg-white/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground"
        >
          Your partner for apps, websites, and big ideas
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <Button
            variant="hero-outline"
            size="lg"
            className="text-base px-8 py-6 bg-background/80 backdrop-blur-sm"
            onClick={() => setProjectOpen(true)}
          >
            Start a Project
          </Button>
        </motion.div>
      </div>

      <StartProjectDialog open={projectOpen} onOpenChange={setProjectOpen} />
    </section>
  );
};

export default HeroSection;
