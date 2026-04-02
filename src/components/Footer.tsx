import { Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Web Development", href: "#products" },
      { label: "App Development", href: "#products" },
      { label: "UI/UX Design", href: "#products" },
      { label: "Digital Marketing", href: "#products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#solutions" },
      { label: "Careers", href: "#resources" },
      { label: "Projects", href: "#fyp" },
      { label: "Contact", href: "#contact" },
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
    <footer className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <a href="#" className="text-xl font-bold tracking-tight text-foreground">
              deploriX<span className="text-muted-foreground font-light">technologies</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Building exceptional digital products and empowering the next
              generation of developers.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-primary-foreground transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DeploriX Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-border">|</span>
            <p className="text-sm text-muted-foreground">
              deplorixtechnologies@gmail.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
