import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import StartProjectDialog from "./StartProjectDialog";

const navLinks = [
  { label: "Services", href: "#products" },
  { label: "Projects", href: "#fyp" },
  { label: "Careers", href: "#resources" },
  { label: "Our Work", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
      >
        <div className="bg-background/90 backdrop-blur-xl rounded-full border border-border/50 shadow-lg px-4 md:px-6 flex items-center justify-between h-14 md:h-16">
          <a href="#" className="text-lg font-bold tracking-tight text-foreground">
            deploriX<span className="text-muted-foreground font-light">technologies</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-muted-foreground rounded-full"
              onClick={() => window.location.href = "mailto:deplorixtechnologies@gmail.com"}
            >
              Log in
            </Button>
            <Button variant="hero" size="sm" className="text-sm px-5" onClick={() => setProjectOpen(true)}>
              Get Started
            </Button>
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground p-1"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 bg-background/95 backdrop-blur-xl rounded-3xl border border-border/50 shadow-lg overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-base text-left text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="flex gap-3 pt-3">
                  <Button variant="hero-outline" size="sm" className="flex-1" onClick={() => window.location.href = "mailto:deplorixtechnologies@gmail.com"}>
                    Contact
                  </Button>
                  <Button variant="hero" size="sm" className="flex-1" onClick={() => { setMobileOpen(false); setProjectOpen(true); }}>
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <StartProjectDialog open={projectOpen} onOpenChange={setProjectOpen} />
    </>
  );
};

export default Navbar;
