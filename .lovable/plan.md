# Full-site restyle: "Creative Portfolio" look

Restyle every page to match your uploaded reference: warm light-grey canvas, mustard-yellow accents, charcoal text, chunky rounded headings, playful doodle icons, and a little stick-figure animation. All existing content, pages, forms, the AI advisor, the contact bar, case studies and SEO stay exactly as they work today — only the look changes.

## The look (taken from your image)

```text
Colours   canvas #E6E6E4   ink #3B3B3B   yellow #F2A818   white cards #FFFFFF
Headings  chunky rounded bold (Fredoka), all caps for big titles
Body      clean rounded sans (Outfit)
Motifs    big yellow quote marks  ""  before headings
          yellow dot at the end of headings  "HELLO."
          yellow pill highlight behind one word  "TABLE [OF] CONTENT"
          faint outlined section numbers 01 / 02 / 03 in the background
          vertical side label "DEPLORIX (c) 2026" on the right edge
          section header row:  About ───────────── (>)
          yellow rounded blocks sitting behind images / phone
          yellow rounded-square icon tiles with a white label band
          thin line-art doodles (laptop, camera, gear, pen, rocket)
```

## Page by page

1. **Navigation** — grey glass pill, chunky logo text, yellow active underline, yellow "Get Started" button with a round arrow.
2. **Home hero** — giant two-line "BUILD. DEPLOY. GROW." in the chunky font with "GROW" on a yellow pill, small yellow "Introducing DeploriX" tag, quote marks, floating doodles around, the existing 3D phone sitting on a yellow rounded block with a thin circle outline behind it (like the photo in your image), faint "01" in the corner, round arrow button with "DeploriX Technologies" bottom-left.
3. **About ("HELLO.")** — about-team photo turned greyscale on a yellow block, "HELLO." heading, intro paragraph, small "Education/Experience"-style info columns become "What we do / Where we are / Tools we use" with tool-logo chips, and a "Let's Work Together" contact strip with a QR code to the site.
4. **Services ("TABLE OF CONTENT" style)** — the five divisions become big yellow rounded tiles with a doodle icon and a white label band, exactly like the four tiles in your image; clicking a tile opens the same division detail panel as today, restyled in white cards with yellow accents.
5. **Final-year projects, Workflow, Internship, Projects, Upcoming** — each gets the section header row, faint section number, quote-mark heading with yellow dot, white rounded cards with charcoal text, yellow tags, and a timeline-dots layout for the workflow steps.
6. **AI Advisor + enquiry form + CTA** — yellow chips for choices, charcoal buttons with yellow hover, result card on white with yellow phase badges.
7. **Footer** — charcoal footer with yellow headings and the vertical side label.
8. **Explore, case study pages, Terms, 404, admin** — same palette, fonts, headers and cards so nothing looks off-brand.
9. **Stick-figure animation** — a small line-drawn stick figure that walks along the section-header line, waves in the hero, and sits on a laptop in the "Let's get started" banner (lightweight, turns off for people who prefer reduced motion).

## Images to create

- Transparent line-art doodle images: laptop + code, camera, gear/monitor, pen tool, megaphone, graduation cap, headset, rocket, lightbulb.
- Five doodle-style icons for the division tiles.
- QR code generated in the page (no image file).

## Technical notes

- Replace colour tokens in `src/index.css` (light only, per project memory) and `tailwind.config.ts`: background, foreground, primary = yellow, secondary/muted greys, new `--brand-yellow`, `--ink`, outline-number and highlight utilities.
- Load Fredoka + Outfit from Google Fonts in `index.html`; update `src/lib/typography.ts` tokens (display = Fredoka uppercase, body = Outfit) so every section updates centrally.
- New shared pieces: `SectionHeader` (label + line + round arrow), `QuoteHeading` (quotes, highlight word, yellow dot), `SectionNumber`, `SideLabel`, `Doodle`, `StickFigure` (SVG + Framer Motion), `IconTile`.
- Restyle each section component in place; keep data, routes, analytics, SEO and forms untouched.
- Update project memory: new design rules replace "Craft.do minimal / pastel cards".
- Verify desktop + mobile screenshots for each page, build log, and `npm run seo:audit`.
