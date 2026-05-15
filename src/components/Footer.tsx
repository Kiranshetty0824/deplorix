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
    <footer className="bg-neutral-950 text-neutral-300 rounded-t-3xl mx-4 md:mx-6 mb-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-neutral-400 tracking-wider mb-4 pb-3 border-b border-neutral-800">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"isRoute" in link && link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 text-left"
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
            <h4 className="text-xs font-semibold text-neutral-400 tracking-wider mb-4 pb-3 border-b border-neutral-800">
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
                  className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-neutral-700 hover:text-white transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
            <img src={logo} alt="DeploriX Technologies logo" className="h-8 w-8 rounded-md bg-white p-1 object-contain" width={32} height={32} />
            deploriX<span className="text-neutral-500 font-light">technologies</span>
          </a>
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} DeploriX Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
