export type CaseStudy = {
  slug: string;
  title: string;
  type: string;
  challenge: string;
  approach: string[];
  outcome: string[];
};

export type DivisionExtras = {
  metrics: { value: string; label: string }[];
  testimonial: { quote: string; author: string; role: string };
  seo: { title: string; description: string };
  intro: string;
  caseStudies: CaseStudy[];
};

export const divisionExtras: Record<string, DivisionExtras> = {
  tech: {
    metrics: [
      { value: "40+", label: "Products shipped" },
      { value: "6 wks", label: "Avg. MVP timeline" },
      { value: "98%", label: "On-time delivery" },
    ],
    testimonial: {
      quote:
        "They scoped our dashboard in a week and shipped it in six. It felt like having an in-house product team without the hiring.",
      author: "Rahul M.",
      role: "Founder, FinTech Startup (Bangalore)",
    },
    seo: {
      title: "Web & App Development Case Studies | Deplorix Tech Bangalore",
      description:
        "Real Deplorix Tech work: dashboards, mobile apps and e-commerce platforms built for startups and businesses in Bangalore. See the scope, approach and outcomes.",
    },
    intro:
      "Selected Deplorix Tech builds — web applications, mobile apps and commerce platforms delivered end to end, from scoping through post-launch support.",
    caseStudies: [
      {
        slug: "finflow-dashboard",
        title: "FinFlow Dashboard",
        type: "Web App",
        challenge:
          "A finance team ran invoicing and reporting across spreadsheets, losing hours every week to manual reconciliation.",
        approach: [
          "Mapped the existing workflow and designed a single source of truth",
          "Built a role-based dashboard with real-time analytics",
          "Automated invoice generation and payment reminders",
        ],
        outcome: [
          "Weekly reporting time cut from hours to minutes",
          "One dashboard replaced five spreadsheets",
          "Audit-ready records exportable in one click",
        ],
      },
      {
        slug: "healthtrack-mobile",
        title: "HealthTrack Mobile",
        type: "Mobile App",
        challenge:
          "A health brand needed one cross-platform app to sync wearable data and present it in a way users actually understood.",
        approach: [
          "Cross-platform build shipped to both stores from one codebase",
          "Wearable and device API integrations with offline-first sync",
          "Clear visual language for heart rate, BP and activity data",
        ],
        outcome: [
          "One codebase serving iOS and Android",
          "Reliable background sync with wearables",
          "Store-ready release with post-launch support",
        ],
      },
      {
        slug: "shopease-commerce",
        title: "ShopEase Commerce",
        type: "E-Commerce",
        challenge:
          "A growing D2C brand outgrew its template storefront and needed real operations tooling behind it.",
        approach: [
          "Custom storefront focused on conversion and speed",
          "Payments, shipping and inventory integrations",
          "Admin suite for orders, catalogue and reporting",
        ],
        outcome: [
          "Faster page loads and a cleaner checkout flow",
          "Operations handled in-house without external tools",
          "Scalable catalogue structure for new product lines",
        ],
      },
    ],
  },
  digital: {
    metrics: [
      { value: "90 days", label: "Brand sprint cycle" },
      { value: "3x", label: "Avg. reach growth" },
      { value: "12+", label: "Brands managed" },
    ],
    testimonial: {
      quote:
        "My LinkedIn went from silent to inbound leads every week. The content actually sounds like me.",
      author: "Sneha K.",
      role: "Founder, SaaS Product",
    },
    seo: {
      title: "Digital Marketing & Founder Branding Work | Deplorix Digital",
      description:
        "Social media management, founder personal branding and performance marketing campaigns by Deplorix Digital, Bangalore. See the strategy, execution and results.",
    },
    intro:
      "Selected Deplorix Digital work — founder branding, performance campaigns and identity systems built to run consistently, month after month.",
    caseStudies: [
      {
        slug: "founder-brand-sprint",
        title: "Founder Brand Sprint",
        type: "Personal Branding",
        challenge:
          "A SaaS founder had deep expertise but no public presence and no time to write consistently.",
        approach: [
          "Positioning workshop and content pillars",
          "Ghostwritten LinkedIn posts on a fixed weekly cadence",
          "Profile, banner and bio rewritten for clarity",
        ],
        outcome: [
          "Consistent weekly publishing for 90 days",
          "Steady growth in profile views and inbound conversations",
          "A repeatable content system the founder now runs",
        ],
      },
      {
        slug: "d2c-launch-campaign",
        title: "D2C Launch Campaign",
        type: "Performance Marketing",
        challenge:
          "A new D2C line needed paid traction without burning the launch budget on untested creative.",
        approach: [
          "Funnel and landing page built before spend started",
          "Structured creative testing across Meta and Google",
          "Weekly cost-per-lead reviews and audience iteration",
        ],
        outcome: [
          "Winning creative identified inside the first cycle",
          "Cost per lead reduced across the campaign",
          "Clear reporting the founder could act on",
        ],
      },
      {
        slug: "brand-identity-refresh",
        title: "Brand Identity Refresh",
        type: "Design",
        challenge:
          "An established business looked dated and inconsistent across every channel it appeared on.",
        approach: [
          "New logo, colour system and typography scale",
          "Usage guidelines for internal and agency teams",
          "Social and pitch-deck template kit",
        ],
        outcome: [
          "One consistent identity across all channels",
          "Faster content production using templates",
          "A visual system built to scale with the brand",
        ],
      },
    ],
  },
  projects: {
    metrics: [
      { value: "150+", label: "Student projects delivered" },
      { value: "100%", label: "Documentation included" },
      { value: "1:1", label: "Mentorship on every build" },
    ],
    testimonial: {
      quote:
        "I could explain every part of my project in the viva because I built it with them, not bought it from them.",
      author: "Akash R.",
      role: "Final Year CSE Student",
    },
    seo: {
      title: "Final Year Project Case Studies | Deplorix Projects Bangalore",
      description:
        "Real final year projects delivered for CSE, IT, ECE, BCA and MCA students — working code, full documentation, 1:1 mentorship and viva preparation.",
    },
    intro:
      "Selected Deplorix Projects builds — final year projects delivered with working code, college-format documentation and viva preparation.",
    caseStudies: [
      {
        slug: "ai-final-year-project",
        title: "AI/ML Final Year Project",
        type: "CSE / IT",
        challenge:
          "A student needed an AI project that met IEEE-style requirements but was still explainable in a viva.",
        approach: [
          "Domain and dataset chosen around the student's skill level",
          "Model, backend and dashboard built together in sessions",
          "Report, diagrams and presentation prepared alongside the build",
        ],
        outcome: [
          "Working demo deployed and review-ready",
          "Complete report with UML and architecture diagrams",
          "Student able to defend every module in the viva",
        ],
      },
      {
        slug: "web-final-year-project",
        title: "Full-Stack Web Project",
        type: "BCA / MCA",
        challenge:
          "A student had a syllabus requirement but no clear path from idea to a submitted, working system.",
        approach: [
          "Requirement mapping against the college rubric",
          "Guided full-stack build with weekly checkpoints",
          "Deployment plus demo flow rehearsal",
        ],
        outcome: [
          "Submitted ahead of the deadline",
          "Documentation formatted to college guidelines",
          "Mock viva completed before the real review",
        ],
      },
      {
        slug: "iot-final-year-project",
        title: "IoT Mini & Major Project",
        type: "ECE",
        challenge:
          "Hardware plus software integration that had to work reliably on demo day, not just in theory.",
        approach: [
          "Component selection and circuit planning",
          "Firmware, dashboard and data pipeline built together",
          "Repeated dry runs before submission",
        ],
        outcome: [
          "Stable, repeatable live demo",
          "Full report with block and circuit diagrams",
          "Backup plan prepared for review day",
        ],
      },
    ],
  },
  bps: {
    metrics: [
      { value: "24/7", label: "Coverage available" },
      { value: "<2 wks", label: "Team ramp-up" },
      { value: "3", label: "Support channels handled" },
    ],
    testimonial: {
      quote:
        "We handed over support and got our engineering hours back. Response times improved in the first month.",
      author: "Vikram S.",
      role: "Operations Head, D2C Brand",
    },
    seo: {
      title: "Business Process & Support Case Studies | Deplorix BPS",
      description:
        "Customer support, back-office and process outsourcing work by Deplorix Business Process Solutions — trained teams, clear SLAs and measurable outcomes.",
    },
    intro:
      "Selected Deplorix Business Process Solutions engagements — support desks, back-office operations and process redesign run by trained teams.",
    caseStudies: [
      {
        slug: "support-desk-setup",
        title: "Support Desk Setup",
        type: "Customer Support",
        challenge:
          "A growing brand was answering customer queries out of a shared inbox with no ownership or SLA.",
        approach: [
          "Helpdesk tooling and ticket workflow configured",
          "Response templates and escalation matrix defined",
          "Trained agents deployed with quality monitoring",
        ],
        outcome: [
          "Every query tracked to resolution",
          "Faster first-response times",
          "Founders removed from day-to-day support",
        ],
      },
      {
        slug: "back-office-operations",
        title: "Back-Office Operations",
        type: "Process Outsourcing",
        challenge:
          "Repetitive data and order-processing work was eating into a small team's productive hours.",
        approach: [
          "Process documented into standard operating procedures",
          "Dedicated team assigned with daily throughput targets",
          "Quality checks and weekly reporting",
        ],
        outcome: [
          "Consistent daily processing without backlog",
          "Internal team refocused on core work",
          "Transparent reporting on volume and accuracy",
        ],
      },
      {
        slug: "process-audit",
        title: "Process Audit & Redesign",
        type: "Consulting",
        challenge:
          "Manual handoffs between teams were causing delays no one could clearly explain.",
        approach: [
          "End-to-end process mapping across teams",
          "Bottleneck analysis and automation opportunities",
          "Redesigned workflow with clear ownership",
        ],
        outcome: [
          "Handoffs reduced and ownership made explicit",
          "Automation applied to the most repetitive steps",
          "A documented process the team can actually follow",
        ],
      },
    ],
  },
  training: {
    metrics: [
      { value: "200+", label: "Candidates trained" },
      { value: "4 wks", label: "Core program length" },
      { value: "Direct", label: "Placement pathway" },
    ],
    testimonial: {
      quote:
        "The mock scenarios were the difference. I walked into interviews already knowing how the job works.",
      author: "Divya P.",
      role: "Support Associate",
    },
    seo: {
      title: "Training & Placement Case Studies | Deplorix Training Bangalore",
      description:
        "Job-readiness, communication and corporate training programs by Deplorix Training — curriculum, assessment and placement pathway outcomes.",
    },
    intro:
      "Selected Deplorix Training programs — job-readiness batches, placement pathways and corporate curricula built around real workflows.",
    caseStudies: [
      {
        slug: "support-readiness-batch",
        title: "Support Readiness Batch",
        type: "Training Program",
        challenge:
          "Fresh graduates had degrees but no exposure to real support processes or customer communication.",
        approach: [
          "Communication and process modules run over four weeks",
          "Tool training in live-like ticketing environments",
          "Mock scenarios and practical assessment",
        ],
        outcome: [
          "Candidates job-ready at the end of the batch",
          "Measured improvement across mock assessments",
          "Direct pathway into live support teams",
        ],
      },
      {
        slug: "internal-talent-pipeline",
        title: "Internal Talent Pipeline",
        type: "Placement Pathway",
        challenge:
          "Hiring trained support staff at short notice was slow and unpredictable.",
        approach: [
          "Continuous training batches feeding a ready bench",
          "Role-specific assessment before deployment",
          "Deployment into live Deplorix BPS teams",
        ],
        outcome: [
          "Shorter time-to-deploy for new roles",
          "Consistent baseline quality across hires",
          "A career pathway for trained candidates",
        ],
      },
      {
        slug: "corporate-ramp-up",
        title: "Corporate Ramp-Up",
        type: "Corporate Training",
        challenge:
          "A growing support team needed onboarding that did not depend on senior staff time.",
        approach: [
          "Custom curriculum built around the client's process",
          "Trainer-led sessions with progress reporting",
          "Refresher modules for existing staff",
        ],
        outcome: [
          "Faster onboarding without pulling seniors off the floor",
          "Standardised quality across the team",
          "A reusable curriculum for future hires",
        ],
      },
    ],
  },
};
