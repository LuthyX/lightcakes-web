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
| `docs/design/corporate-treats.html` | Corporate Treats, including the full quote form |
| `docs/design/custom-cakes.html` | Custom Cakes |
| `docs/design/shop.html` | Shop |
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

## Scope — 5 pages for launch

| Route | File | Contents |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Hero, two paths, how ordering works, gallery preview, about/authenticity section, testimonials, CTA |
| `/corporate-treats` | `src/pages/corporate-treats.astro` | Product grid with "from" prices, selling points, lead-time band, quote form |
| `/custom-cakes` | `src/pages/custom-cakes.astro` | Categories, large gallery, bespoke process, enquiry CTA |
| `/shop` | `src/pages/shop.astro` | Fixed-price items with Stripe payment link buttons — **conditional, see below** |
| `/enquire` | `src/pages/enquire.astro` | Enquiry form, WhatsApp CTA, contact details, lead times |

**Nav:** Home · Corporate Treats · Custom Cakes · Shop · Enquire, plus a "Get a Quote" button in accent pink.

**The Shop page is built** on the expectation that she'll sell fixed-price, shelf-stable items (brownie boxes, cookie tins) — not yet confirmed by her. If she doesn't want it: delete `src/pages/shop.astro` and the Shop entry in `navLinks` in `BaseLayout.astro`, and the nav returns to four items. Her Stripe Payment Links don't exist yet; until a product has one, its button falls back to the enquiry page.

**Deferred until after launch** (do not build these now): standalone Gallery and About pages, a cart, customer accounts, order history, a CMS, a blog, order tracking, a date picker with availability. About and Gallery live as homepage sections for now.

`corporate-treats.astro` and `custom-cakes.astro` share almost all their structure — build one, then reuse its components for the other. Don't write the second from scratch.

## Payments

Three ordering routes, none of which need a backend:

1. **Fixed-price items** → Stripe Payment Link buttons on `/shop`. Plain `<a href="https://buy.stripe.com/…">Order now</a>`, nothing more.
2. **Corporate** → quote form → emails the owner → she raises a Stripe invoice from her dashboard.
3. **Bespoke cakes** → WhatsApp or enquiry form → conversation → 50% deposit invoice, then balance invoice.

Everything beyond the anchor tags is configured by the owner in the Stripe dashboard. **No API keys in this project. No webhooks. No server.**

Worth knowing when writing Shop page copy: Stripe's checkout collects quantity (with min/max), delivery address and phone — so the site does **not** need those. It allows a maximum of **three custom fields** per link (here: date needed, allergies, message/inscription) and up to ten optional add-on items. There is no cart, so each product is a separate transaction.

## Quote form — build spec

Lives on `/corporate-treats`. Posts to Formspree or Web3Forms, which emails the owner. Turn on the service's autoresponder.

Six required fields only — every extra required field loses completions. Quantity and date needed are required because they're the two biggest price drivers.

| Field | Type | Required |
| --- | --- | --- |
| Your name | `text` | Yes |
| Company name | `text` | Yes |
| Email | `email` | Yes |
| What are you interested in? | `select`: branded cupcakes / logo cookies / brownies & blondies / corporate treat boxes / branded gift boxes / event catering / something else | Yes |
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

**Typography:** Cormorant Garamond (`font-display`) for headings at weight 500, Karla (`font-body`) for everything else, loaded from Google Fonts in `BaseLayout.astro`.

**Copy tone:** warm, personal, specific. "Baked by hand, in small batches" — never "Welcome to our website" or generic marketing filler.

**Two copy points that must appear** (they're the specific things that convert each audience):

- Corporate Treats must state that **invoicing, VAT receipts and PO references** are handled. That's the reassurance a procurement contact is looking for.
- Custom Cakes should carry a **"from" price**. People who can't tell whether the answer is £80 or £800 don't enquire at all.

## Conventions

- Shared shell (nav, footer, `<head>`, font links) lives in `src/layouts/BaseLayout.astro`. Every page uses it — never copy the nav into a page.
- Reusable pieces go in `src/components/`.
- Images in `public/images/`, referenced as `/images/…`.
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
  - **Shop products** (bought online) must show the full ingredients list **before purchase**, with each of the 14 allergens in **bold** — the UK labelling format. It sits in an "Ingredients & allergens" `<details>` toggle on each product card, from the product's `ingredients` field. Don't add a separate "Contains: …" line repeating the bold allergens; a "may contain" warning is fine (`mayContain`).
  - **Corporate and bespoke products** are quoted, not bought on the page: one note under the grid says allergens are listed in the quote, linking to `/allergens`. No per-product allergen line.
  - Ingredients and allergens must come from her recipes — never fill them in from assumptions.

## Placeholders

**The business name is LightCakes** (one word, capital C — confirmed by Peter). **The owner is Abimbola Ademoluti, based in Leeds, UK** (delivery area not yet confirmed — keep `[area]`). Instagram: `https://www.instagram.com/lightcakes_/` (set as `INSTAGRAM_URL` in `src/site.ts`). The logo source is `public/images/main.png` (1080×1350, LC monogram + wordmark on an off-white background); `public/images/logo-mark.png` (monogram, transparent) is used in the nav and `public/favicon.png` / `favicon.ico` are generated from it.

Photography, testimonials, prices and lead times are **not yet final**. Use clearly marked placeholders (`[YOUR PRICE]`, `[X] days`) and keep image files swappable. **Never invent a fake testimonial, a made-up price or a lead time.**