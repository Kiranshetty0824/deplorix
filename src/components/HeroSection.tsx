import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-subtle)" }} />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-secondary rounded-full blur-3xl opacity-60 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-40 animate-float animate-delay-300" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-wider uppercase text-muted-foreground bg-secondary rounded-full border border-border/60">
            Introducing DeploriX Technologies
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-foreground"
        >
          Build.
          <br />
          Deploy.
          <br />
          <span className="text-gradient">Grow.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          We help businesses build exceptional digital products and empower the
          next generation of developers through hands-on training.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="hero" size="lg" className="text-base px-8 py-6 gap-2">
            Start a Project <ArrowRight size={18} />
          </Button>
          <Button variant="hero-outline" size="lg" className="text-base px-8 py-6">
            Explore Careers
          </Button>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative"
        >
          <div className="glass-card p-2 md:p-3">
            <div className="bg-secondary rounded-xl aspect-video flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-3 gap-3 p-8 w-full max-w-lg">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="bg-background rounded-lg aspect-square shadow-sm border border-border/50"
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Glow underneath */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-foreground/5 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
