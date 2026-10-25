import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import StartProjectDialog from "./StartProjectDialog";
import logo from "@/assets/deplorix-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#products" },
  { label: "Projects", href: "#fyp" },
  { label: "Careers", href: "#resources" },
  { label: "Our Work", href: "#pricing" },
  { label: "Explore", href: "/explore" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";

  const isActive = (href: string) =>
    href.startsWith("/") ? location.pathname === href : false;

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!isHome) {
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
          scrolled ? "nav-glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-20 gap-4">
          <Link to="/" className="flex items-center gap-2.5 text-foreground shrink-0" aria-label="DeploriX Technologies home">
            <img src={logo} alt="" className="h-9 w-9 rounded-full object-contain" width={36} height={36} />
            <span className="leading-[1.05] text-[15px] font-semibold tracking-tight">
              deploriX
              <span className="block font-medium text-muted-foreground">technologies</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur p-1.5 shadow-[var(--shadow-soft)]">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`rounded-full px-4 py-1.5 text-sm transition-all duration-300 ${
                    active
                      ? "bg-card text-foreground font-medium shadow-[var(--shadow-card)] border border-border/70"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center">
            <Button variant="hero" className="h-11 px-6 gap-2" onClick={() => setProjectOpen(true)}>
              Let's Talk <ArrowUpRight size={16} />
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden nav-glass overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="rounded-xl px-3 py-2.5 text-base text-left text-foreground/80 hover:bg-secondary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  variant="hero"
                  className="mt-3 h-11 gap-2"
                  onClick={() => {
                    setMobileOpen(false);
                    setProjectOpen(true);
                  }}
                >
                  Let's Talk <ArrowUpRight size={16} />
                </Button>
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
