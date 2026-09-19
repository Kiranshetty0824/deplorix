# AI Project Advisor + Persistent Contact CTA

Two additions to the existing site, built inside the current look and feel — no redesign, no colour or typography changes.

## 1. AI Project Advisor

A new section on the home page (and on Explore) where a prospective client describes what they need in plain words and instantly gets back:

- The best-fit division (Tech, Digital, Projects, Business Process, Training) with a one-line reason
- 2-4 recommended sub-services picked from our real service list
- A short project brief: goals, suggested scope, phases, and a realistic timeline
- Suggested next step

Below the result: "Send this as my request" — pushes the brief straight into the existing enquiry form with the recommended division preselected, and "See relevant work" — links to that division's case-study page.

Presentation: a card in the existing rounded-3xl pastel style, textarea plus a few optional chips (budget range, timeline, who you are: business / student / startup). Streaming-style progressive reveal, skeleton while thinking, clear friendly error text if the service is busy or unavailable.

## 2. Persistent contact CTA

A slim floating bar (desktop) / compact bottom bar (mobile) that appears once the visitor scrolls past the hero and hides near the footer. It shows the currently relevant service context — e.g. "Talking about: Deplorix Tech — Web App Development" — and a "Get a proposal" button.

Context is captured automatically: whichever division/service section or card the visitor last viewed or clicked (services, hero phone, projects, explore, advisor result) sets the context. Clicking the button scrolls to the enquiry form with that division preselected and the service noted in the message field. The existing WhatsApp button stays; the two are positioned so they never overlap.

## 3. Impressive polish (scoped, no redesign)

- Section-entry reveals and subtle parallax already in place extended to the new blocks
- Result card with tasteful metric chips and division colour accents from the current palette
- Advisor result adds JSON-LD-free but SEO-friendly static intro copy so the section still reads well without JS

## Technical notes

- Backend: a Lovable Cloud edge function `project-advisor` calls Lovable AI Gateway (`openai/gpt-6-astra`, Responses API) with the real division/sub-service catalogue from `src/data/divisions.ts` injected into the prompt, returning structured JSON (division id, reasons, sub-services, brief sections, timeline, next step). Streams the response so long answers never time out. Handles rate-limit and credit errors with clear in-app messages.
- No API key needed from you; no data stored unless you later ask for lead capture.
- Frontend: `src/components/ProjectAdvisor.tsx`, a small `useServiceContext` store (`src/lib/service-context.ts`) that all sections write into, and `src/components/StickyContactBar.tsx`. `ServiceInquiryForm.tsx` gains an optional prefilled message and service label; existing `openInquiry` event is extended rather than replaced.
- Typography tokens from `src/lib/typography.ts` and existing colour tokens only.
- Verify with a live advisor call, mobile/desktop screenshots, build log, and `npm run seo:audit`.
