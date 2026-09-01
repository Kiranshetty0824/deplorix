/**
 * Global typography style guide.
 *
 * Single source of truth for font family, weight and size combinations used
 * across the site. Import these tokens instead of hand-writing class strings so
 * the Services selector, proof blocks and case study pages stay identical.
 */

export const type = {
  /** Small uppercase label above a section heading. */
  eyebrow: "text-xs font-medium tracking-wider uppercase text-muted-foreground",
  /** Page / section hero heading (h1, h2). */
  displayLg: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground",
  /** Panel / card heading (h2, h3). */
  displayMd: "text-2xl md:text-3xl font-bold tracking-tight text-foreground",
  /** Sub-heading inside a panel (h3, h4). */
  headingSm: "text-base font-semibold text-foreground",
  /** Smallest heading used for proof-block labels. */
  headingXs: "text-sm font-semibold text-foreground",
  /** Serif italic tagline / pull quote line. */
  tagline: "text-base md:text-lg font-serif italic text-foreground/70",
  /** Large serif italic quote used in testimonials. */
  quote: "text-base md:text-lg font-serif italic text-foreground leading-relaxed",
  quoteLg: "text-xl md:text-2xl font-serif italic text-foreground leading-relaxed",
  /** Intro paragraph under a section heading. */
  lead: "text-lg text-muted-foreground",
  /** Default body copy. */
  body: "text-base text-muted-foreground leading-relaxed",
  /** Secondary / supporting copy. */
  bodySm: "text-sm text-muted-foreground",
  /** Caption used for meta chips (project type, role, etc). */
  caption: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
  /** Big numeric value in an impact metric block. */
  metricValue: "text-2xl md:text-3xl font-bold tracking-tight text-foreground",
  metricValueLg: "text-3xl md:text-4xl font-bold tracking-tight text-foreground",
  metricLabel: "text-xs md:text-sm text-muted-foreground",
  /** Interactive text. */
  pillActive: "text-sm font-semibold",
  pillIdle: "text-sm font-medium",
  link: "text-sm font-semibold text-foreground",
  button: "text-sm font-semibold",
  label: "text-sm font-medium",
} as const;

export type TypeToken = keyof typeof type;
