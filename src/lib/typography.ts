/**
 * Global typography style guide.
 *
 * Single source of truth for font family, weight and size combinations used
 * across the site. Import these tokens instead of hand-writing class strings so
 * the Services selector, proof blocks and case study pages stay identical.
 */

export const type = {
  /** Small uppercase label above a section heading. */
  eyebrow: "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-foreground/60",
  /** Page / section hero heading (h1, h2). */
  displayLg: "font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.95] text-foreground",
  /** Panel / card heading (h2, h3). */
  displayMd: "font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground",
  /** Sub-heading inside a panel (h3, h4). */
  headingSm: "text-base font-semibold text-foreground",
  /** Smallest heading used for proof-block labels. */
  headingXs: "text-sm font-semibold text-foreground",
  /** Serif italic tagline / pull quote line. */
  tagline: "text-base md:text-lg italic text-foreground/70",
  /** Large serif italic quote used in testimonials. */
  quote: "text-base md:text-lg italic text-foreground leading-relaxed",
  quoteLg: "font-display text-xl md:text-2xl font-medium text-foreground leading-relaxed",
  /** Intro paragraph under a section heading. */
  lead: "text-lg text-muted-foreground",
  /** Default body copy. */
  body: "text-base text-muted-foreground leading-relaxed",
  /** Secondary / supporting copy. */
  bodySm: "text-sm text-muted-foreground",
  /** Caption used for meta chips (project type, role, etc). */
  caption: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
  /** Big numeric value in an impact metric block. */
  metricValue: "font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground",
  metricValueLg: "font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground",
  metricLabel: "text-xs md:text-sm text-muted-foreground",
  /** Interactive text. */
  pillActive: "text-sm font-semibold",
  pillIdle: "text-sm font-medium",
  link: "text-sm font-semibold text-foreground",
  button: "text-sm font-semibold",
  label: "text-sm font-medium",
} as const;

export type TypeToken = keyof typeof type;
