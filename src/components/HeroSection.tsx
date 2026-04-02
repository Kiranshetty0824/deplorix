import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import StartProjectDialog from "./StartProjectDialog";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [projectOpen, setProjectOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Craft-style watercolor pastel background */}
      <div className="absolute inset-0 craft-section-blue" />
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        width={1920}
        height={1080}
      />

      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-craft-yellow/40 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-craft-purple/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-card/20 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] text-foreground"
        >
          Your space for
          <br />
          digital products
          <br />
          and big ideas
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base px-8 py-6 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card hover:shadow-lg transition-all duration-300"
            onClick={() => setProjectOpen(true)}
          >
            Get Started Free
          </Button>
        </motion.div>

        {/* Phone/device mockup placeholder area */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 mx-auto max-w-sm"
        >
          <div className="relative rounded-[2rem] overflow-hidden bg-card shadow-2xl border border-border/30 p-4">
            <img
              src={heroBg}
              alt="DeploriX showcase"
              className="w-full h-auto rounded-2xl object-cover"
              width={960}
              height={640}
            />
          </div>
        </motion.div>
      </div>

      <StartProjectDialog open={projectOpen} onOpenChange={setProjectOpen} />
    </section>
  );
};

export default HeroSection;
