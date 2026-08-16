import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Code2, Megaphone, GraduationCap, Headset, Users, ArrowRight, Check } from "lucide-react";

const divisions = [
  {
    icon: Code2,
    name: "Deplorix Tech",
    tagline: "Websites, Apps & Software — Built and Shipped",
    overview:
      "Deplorix Tech designs, builds, and ships digital products — from a simple business website to a full custom application. We work as an extension of your team, moving fast without cutting corners on quality, security, or scalability.",
    offer: [
      "Business websites and landing pages, built for speed and conversions",
      "Web applications and internal tools tailored to your workflow",
      "Mobile app development for Android and iOS",
      "Custom software development and third-party API integrations",
      "Website/app maintenance, bug fixes, and ongoing feature development",
    ],
    audience:
      "Startups needing a professional digital presence fast, growing companies that need an internal tool built without hiring a full dev team, and businesses that need overflow development capacity without the overhead of expanding headcount.",
    process: [
      "Discovery call to understand your requirement and constraints",
      "Scoped proposal with clear milestones and timelines",
      "Build in short, reviewable sprints with regular check-ins",
      "Testing, handover, and post-launch support",
    ],
    cta: "Have a website or app idea? Let's scope it out — book a free 20-minute call.",
    subject: "Deplorix Tech — Free 20-minute call",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    icon: Megaphone,
    name: "Deplorix Digital",
    tagline: "Marketing & Personal Branding That Gets Noticed",
    overview:
      "Deplorix Digital handles the marketing work that founders and businesses know matters but rarely have time to do consistently — from building a brand's social presence to shaping a founder's personal brand into a credible, recognisable voice in their industry.",
    offer: [
      "Social media management and content calendars across platforms",
      "Personal branding strategy and content for founders/professionals",
      "Performance marketing — paid social and search campaigns",
      "Brand identity design (logos, visual guidelines, creative assets)",
      "Content creation — posts, captions, short-form video support",
    ],
    audience:
      "Founders who want to build their personal brand alongside their company, D2C and SaaS brands needing consistent content output, and businesses that want marketing results without hiring a full in-house team.",
    process: [
      "Brand and audience audit",
      "Content/campaign strategy aligned to your goals",
      "Monthly content calendar and campaign execution",
      "Performance reporting and iteration",
    ],
    cta: "Ready to build a brand people notice? Let's talk strategy — book a free 20-minute call.",
    subject: "Deplorix Digital — Free 20-minute call",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
  },
  {
    icon: GraduationCap,
    name: "Deplorix Projects",
    tagline: "Practical Project Delivery for Students",
    overview:
      "Deplorix Projects helps students turn academic requirements into real, working builds — with hands-on guidance rather than generic templates. We support the full journey from concept to a project you can confidently present and defend.",
    offer: [
      "Final-year and academic project development across engineering, CS, and MBA domains",
      "Full project documentation, reports, and presentation material",
      "One-on-one mentorship through the build process",
      "Guidance on explaining and defending the project to evaluators",
    ],
    audience:
      "Final-year and pre-final-year students needing a working, well-documented project, and students who want to genuinely understand what they're building — not just submit something copied online.",
    process: [
      "Understand your syllabus requirements and domain of interest",
      "Propose project options matched to your skill level and timeline",
      "Guided build with regular mentorship check-ins",
      "Documentation, presentation prep, and viva support",
    ],
    cta: "Need a final-year project done right? Let's find the right one for you — book a free 20-minute call.",
    subject: "Deplorix Projects — Free 20-minute call",
    bg: "bg-green-50 dark:bg-green-950/40",
    iconBg: "bg-green-100 dark:bg-green-900/50",
  },
  {
    icon: Headset,
    name: "Deplorix Business Process Solutions",
    tagline: "Dedicated Support Teams, Managed End-to-End",
    overview:
      "Deplorix Business Process Solutions gives growing companies a dedicated, managed support team — without the cost and complexity of building one in-house. Every engagement comes with structured onboarding, quality oversight, and transparent reporting from day one.",
    offer: [
      "Customer support — voice, email, chat, WhatsApp, ticketing",
      "Technical support — L1 troubleshooting and escalation management",
      "Sales support — lead calling, qualification, and appointment booking",
      "Back-office and data support processes",
      "Dedicated seats with Team Leader + QA/Trainer oversight built in",
    ],
    audience:
      "SaaS, e-commerce, EdTech, travel, logistics, real estate, and D2C companies that are currently hiring (or struggling to hire) for support and sales roles, and need a lower-overhead, faster way to scale their team.",
    process: [
      "Scope your requirement — seats, service type, working hours",
      "Recruit and train a dedicated team against your process",
      "Mock production, QA sign-off, and go-live",
      "Ongoing management with regular reporting and performance reviews",
    ],
    cta: "Currently hiring for support or sales roles? See if a dedicated outsourced team fits — book a free 20-minute call.",
    subject: "Deplorix Business Process Solutions — Free 20-minute call",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
  },
  {
    icon: Users,
    name: "Deplorix Training",
    tagline: "Building the Workforce Our Other Divisions Run On",
    overview:
      "Deplorix Training prepares people for real, job-ready roles — starting with the communication and process skills that power our own Business Process Solutions teams, and expanding into broader skill development and corporate training programs.",
    offer: [
      "Job-readiness and communication skills training",
      "Technical and process-specific upskilling for support roles",
      "Support-role certification pathways",
      "Corporate training programs (future phase)",
    ],
    audience:
      "Candidates preparing for support, technical support, or sales roles, and companies wanting a trained, ready-to-deploy talent pipeline rather than starting recruitment from scratch.",
    process: [
      "Assess current skill level and target role",
      "Structured training modules — communication, process, tools",
      "Practical assessment and mock scenarios",
      "Certification and, where relevant, direct pathway into Business Process Solutions roles",
    ],
    cta: "Want a trained, job-ready team without the ramp-up time? Let's talk — book a free 20-minute call.",
    subject: "Deplorix Training — Free 20-minute call",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    iconBg: "bg-rose-100 dark:bg-rose-900/50",
  },
];

type Division = (typeof divisions)[number];

const DivisionCard = ({
  division,
  index,
  onOpen,
  wide,
}: {
  division: Division;
  index: number;
  onOpen: () => void;
  wide?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative cursor-pointer ${wide ? "md:col-span-2" : ""}`}
      onClick={onOpen}
    >
      <div
        className={`rounded-3xl p-8 md:p-10 hover-lift h-full flex flex-col border border-transparent hover:border-border/30 transition-all duration-500 ${division.bg}`}
      >
        <div className="flex items-start justify-between gap-6">
          <div
            className={`w-14 h-14 rounded-2xl ${division.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
          >
            <division.icon size={24} className="text-foreground" />
          </div>
          <span className="text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
            Division {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-2xl md:text-[1.7rem] font-semibold text-foreground mb-2">{division.name}</h3>
        <p className="text-sm md:text-base font-serif italic text-foreground/70 mb-4">{division.tagline}</p>
        <p className="text-muted-foreground mb-6 leading-relaxed">{division.overview}</p>

        <ul className={`mt-auto space-y-2 ${wide ? "md:columns-2 md:gap-8" : ""}`}>
          {division.offer.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground break-inside-avoid">
              <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <span className="mt-7 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          Explore this division
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [selected, setSelected] = useState<Division | null>(null);

  return (
    <section id="products" className="section-padding bg-surface-elevated">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Our Divisions
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Five divisions. One standard.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Each division runs its own specialised services — built, staffed, and delivered end-to-end by Deplorix.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {divisions.map((division, i) => (
            <DivisionCard
              key={division.name}
              division={division}
              index={i}
              wide={i === divisions.length - 1}
              onOpen={() => setSelected(division)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-2xl ${selected.iconBg} flex items-center justify-center shrink-0`}>
                    <selected.icon size={24} />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selected.name}</DialogTitle>
                    <DialogDescription className="mt-1 font-serif italic">
                      {selected.tagline}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-2 space-y-5">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Overview</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.overview}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">What we offer</h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selected.offer.map((f) => (
                      <div
                        key={f}
                        className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-secondary/30"
                      >
                        <Check size={14} className="mt-0.5 shrink-0 text-foreground" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Who it's for</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.audience}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">How we work</h4>
                  <ol className="space-y-2">
                    {selected.process.map((step, i) => (
                      <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-[11px] font-medium text-foreground shrink-0">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-sm font-serif italic text-foreground">{selected.cta}</p>
                </div>

                <a
                  href={`mailto:deplorixtechnologies@gmail.com?subject=${encodeURIComponent(selected.subject)}`}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-full px-6 py-3 text-sm font-medium bg-foreground text-primary-foreground hover:bg-foreground/90 transition-colors"
                >
                  Book a Free 20-Minute Call <ArrowRight size={16} />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;
