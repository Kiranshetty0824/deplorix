import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-4 right-4 z-50"
      >
        <div className={`nav-floating mx-auto max-w-4xl px-4 md:px-6 flex items-center justify-between h-14 transition-all duration-500 ${
          scrolled ? "shadow-lg" : ""
        }`}>
          <a href="#" className="text-lg font-black tracking-tight text-foreground uppercase" style={{ letterSpacing: "0.05em" }}>
            DeploriX
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

          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              className="rounded-full text-xs px-5 font-semibold hidden md:inline-flex"
              onClick={() => setProjectOpen(true)}
            >
              Get Started
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground p-1"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-4xl mt-2 bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="px-6 py-5 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-base text-left text-muted-foreground hover:text-foreground transition-colors py-1"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="flex gap-3 pt-3 border-t border-border/40">
                  <Button variant="outline" size="sm" className="flex-1 rounded-full" onClick={() => window.location.href = "mailto:deplorixtechnologies@gmail.com"}>
                    Contact
                  </Button>
                  <Button size="sm" className="flex-1 rounded-full" onClick={() => { setMobileOpen(false); setProjectOpen(true); }}>
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
