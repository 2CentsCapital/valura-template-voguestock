# Voguestock powered by Valura.Ai: landing page

Co-branded landing page that introduces Voguestock clients to global investing on Valura.Ai: global stocks and ETFs,
global mutual funds, bonds, structured income notes, pre-IPO opportunities and ready portfolios, funded in rupees under
the RBI Liberalised Remittance Scheme (LRS).

The page started as the "voguestock" template designed by Shibashis Pandit (GitHub Sibz22), forked into 2CentsCapital.
This version keeps the template's layout, motion and visual language and carries the content of the live landing at
<https://voguestock.valura.ai>, section by section.

## Stack

React 19, Vite 8, TypeScript and Tailwind CSS v4. Motion uses CSS transitions and keyframes with a small reveal
manager, Lenis for smooth scrolling and lucide-react icons. Leads are posted to Web3Forms from the browser. No backend.

## Page map

| Section | Anchor | Component |
| --- | --- | --- |
| Hero, app links and stats band | `#top` | `src/components/Hero.tsx` |
| What you can hold (six product shelves) | `#invest` | `src/components/FeatureTabs.tsx` |
| Why | `#why` | `src/components/Workflow.tsx` |
| How it works, with "Ready when you are" | `#how` | `src/components/Operations.tsx` |
| Trust, regulation and registrations, highlights marquee | `#trust` | `src/components/TrustSection.tsx` |
| Product demo video | `#demo` | `src/components/VideoSection.tsx` |
| FAQ | `#faq` | `src/components/Faq.tsx` |
| Open an account (lead form) | `#open` | `src/components/AccountForm.tsx` |
| Footer: contact, registrations, risk disclosure | | `src/components/Footer.tsx` |
| Sticky "Sign In" bar on phones | | `src/components/MobileCtaBar.tsx` |

Every outbound URL, contact detail and lead-form setting lives in `src/config.ts`.

## Content sources

- **Copy:** the live landing (repository `2CentsCapital/Vogue-Valura-Landing`, `src/App.jsx`, confirmed against the
  deployed bundle). Headlines, cards, steps, FAQs, CTA labels and disclaimers are carried over, edited only for the
  compliance points below and for the template's space.
- **Voguestock facts:** registrations (SEBI INZ000277536, NSDL IN-DP-119-2015, MF ARN 166877, IRDAI CA0190), contact
  details and address from the live landing, cross-checked with <https://www.voguestock.in>.
- **Valura.Ai facts:** the cobrand Studio's canonical metrics and legal copy: 90+ global markets, 100,000+ instruments,
  fractional investing from $1, a $10,000 minimum ticket for pre-IPO, the $250,000 LRS limit, and the regulated entity
  Valura India IFSC Limited, an IFSCA-regulated broker-dealer at GIFT SEZ, GIFT City, Gandhinagar, Gujarat 382355.
- **Brand:** the Studio's "Voguestock Powered By Valura.Ai" joint lockup (placed whole, never recoloured), the Voguestock
  favicon from the live landing, and the live landing's orange palette.
- **New copy written for this page** (no live wording existed): FAQ answers on account opening, TCS, withdrawals and fees,
  and the demo video introduction.

## Compliance edits against the live copy

- Structured Income: the protection claim and the coupon range are gone from the card and its chip. Coupons are
  described as indicative, disclosed per issue and not assured, with capital at risk.
- The retired minimum-investment figure is replaced with the canonical ones: fractional investing from $1 and pre-IPO
  from $10,000. The live $1,000 bond minimum stays.
- Private company names (pre-IPO) and third-party fund managers, with their superlative, removed.
- The live page's exchange count is replaced by the canonical "90+ global markets".
- Safety wording, "steady" income and the promise that holdings will grow removed.
- The UAE licence wording and "dual-regulated" replaced with the India descriptor for Valura India IFSC Limited.
- The disclaimer sentence about protected structures removed; the standard risk line is shown above the footer disclaimer.
- Brand written as "Valura.Ai" and the pairing as "Voguestock powered by Valura.Ai"; no dashes of the em or en kind anywhere.
- Product screens are marked "Illustrative only. Not investment advice." and show no personal data. The demo account's
  name and profile photos, its portfolio value, day change, allocation and cash balances, and the stock-deal
  recommendation card (which showed an upside percentage) are blurred in the dashboard images, the laptop mock and the
  video. The recording's closing positions and portfolio screens, which list holdings and P&L, are cut. Legible news
  headlines that name a real person and a company CEO's name are blurred as well.

## Run locally

Requires Node 20.19+ or 22.12+.

```bash
npm ci
npm run dev       # http://localhost:5173
npm run lint      # oxlint
npm run build     # type-check and build to dist/
npm run preview   # serve dist/
```

## Configuration

- `.env`: `VITE_SITE_URL`, the public origin used for the canonical link and the Open Graph and Twitter image URLs.
  Defaults to `https://voguestock.valura.ai`; override it at build time when the page is served from another host.
- `src/config.ts`: sign-up and sign-in URLs (`voguestock-app.valura.ai`), App Store and Google Play links, Web3Forms
  endpoint, key and subject, Voguestock contact details and policy links.

## Motion

Designed motion runs for every visitor, including visitors whose system asks for reduced motion.

- **What moves:** one-shot entrance reveals (sections with a short stagger, headings word by word, the hero headline
  line by line), count-ups in the stats band, ambient loops (bobbing hero icons, the floating dashboard, breathing
  product images, orbit rings, the rotating dome of tiles, the highlights marquee, a soft pulse on the demo play
  button), the WebGL backgrounds and the particle globe, carousel auto-advance on small screens, and hover and focus
  micro-interactions (card lift, button sheen and arrow nudge, sliding nav underline).
- **Reduced motion:** Lenis smooth scrolling and smooth anchor jumps are switched off, and ambient loops run about 1.5
  times slower. No effect is scrubbed to the scroll position, so nothing else changes.
- **Pause animations:** a toggle in the footer stops the ambient loops, the dome, the WebGL and canvas effects and
  carousel auto-advance, sets the highlights out once in centred wrapped rows (no edge fade, separators only between
  items on the same row), shows reveals and count-ups at their final state, and turns smooth scrolling off.
  The choice is stored in `localStorage` under `voguestock-motion-paused` and applied by an inline script in
  `index.html` before first paint. The marquee also pauses on hover; the carousel pauses on hover, on keyboard focus
  and for six seconds after a manual swipe. The demo video plays only when clicked.
- **Performance guards:** reveals and loops animate `transform` and `opacity` only (FAQ answers also animate their row
  height); CSS loops pause off screen; canvases pause off screen and in hidden tabs; WebGL renders at no more than 1.5
  device pixels per CSS pixel; a timed sweep reveals anything in or above the viewport if the IntersectionObserver
  never fires. Without JavaScript, a short `<noscript>` summary shows the headline, the sign-up link, the Voguestock
  contact and the risk line.
- **Code:** `src/lib/motion.ts` (pause store and hooks), `src/lib/reveal.ts` (reveal manager) and `src/index.css`
  (easing tokens, reveal states, keyframes and micro-interactions). To reveal an element, add `data-reveal` (optionally
  `fade`, `rise`, `pop` or `zoom`) and a `--reveal-delay`; to add a CSS loop, give it the `loop` class inside an element
  that carries `data-loops` from `useLoopZone`.

## Deploy

The repository ships a production image: a `node:20-alpine` build stage and an `nginx:alpine` runtime that serves `dist`
on port 80 (`nginx.conf`: SPA fallback, gzip, one-year cache for `/assets`, `no-cache` for `index.html`; health check
against `http://127.0.0.1/`).

```bash
docker build --build-arg VITE_SITE_URL=https://voguestock.valura.ai -t voguestock-landing .
docker run --rm -p 8080:80 voguestock-landing
```

On Coolify, use the Dockerfile build pack and expose port 80.

## Media

Images are WebP, sized for at most twice their rendered size. The template's 5.7 MB animated WebP is replaced by a still.
The demo video is re-encoded to 720p VP9 (WebM) and H.264 (MP4) without its silent audio track. It ends at the order
confirmation and fades back to the joint lockup, and its poster is taken from the redacted render.

## Needs sign-off

Voguestock:

1. Leadership names and roles in the trust block (Gopal Krishna Agarwal, B. S. Bisht), carried from the live page.
2. Heritage wording: "SEBI-regulated since 1995", "three decades", "30 years of trust", "thirty-year track record".
3. Contact details, the policy links to voguestock.in, and the promise that a specialist calls "within one business day".
4. MF ARN 166877 and IRDAI CA0190 in the footer registration line.

Compliance:

5. GIFT City custody characterisation kept from the live page: "Your money never leaves India", "Your money stays in
   India", "custodied in India the whole way", "held there with regulated custodians", "segregated, never on anyone's
   balance sheet" and "Regulated, custodied in GIFT City" in the meta description.
6. The US estate-tax claim ("The GIFT City structure shields residents & NRIs from it").
7. Eligibility: "residents, NRIs and foreign nationals welcome" and the form's investor types.
8. Service claims: "Open a free account", "Paperless KYC in minutes", "Tax & LRS reporting done for you", statements
   "generated for you", "Expert-built global baskets ... rebalanced for you", "AI-assisted research".
9. "Notes issued by A-rated global banks" and "Recognised at GITEX Global and Money 20/20".
10. The India-only Valura.Ai descriptor that replaces the live page's UAE licence wording (the UAE regulator named
    there was succeeded by a new authority from 1 January 2026, and a UAE licence line does not belong on an India page).
11. The new FAQ answers (account opening, TCS, withdrawals, fees) and the exchange codes NYSE, LSE, SGX and TSE shown in
    the decorative orbit.
12. Product screens (hero dashboard, laptop mock, demo video) no longer show personal data, but they show sample market
    prices and a demo purchase of a named US stock (Atlassian, TEAM) next to its analyst ratings. The recording's
    confirmation dialog also reads "46.93 shares" for a USD 46.93 order.
13. The final domain for `VITE_SITE_URL` and the inbox that receives Web3Forms leads (the key is shared with the live
    landings).
