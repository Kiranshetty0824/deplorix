import { Linkedin, Instagram, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "PRODUCT",
    links: [
      { label: "Web Development", href: "#products" },
      { label: "App Development", href: "#products" },
      { label: "UI/UX Design", href: "#products" },
      { label: "Digital Marketing", href: "#products" },
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
      { label: "Terms", href: "/terms", isRoute: true },
      { label: "Contact Support", href: "mailto:deplorixtechnologies@gmail.com" },
    ],
  },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/deplorix.tech", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/deplorix-technologies/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:deplorixtechnologies@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-20 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold tracking-[0.2em] text-primary-foreground/60 mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"isRoute" in link && link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-primary-foreground/60 mb-5">CONNECT</h4>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} DeploriX Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
