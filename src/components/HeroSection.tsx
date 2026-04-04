import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import StartProjectDialog from "./StartProjectDialog";
import heroMockup from "@/assets/hero-mockup.jpg";

const HeroSection = () => {
  const [projectOpen, setProjectOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const cloud1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const cloud3Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cloud4Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const cloud5Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] flex flex-col items-center overflow-hidden bg-sky-100"
    >
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200/60 via-sky-100 to-sky-50" />

      {/* Parallax cloud shapes */}
      <motion.div style={{ y: cloud1Y }} className="absolute top-[12%] left-[8%] w-52 h-24 bg-white/70 rounded-full blur-2xl" />
      <motion.div style={{ y: cloud2Y }} className="absolute top-[8%] right-[12%] w-72 h-28 bg-white/60 rounded-full blur-3xl" />
      <motion.div style={{ y: cloud3Y }} className="absolute top-[22%] right-[35%] w-40 h-18 bg-white/50 rounded-full blur-2xl" />
      <motion.div style={{ y: cloud4Y }} className="absolute top-[18%] left-[30%] w-60 h-22 bg-white/40 rounded-full blur-3xl" />
      <motion.div style={{ y: cloud5Y }} className="absolute top-[30%] left-[55%] w-44 h-16 bg-white/55 rounded-full blur-2xl" />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-36 md:pt-44">
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

      {/* Product mockup */}
      <motion.div
        style={{ y: mockupY }}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-16 md:mt-20"
      >
        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/30 bg-white/50 backdrop-blur-sm">
          <img
            src={heroMockup}
            alt="DeploriX project dashboard interface"
            className="w-full h-auto"
            width={1920}
            height={1080}
          />
        </div>
      </motion.div>

      <StartProjectDialog open={projectOpen} onOpenChange={setProjectOpen} />
    </section>
  );
};

export default HeroSection;
