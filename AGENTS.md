# Project: Cake & Corporate Treats Website

## What this is

A marketing website for a UK-based bakery business serving two audiences under one brand:

1. **Corporate Treats** — branded cupcakes, logo cookies, treat boxes, corporate gifting, event catering. B2B, bulk orders, quote-based.
2. **Custom Cakes** — bespoke celebration cakes: weddings, birthdays, baby showers, anniversaries. B2C, personalised, quote-based.

Brand positioning: _"Bespoke cakes & beautifully branded treats for businesses and celebrations."_
The client values **authenticity** — this should read as a real person who bakes by hand, not a faceless corporate bakery. But it must still be polished enough that a company will trust it with a large order.

Audience is in the UK. Prices in GBP.

## ⚠️ Constraints that shape every decision here

- **Hard two-week deadline**, client-driven. Evenings and weekends only (~25–40 hours total).
- The developer (Peter) is an experienced **Java backend developer** with **very little frontend experience**, learning as he goes.
- Therefore: **shipping beats elegance.** Prefer the boring, fast, working solution every time. Do not suggest refactors, abstractions, testing frameworks, or "while we're here" improvements unless something is actually broken.

## Design reference — read these before building any page

`docs/design/` contains the approved mockups as standalone HTML. **Open the relevant one before building a page**, and match its structure, section order and spacing.

| File | Page |
| --- | --- |
| `docs/design/home.html` | Home |
| `docs/design/corporate-treats.html` | Corporate Gifting (was "Corporate Treats"), including the full quote form |
| `docs/design/custom-cakes.html` | Custom Cakes |
| `docs/design/shop.html` | Shop — page removed at the client's request; no longer used |
| `docs/design/enquire.html` | Enquire |
| `docs/design/home-mobile.html` | Home at 390px — the reference for how everything collapses on a phone |

These use **inline styles** because they came out of a design tool. That is the mockup, not the implementation. Translate them into Tailwind utilities using the brand tokens below — never copy the inline styles across, and never introduce a hex value that isn't in the token table.

## How to work with me (Peter)

Given the deadline, the mode is **generate → I review → I tweak**, not "I write everything from scratch."

- Go ahead and write components and Tailwind markup for me.
- **Always explain what you did and why**, briefly, in the terms a backend dev would recognise. I'm learning by reading your diffs, so unexplained code is a wasted opportunity.
- When I ask "why is this broken", explain the underlying mechanism (how flexbox distributes space, why this element ignores its width) — don't just hand me a corrected line.
- I review every diff before accepting. Don't batch twenty file changes into one edit; keep changes small enough to read in five minutes.
- Flag it if I'm about to do something that will cost me time later.

## Stack

- **Astro** (static site generator). No React/Vue — this site needs no client-side interactivity beyond a mobile nav toggle.
- **Tailwind CSS v4**, installed via `@tailwindcss/vite`. Brand tokens are defined in `src/styles/global.css` under `@theme`, which generates the utilities (`bg-ground`, `text-ink`, `font-display`). **Always use those tokens, never arbitrary hex values or one-off sizes.**
- **No backend service.** Enquiries go through WhatsApp links (`https://wa.me/<number>?text=<pre-filled>`) and a third-party form service (Formspree or Web3Forms) for the forms.
- **No e-commerce / checkout.** Agreed with the client. See Payments below. **Do not add a cart, a checkout, or any server-side payment code.** A real checkout is an explicitly deferred phase two.
- **Hosting:** Netlify, deployed from GitHub on push. Set this up on day one, not at the end.

## Scope — pages for launch

The client chose the nav and pages on 2026-11-15 (replacing the earlier five-page plan; the Shop page was removed).

| Route | File | Contents |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Hero, two paths, how ordering works, gallery preview (links to `/gallery`), short about teaser (links to `/about`), testimonials, CTA |
| `/custom-cakes` | `src/pages/custom-cakes.astro` | Category tiles (link to gallery sections / wedding page), gallery, bespoke process, enquiry CTA |
| `/corporate-gifting` | `src/pages/corporate-gifting.astro` | Product grid with "from" prices, selling points, lead-time band, quote form (`#quote`) |
| `/about` | `src/pages/about.astro` | Abimbola's story and photo (both placeholders until she sends them), a few bakes, CTA |
| `/gallery` | `src/pages/gallery.astro` | Every photo, grouped by category (`galleryCategories` in `src/photos.ts`) with jump links |
| `/faqs` | `src/pages/faqs.astro` | Draft FAQs in `<details>` toggles; `[Abimbola to confirm: …]` placeholders where only she knows the answer |
| `/enquire` | `src/pages/enquire.astro` | Enquiry form, WhatsApp CTA, contact details, lead times |
| `/privacy`, `/allergens` | `src/pages/privacy.astro`, `allergens.astro` | Legal pages, linked from the footer and forms |

**Nav:** Home · Custom Cakes · Corporate Gifting · About · Gallery · FAQs, plus an "Enquire" button in accent pink (→ `/enquire`). The full row only just fits at laptop width, so the hamburger menu is used up to `xl:` (1280px).

**Wedding cakes are a category within Custom Cakes**, alongside birthday, children's and baby shower cakes — not a separate page (Abimbola's call, Nov 2026). The Wedding tile links to `/gallery#wedding`; add new wedding photos to `photos.wedding` in `src/photos.ts`.

`/corporate-treats` was renamed `/corporate-gifting`; `netlify.toml` redirects the old address (and `/shop` → `/`).

**Deferred until after launch** (do not build these now): a shop or online payments, a cart, customer accounts, order history, a CMS, a blog, order tracking, a date picker with availability.

## Payments

Two ordering routes, neither of which needs a backend:

1. **Corporate** → quote form → emails the owner → she raises a Stripe invoice from her dashboard.
2. **Bespoke and wedding cakes** → WhatsApp or enquiry form → conversation → 50% deposit invoice, then balance invoice.

Everything is done by the owner in her Stripe dashboard. **No API keys in this project. No webhooks. No server. No payment buttons on the site.**

## Quote form — build spec

Lives on `/corporate-gifting` (`#quote`). Posts to Formspree or Web3Forms, which emails the owner. Turn on the service's autoresponder.

Six required fields only — every extra required field loses completions. Quantity and date needed are required because they're the two biggest price drivers.

| Field | Type | Required |
| --- | --- | --- |
| Your name | `text` | Yes |
| Company name | `text` | Yes |
| Email | `email` | Yes |
| What are you interested in? | `select`: cupcakes / cake slices / event & conference treats / Christmas slab cakes / continental breakfast / corporate treat boxes / something else (matches the products on `/corporate-gifting`) | Yes |
| Approximate quantity | `number` | Yes |
| Date needed | `date` | Yes |
| Phone | `tel` | No |
| Delivery postcode, or collection | `text` | No |
| Branding requirements | `textarea` | No |
| What's the occasion? | `textarea` | No |
| Budget range | `text` | No |
| Anything else | `textarea` | No |
| Consent to be contacted | `checkbox` + link to privacy notice | Yes |

The **Enquire** page carries a shorter general form: name, email, phone, date needed, what it's about (select), free-text "tell us more", allergies/dietary requirements, consent checkbox.

Every input needs a real `<label>` (not a placeholder standing in for one), visible focus styles, and inline validation messages announced to screen readers. The consent checkbox must be unchecked by default — pre-ticking it does not constitute consent under UK GDPR.

**Neither form talks to Stripe.** They send an email; the owner prices the job and raises the invoice herself. Do not attempt to wire them together.

## Brand & design

Direction is "Warm & Handcrafted" — ivory ground, warm brown text, pale pink accents, generous whitespace, photography-led.

| Token | Utility | Value | Use |
| --- | --- | --- | --- |
| `--color-ground` | `bg-ground` | `#FBF6EF` | Page background (ivory) |
| `--color-ink` | `text-ink` | `#3E2C22` | Body text, headings, primary buttons |
| `--color-ink-soft` | `text-ink-soft` | `#55483C` | Secondary text, nav links |
| `--color-pink` | `bg-pink` | `#F4C9CE` | Accent fills — Enquire button, tags |
| `--color-pink-tint` | `bg-pink-tint` | `#F6DEE1` | Soft section backgrounds |
| `--color-sand` | `bg-sand` | `#F1E4D9` | Warm neutral section and card backgrounds |
| `--color-nude` | `border-nude` | `#C9A183` | Borders, dividers |
| `--color-rose` | `text-rose` | `#9C5A5E` | Accent text (italic handwritten-feel lines) |

**Pale pink is a fill colour, never text on a light background** — it fails contrast. Accent text uses `text-rose` or `text-ink`.

**Typography:** Fraunces (`font-display`) for headings at regular weight (400), with its `SOFT` and `WONK` axes turned up for a warm, handcrafted feel (set once in `global.css` via `--font-display--font-variation-settings`). Karla (`font-body`) for everything else. Both loaded from Google Fonts in `BaseLayout.astro`. Replaced Cormorant Garamond in Nov 2026 because it read as generic. No script or handwritten fonts for headings or body text. Allura (`font-script`) is used **only** for Abimbola's handwritten signature (homepage about teaser and the end of her story on `/about`) — never for headings or body text.

**Cake-like details** (soft, not "bubbly" — her logo is an elegant serif, and corporate buyers need to trust the site):
- `scallop-top` / `scallop-bottom` on a coloured section (`bg-pink-tint`, `bg-sand`, `bg-pink`) give it a piped-icing edge. Use on coloured bands only, not on every section.
- `<Photo arch />` gives a photo an arched top. Used for the hero strip, the about portrait and Custom Cakes categories — keep it for feature photos, not grids.
- Motion is subtle and always respects reduced-motion: sections fade up on scroll (script in `BaseLayout`), buttons lift slightly and gallery photos zoom on hover (`motion-safe:`). No carousels, parallax or bouncy animation.

**Copy tone:** warm, personal, specific. "Baked by hand, in small batches" — never "Welcome to our website" or generic marketing filler.

**Two copy points that must appear** (they're the specific things that convert each audience):

- Corporate Gifting must state that **formal quotes, invoicing and PO references** are handled. That's the reassurance a procurement contact is looking for. **Don't mention VAT receipts** — she isn't VAT-registered.
- Custom Cakes should carry a **"from" price**. People who can't tell whether the answer is £80 or £800 don't enquire at all.

## Conventions

- Shared shell (nav, footer, `<head>`, font links) lives in `src/layouts/BaseLayout.astro`. Every page uses it — never copy the nav into a page.
- Reusable pieces go in `src/components/`.
- **Photos** live in `src/assets/photos/<category>/` and are registered, with their alt text, in `src/photos.ts`. Pages use `<Photo {...photos.birthday.heartRedBows} class="h-64" />`; Astro's `<Image>` (inside `Photo.astro`) makes resized WebP copies with `srcset`/`width`/`height` at build time. The originals Abimbola sent are in `cake_pictures/` (git-ignored); resize to 2400px long edge and strip metadata before adding new ones.
- Other static files (logo, favicons) stay in `public/images/`, referenced as `/images/…`.
- **Mobile-first**: write base classes for phone width, widen with `md:` / `lg:` prefixes. `docs/design/home-mobile.html` is the reference.
- Always use responsive `<img>` with `loading="lazy"` and explicit `width`/`height`.

## Accessibility (non-negotiable, and fast to get right)

- Real elements only: `<button>`, `<a href>`, `<input>` + `<label>`. Never a clickable `<div>` — Tab skips it and a screen reader has nothing to announce.
- Text contrast at least 4.5:1 (3:1 at 24px+).
- Tap targets at least 44px.
- `aria-label` on icon-only buttons, including the mobile menu toggle.
- Meaningful `alt` on every image — on a photography-led site that's most of the page's meaning for anyone who can't see it.
- Visible focus styles throughout.

## Legal

- **UK GDPR** — both forms collect personal data, so the site needs a short privacy notice linked from every form and the footer.
- **Allergens** — as a UK food business she has allergen information obligations. Keep the allergen question on the enquiry form, and link `/allergens` from the footer.
  - Everything is made to order and quoted, so allergens are listed in each customer's quote, before they pay. If anything is ever sold online again, it must show the full ingredients list **before purchase**, with each of the 14 allergens in **bold** (the UK labelling format).
  - **Corporate and bespoke products** are quoted, not bought on the page: one note under the grid says allergens are listed in the quote, linking to `/allergens`. No per-product allergen line.
  - Ingredients and allergens must come from her recipes — never fill them in from assumptions.

## Placeholders

**The business name is LightCakes** (one word, capital C — confirmed by Peter). **The owner is Abimbola Ademoluti, based in Leeds, UK** (delivers to Leeds, Wakefield, Sheffield, Manchester, York, Middlesbrough, Huddersfield and Bradford — `DELIVERY_AREA` in `src/site.ts`). Instagram: `https://www.instagram.com/lightcakes_/` (set as `INSTAGRAM_URL` in `src/site.ts`). The logo source is `public/images/main.png` (1080×1350, LC monogram + wordmark on an off-white background); `public/images/logo-mark.png` (monogram, transparent) is used in the nav and `public/favicon.png` / `favicon.ico` are generated from it.

**Confirmed by Abimbola (Nov 2026):**
- Notice: custom cakes 7 days, wedding cakes 3 weeks, corporate orders 10 working days; cake slices always available.
- Corporate minimum order £200. She doesn't do cookies or brownies; she offers continental breakfast. No tastings — don't mention them.
- Every product contains milk, eggs and wheat (gluten); no gluten-free, dairy-free or vegan options.
- Cancellation: refundable more than 7 days before collection/delivery; not refundable within 7 days.
- Replies to enquiries within **two working days**. Enquiries that don't become orders are deleted after 6 months.

Photography, testimonials and prices are **not yet final**. Use clearly marked placeholders (`[YOUR PRICE]`, `£[X]`) and keep image files swappable. **Never invent a fake testimonial, a made-up price or a lead time.**