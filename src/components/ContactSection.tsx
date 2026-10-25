import AnimatedSection from "./AnimatedSection";
import ServiceInquiryForm from "./ServiceInquiryForm";
import { Mail, Linkedin, Instagram, MapPin, ArrowRight } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email Us",
    value: "deplorixtechnologies@gmail.com",
    href: "mailto:deplorixtechnologies@gmail.com",
    bg: "bg-secondary",
    iconBg: "bg-accent",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "DeploriX Technologies",
    href: "https://www.linkedin.com/company/deplorix-technologies/",
    bg: "bg-secondary",
    iconBg: "bg-accent",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@deplorix.tech",
    href: "https://www.instagram.com/deplorix.tech",
    bg: "bg-secondary",
    iconBg: "bg-accent",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-surface-elevated">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="pill-label">
            Get in Touch
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-foreground">
            Let's connect
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to join our team? Reach out through any of the channels below.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactLinks.map((link, i) => (
            <AnimatedSection key={link.label} delay={i * 0.12}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`block rounded-3xl p-8 hover-lift group text-center h-full border border-transparent hover:border-border/30 transition-all duration-500 ${link.bg}`}
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl ${link.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <link.icon size={24} className="text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{link.label}</h3>
                <p className="text-sm text-muted-foreground break-all">{link.value}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Connect <ArrowRight size={12} />
                </span>
              </a>
            </AnimatedSection>
          ))}
        </div>

        <ServiceInquiryForm />
      </div>
    </section>
  );
};

export default ContactSection;
