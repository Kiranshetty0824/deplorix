import { Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/deplorix-logo.png";

const handleNavClick = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const columns = [
  {
    title: "DIVISIONS",
    links: [
      { label: "Deplorix Tech", href: "/work/tech", isRoute: true },
      { label: "Deplorix Digital", href: "/work/digital", isRoute: true },
      { label: "Deplorix Projects", href: "/work/projects", isRoute: true },
      { label: "Business Process Solutions", href: "/work/bps", isRoute: true },
      { label: "Deplorix Training", href: "/work/training", isRoute: true },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#solutions" },
      { label: "Careers", href: "#resources" },
      { label: "Projects", href: "#fyp" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "Terms & Conditions", href: "/terms", isRoute: true },
      { label: "Contact Support", href: "mailto:deplorixtechnologies@gmail.com" },
    ],
  },
];

const socials = [
  { icon: Mail, href: "mailto:deplorixtechnologies@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/deplorix-technologies/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/deplorix.tech", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-card text-muted-foreground border-t border-border rounded-t-[2rem] mx-3 md:mx-5 mb-0">
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-60" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-foreground tracking-wider mb-4 pb-3 border-b border-border">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"isRoute" in link && link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-brand transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="text-sm text-muted-foreground hover:text-brand transition-colors duration-300 text-left"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-semibold text-foreground tracking-wider mb-4 pb-3 border-b border-border">
              CONNECT
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-brand hover:text-brand-foreground transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
            <img src={logo} alt="DeploriX Technologies logo" className="h-8 w-8 rounded-full bg-card p-1 object-contain" width={32} height={32} />
            deploriX<span className="text-muted-foreground font-light">technologies</span>
          </a>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DeploriX Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
