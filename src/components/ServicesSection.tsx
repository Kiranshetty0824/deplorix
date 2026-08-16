import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Megaphone,
  GraduationCap,
  Headset,
  Users,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";

type SubService = {
  title: string;
  summary: string;
  includes: string[];
};

const divisions = [
  {
    id: "tech",
    icon: Code2,
    name: "Deplorix Tech",
    short: "Tech",
    tagline: "Websites, Apps & Software — Built and Shipped",
    blurb: "Digital products designed, built and shipped — from a simple business site to full custom software.",
    overview:
      "Deplorix Tech designs, builds, and ships digital products — from a simple business website to a full custom application. We work as an extension of your team, moving fast without cutting corners on quality, security, or scalability.",
    subServices: [
      {
        title: "Websites & Landing Pages",
        summary: "Fast, conversion-focused sites for brands and startups.",
        includes: [
          "Business websites, portfolios and landing pages",
          "SEO-ready structure, metadata and performance tuning",
          "CMS setup so your team can edit content",
          "Analytics, forms and lead capture wired in",
        ],
      },
      {
        title: "Web Applications & Internal Tools",
        summary: "Dashboards, portals and workflow tools built to your process.",
        includes: [
          "Admin dashboards and customer portals",
          "Role-based access and secure authentication",
          "Database design, APIs and third-party integrations",
          "Reporting, exports and automation flows",
        ],
      },
      {
        title: "Mobile App Development",
        summary: "Android and iOS apps from a single, maintainable codebase.",
        includes: [
          "Cross-platform builds (React Native / Flutter)",
          "Push notifications and offline-first support",
          "Payment, maps and device API integrations",
          "Play Store and App Store release support",
        ],
      },
      {
        title: "Custom Software & Integrations",
        summary: "Systems tailored to how your business actually runs.",
        includes: [
          "Bespoke software built to scope",
          "Third-party API and CRM/ERP integrations",
          "Migration from spreadsheets and legacy tools",
          "Architecture and scalability planning",
        ],
      },
      {
        title: "Maintenance & Feature Development",
        summary: "Ongoing care after launch, not a handover and goodbye.",
        includes: [
          "Bug fixes, patches and dependency updates",
          "New feature development in short sprints",
          "Uptime, backup and security monitoring",
          "Priority support windows",
        ],
      },
    ] as SubService[],
    audience:
      "Startups needing a professional digital presence fast, growing companies that need an internal tool built without hiring a full dev team, and businesses that need overflow development capacity.",
    process: [
      "Discovery call to understand your requirement and constraints",
      "Scoped proposal with clear milestones and timelines",
      "Build in short, reviewable sprints with regular check-ins",
      "Testing, handover, and post-launch support",
    ],
    work: [
      { title: "FinFlow Dashboard", type: "Web App", note: "Real-time financial analytics and invoicing platform" },
      { title: "HealthTrack Mobile", type: "Mobile App", note: "Cross-platform health tracking with wearable sync" },
      { title: "ShopEase Commerce", type: "E-Commerce", note: "Storefront, payments and admin operations suite" },
    ],
    cta: "Have a website or app idea? Let's scope it out.",
    ctaLabel: "Book a Free 20-Minute Scoping Call",
    subject: "Deplorix Tech — Free 20-minute call",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    id: "digital",
    icon: Megaphone,
    name: "Deplorix Digital",
    short: "Digital",
    tagline: "Marketing & Personal Branding That Gets Noticed",
    blurb: "Consistent brand presence, founder branding and campaigns that actually run on schedule.",
    overview:
      "Deplorix Digital handles the marketing work that founders and businesses know matters but rarely have time to do consistently — from building a brand's social presence to shaping a founder's personal brand into a credible, recognisable voice.",
    subServices: [
      {
        title: "Social Media Management",
        summary: "Always-on presence with a planned content calendar.",
        includes: [
          "Monthly content calendars across platforms",
          "Post design, captions and scheduling",
          "Community management and comment replies",
          "Monthly performance reporting",
        ],
      },
      {
        title: "Personal Branding for Founders",
        summary: "Turn your expertise into a recognisable public voice.",
        includes: [
          "Positioning and content pillars",
          "LinkedIn and X ghostwriting",
          "Profile, banner and bio optimisation",
          "Thought-leadership and repurposing system",
        ],
      },
      {
        title: "Performance Marketing",
        summary: "Paid campaigns run against real numbers.",
        includes: [
          "Meta, Google and LinkedIn ad campaigns",
          "Landing page and funnel setup",
          "Creative testing and audience iteration",
          "Cost-per-lead tracking and optimisation",
        ],
      },
      {
        title: "Brand Identity Design",
        summary: "A visual system your brand can grow into.",
        includes: [
          "Logo and mark design",
          "Colour, typography and usage guidelines",
          "Social and pitch-deck templates",
          "Marketing collateral and creative assets",
        ],
      },
      {
        title: "Content Creation",
        summary: "The raw material that keeps every channel fed.",
        includes: [
          "Short-form video scripting and editing support",
          "Post copy, captions and hooks",
          "Photo and graphic direction",
          "Repurposing across channels",
        ],
      },
    ] as SubService[],
    audience:
      "Founders building a personal brand alongside their company, D2C and SaaS brands needing consistent content output, and businesses that want marketing results without a full in-house team.",
    process: [
      "Brand and audience audit",
      "Content/campaign strategy aligned to your goals",
      "Monthly content calendar and campaign execution",
      "Performance reporting and iteration",
    ],
    work: [
      { title: "Founder Brand Sprint", type: "Personal Branding", note: "90-day LinkedIn presence build for a SaaS founder" },
      { title: "D2C Launch Campaign", type: "Performance", note: "Paid social funnel with creative testing cycles" },
      { title: "Brand Identity Refresh", type: "Design", note: "Logo, guidelines and social template system" },
    ],
    cta: "Ready to build a brand people notice? Let's talk strategy.",
    ctaLabel: "Book a Free 20-Minute Strategy Call",
    subject: "Deplorix Digital — Free 20-minute call",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
  },
  {
    id: "projects",
    icon: GraduationCap,
    name: "Deplorix Projects",
    short: "Projects",
    tagline: "Practical Project Delivery for Students",
    blurb: "Final-year projects built properly — working code, real documentation, and you understand all of it.",
    overview:
      "Deplorix Projects helps students turn academic requirements into real, working builds — with hands-on guidance rather than generic templates. We support the full journey from concept to a project you can confidently present and defend.",
    subServices: [
      {
        title: "Final-Year Project Development",
        summary: "A working build matched to your syllabus and skill level.",
        includes: [
          "Domain selection across CSE, IT, ECE, BCA, MCA and MBA",
          "Architecture, source code and database setup",
          "AI/ML, web, app and IoT project options",
          "Deployment and demo-ready setup",
        ],
      },
      {
        title: "Documentation & Reports",
        summary: "Everything the college asks for, formatted correctly.",
        includes: [
          "Full project report with chapters and diagrams",
          "Abstract, synopsis and literature survey",
          "UML, ER and architecture diagrams",
          "Final presentation deck",
        ],
      },
      {
        title: "One-on-One Mentorship",
        summary: "Guided build sessions, not a downloaded template.",
        includes: [
          "Scheduled check-ins through the build",
          "Code walkthroughs and concept explanations",
          "Doubt-clearing over call and chat",
          "Progress tracking against your submission date",
        ],
      },
      {
        title: "Viva & Review Preparation",
        summary: "Walk into the review able to defend every line.",
        includes: [
          "Expected question bank with answers",
          "Mock viva and review rehearsal",
          "Demo flow and presentation coaching",
          "Last-mile fixes before submission",
        ],
      },
    ] as SubService[],
    audience:
      "Final-year and pre-final-year students needing a working, well-documented project, and students who want to genuinely understand what they're building.",
    process: [
      "Understand your syllabus requirements and domain of interest",
      "Propose project options matched to your skill level and timeline",
      "Guided build with regular mentorship check-ins",
      "Documentation, presentation prep, and viva support",
    ],
    work: [
      { title: "EduConnect Platform", type: "SaaS", note: "Live classes, courses and performance dashboards" },
      { title: "AI Detection Project", type: "Machine Learning", note: "Model, dataset pipeline and full report" },
      { title: "Smart Campus App", type: "Mobile", note: "Attendance, notices and student portal build" },
    ],
    cta: "Need a final-year project done right? Let's find the right one for you.",
    ctaLabel: "Book a Free 20-Minute Project Call",
    subject: "Deplorix Projects — Free 20-minute call",
    bg: "bg-green-50 dark:bg-green-950/40",
    iconBg: "bg-green-100 dark:bg-green-900/50",
  },
  {
    id: "bps",
    icon: Headset,
    name: "Deplorix Business Process Solutions",
    short: "Business Process",
    tagline: "Dedicated Support Teams, Managed End-to-End",
    blurb: "A trained, managed support or sales team — without building one in-house.",
    overview:
      "Deplorix Business Process Solutions gives growing companies a dedicated, managed support team — without the cost and complexity of building one in-house. Every engagement comes with structured onboarding, quality oversight, and transparent reporting from day one.",
    subServices: [
      {
        title: "Customer Support",
        summary: "Multi-channel support handled by a dedicated team.",
        includes: [
          "Voice, email, chat and WhatsApp support",
          "Ticketing tool setup and SLA management",
          "Knowledge base and macro creation",
          "CSAT tracking and reporting",
        ],
      },
      {
        title: "Technical Support",
        summary: "L1 troubleshooting with clean escalation paths.",
        includes: [
          "L1 issue diagnosis and resolution",
          "Escalation matrix to your engineering team",
          "Runbook and troubleshooting documentation",
          "Incident logging and trend reporting",
        ],
      },
      {
        title: "Sales Support",
        summary: "Pipeline work done consistently, every day.",
        includes: [
          "Lead calling and qualification",
          "Appointment setting for your closers",
          "CRM hygiene and follow-up cadences",
          "Conversion and call-quality reporting",
        ],
      },
      {
        title: "Back-Office & Data Processes",
        summary: "Repeatable operational work taken off your plate.",
        includes: [
          "Data entry, validation and enrichment",
          "Order, billing and claims processing",
          "Document verification workflows",
          "Process documentation and SOPs",
        ],
      },
      {
        title: "Dedicated Managed Seats",
        summary: "Your team, our management layer.",
        includes: [
          "Dedicated agents on your process only",
          "Team Leader + QA/Trainer oversight built in",
          "Shift coverage aligned to your hours",
          "Weekly and monthly performance reviews",
        ],
      },
    ] as SubService[],
    audience:
      "SaaS, e-commerce, EdTech, travel, logistics, real estate and D2C companies hiring for support and sales roles who need a faster, lower-overhead way to scale.",
    process: [
      "Scope your requirement — seats, service type, working hours",
      "Recruit and train a dedicated team against your process",
      "Mock production, QA sign-off, and go-live",
      "Ongoing management with regular reporting and performance reviews",
    ],
    work: [
      { title: "E-Commerce Support Pod", type: "Customer Support", note: "Chat + email coverage with SLA reporting" },
      { title: "SaaS L1 Helpdesk", type: "Technical Support", note: "Ticket triage and escalation management" },
      { title: "EdTech Sales Desk", type: "Sales Support", note: "Lead qualification and appointment setting" },
    ],
    cta: "Currently hiring for support or sales roles? See if a dedicated team fits.",
    ctaLabel: "Book a Free 20-Minute Requirement Call",
    subject: "Deplorix Business Process Solutions — Free 20-minute call",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
  },
  {
    id: "training",
    icon: Users,
    name: "Deplorix Training",
    short: "Training",
    tagline: "Building the Workforce Our Other Divisions Run On",
    blurb: "Job-ready training in communication, process and tools — with a pathway into real roles.",
    overview:
      "Deplorix Training prepares people for real, job-ready roles — starting with the communication and process skills that power our own Business Process Solutions teams, and expanding into broader skill development and corporate training programs.",
    subServices: [
      {
        title: "Job-Readiness & Communication",
        summary: "The skills that decide who clears the interview.",
        includes: [
          "Spoken English and accent neutralisation",
          "Interview preparation and mock rounds",
          "Email and chat writing standards",
          "Workplace etiquette and confidence building",
        ],
      },
      {
        title: "Process & Tools Upskilling",
        summary: "Practical training on how support work actually runs.",
        includes: [
          "Ticketing and CRM tool training",
          "Call handling and escalation processes",
          "Quality parameters and scoring",
          "Live scenario practice",
        ],
      },
      {
        title: "Certification Pathways",
        summary: "Structured levels with assessments at each stage.",
        includes: [
          "Module-wise assessments",
          "Practical evaluation on real scenarios",
          "Support-role certification",
          "Direct pathway into Business Process Solutions roles",
        ],
      },
      {
        title: "Corporate Training",
        summary: "Team-wide programs built around your process.",
        includes: [
          "Custom curriculum for your team",
          "Onboarding and ramp-up programs",
          "Refresher and quality-improvement modules",
          "Trainer-led sessions with progress reporting",
        ],
      },
    ] as SubService[],
    audience:
      "Candidates preparing for support, technical support or sales roles, and companies wanting a trained, ready-to-deploy talent pipeline.",
    process: [
      "Assess current skill level and target role",
      "Structured training modules — communication, process, tools",
      "Practical assessment and mock scenarios",
      "Certification and, where relevant, direct placement pathway",
    ],
    work: [
      { title: "Support Readiness Batch", type: "Training Program", note: "Communication + process track for fresh graduates" },
      { title: "Internal Talent Pipeline", type: "Placement Pathway", note: "Trained candidates deployed into live BPS teams" },
      { title: "Corporate Ramp-Up", type: "Corporate Training", note: "Onboarding curriculum for a growing support team" },
    ],
    cta: "Want a trained, job-ready team without the ramp-up time? Let's talk.",
    ctaLabel: "Book a Free 20-Minute Training Call",
    subject: "Deplorix Training — Free 20-minute call",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    iconBg: "bg-rose-100 dark:bg-rose-900/50",
  },
];

type Division = (typeof divisions)[number];

const mailto = (subject: string) =>
  `mailto:deplorixtechnologies@gmail.com?subject=${encodeURIComponent(subject)}`;

const SubServiceCard = ({ item, index }: { item: SubService; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl bg-background/70 border border-border/40 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 text-left p-5"
        aria-expanded={open}
      >
        <span>
          <span className="block text-base font-semibold text-foreground">{item.title}</span>
          <span className="mt-1 block text-sm text-muted-foreground">{item.summary}</span>
        </span>
        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="px-5 pb-5 space-y-2 border-t border-border/40 pt-4">
              {item.includes.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check size={14} className="mt-0.5 shrink-0 text-foreground" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const RelevantWork = ({ division }: { division: Division }) => (
  <div>
    <h4 className="text-sm font-semibold text-foreground mb-3">See relevant work</h4>
    <div className="grid sm:grid-cols-3 gap-3">
      {division.work.map((w) => (
        <div key={w.title} className="rounded-2xl bg-background/70 border border-border/40 p-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {w.type}
          </span>
          <p className="mt-1 text-base font-semibold text-foreground">{w.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{w.note}</p>
        </div>
      ))}
    </div>
  </div>
);

const ServicesSection = () => {
  const [activeId, setActiveId] = useState(divisions[0].id);
  const [selected, setSelected] = useState<Division | null>(null);
  const active = divisions.find((d) => d.id === activeId) ?? divisions[0];

  return (
    <section id="products" className="section-padding bg-surface-elevated">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
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

        {/* Division selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {divisions.map((d) => {
            const isActive = d.id === activeId;
            return (
              <button
                key={d.id}
                onClick={() => setActiveId(d.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${
                  isActive ? "text-background font-semibold" : "text-muted-foreground hover:text-foreground font-medium"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="division-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-foreground"
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <d.icon size={15} />
                  {d.short}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active division panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-3xl p-8 md:p-12 border border-transparent ${active.bg}`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className={`w-14 h-14 rounded-2xl ${active.iconBg} flex items-center justify-center mb-6`}>
                  <active.icon size={24} className="text-foreground" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{active.name}</h3>
                <p className="mt-2 text-base md:text-lg font-serif italic text-foreground/70">{active.tagline}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">{active.blurb}</p>
              </div>

              <button
                onClick={() => setSelected(active)}
                className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-foreground hover:gap-2.5 transition-all duration-300"
              >
                Explore this division
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-3">
              {active.subServices.map((s, i) => (
                <SubServiceCard key={s.title} item={s} index={i} />
              ))}
            </div>

            <div className="mt-10">
              <RelevantWork division={active} />
            </div>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-background/70 border border-border/40 p-6">
              <p className="text-base font-serif italic text-foreground">{active.cta}</p>
              <a
                href={mailto(active.subject)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-foreground text-primary-foreground hover:bg-foreground/90 transition-colors shrink-0"
              >
                {active.ctaLabel} <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
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
                    <DialogTitle className="text-xl font-bold">{selected.name}</DialogTitle>
                    <DialogDescription className="mt-1 font-serif italic">
                      {selected.tagline}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-2 space-y-6">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Overview</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.overview}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Everything included</h4>
                  <div className="space-y-3">
                    {selected.subServices.map((s) => (
                      <div key={s.title} className="rounded-xl bg-secondary/30 p-4">
                        <p className="text-base font-semibold text-foreground">{s.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{s.summary}</p>
                        <ul className="mt-3 space-y-1.5">
                          {s.includes.map((line) => (
                            <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Check size={14} className="mt-0.5 shrink-0 text-foreground" />
                              {line}
                            </li>
                          ))}
                        </ul>
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
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-[11px] font-semibold text-foreground shrink-0">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">See relevant work</h4>
                  <div className="space-y-2">
                    {selected.work.map((w) => (
                      <div key={w.title} className="flex items-start gap-3 rounded-xl bg-secondary/30 p-3">
                        <Badge variant="secondary" className="shrink-0">{w.type}</Badge>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{w.title}</p>
                          <p className="text-sm text-muted-foreground">{w.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-sm font-serif italic text-foreground">{selected.cta}</p>
                </div>

                <a
                  href={mailto(selected.subject)}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-full px-6 py-3 text-sm font-semibold bg-foreground text-primary-foreground hover:bg-foreground/90 transition-colors"
                >
                  {selected.ctaLabel} <ArrowRight size={16} />
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
