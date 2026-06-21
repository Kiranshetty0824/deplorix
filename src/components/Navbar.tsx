import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import StartProjectDialog from "./StartProjectDialog";
import logo from "@/assets/deplorix-logo.png";

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
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-glass shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
            <img src={logo} alt="DeploriX Technologies logo" className="h-8 w-8 rounded-md object-contain" width={32} height={32} />
            deploriX<span className="text-muted-foreground font-light">technologies</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/verify"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              <ShieldCheck className="h-4 w-4" /> Verify Certificate
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-muted-foreground"
              onClick={() => window.location.href = "mailto:deplorixtechnologies@gmail.com"}
            >
              Contact
            </Button>
            <Button variant="hero" size="sm" className="text-sm px-5" onClick={() => setProjectOpen(true)}>
              Get Started
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden nav-glass border-t border-border/40 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-base text-left text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <Link
                  to="/verify"
                  onClick={() => setMobileOpen(false)}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-4 w-4" /> Verify Certificate
                </Link>
                <div className="flex gap-3 pt-4">
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
