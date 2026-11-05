import {
  Code2,
  Megaphone,
  GraduationCap,
  Headset,
  Users,
} from "lucide-react";

export type SubService = {
  title: string;
  summary: string;
  includes: string[];
};

export const divisions = [
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
    bg: "bg-card border border-border/70 shadow-[var(--shadow-card)]",
    iconBg: "bg-accent",
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
    bg: "bg-card border border-border/70 shadow-[var(--shadow-card)]",
    iconBg: "bg-accent",
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
    bg: "bg-card border border-border/70 shadow-[var(--shadow-card)]",
    iconBg: "bg-accent",
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
    bg: "bg-card border border-border/70 shadow-[var(--shadow-card)]",
    iconBg: "bg-accent",
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
    bg: "bg-card border border-border/70 shadow-[var(--shadow-card)]",
    iconBg: "bg-accent",
  },
];

export type Division = (typeof divisions)[number];

export const getDivision = (id: string) => divisions.find((d) => d.id === id);
