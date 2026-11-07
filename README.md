# Premier Flexipac — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://www.premierflexipac.com/ (Premier Flexipac, 2160 Deerbrook Dr., Tyler, TX 75703).
Preview: https://pf.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

Custom one-page build: content in `src/App.jsx`, styles in `src/styles.css`, concept widget in `src/concept.jsx`.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Deployment
Vercel project `premier-flexipac` (framework Vite, team mrwerner-s-projects); pushes to `main` deploy automatically. Domain `pf.blueprintwebstudio.com` is a CNAME at Porkbun (use the target Vercel shows).
Optional env vars: `VITE_CONCEPT_END_DATE` (defaults to 2026-12-12 23:59 Central), `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` for the quote request form (`api/contact.js`; demo mode without them).
The interest form posts to the same-origin proxy `api/demo-interest.js` (prospect "Premier Flexipac", source `pf.blueprintwebstudio.com`).

## Design
- Logo: their own "PF" block mark (`images/pf.bmp`, 271 × 294, the full-size original of the header logo), converted to PNG with the white knocked out. The "PREMIER FLEXIPAC" wordmark next to it is set in heavy italic, as the old header set it in Arial Black italic.
- Palette from the logo: cyan #00ADEF and navy #2B3991, deepened to a navy-ink #121A4A for the dark sections, with a kraft-paper tan as the one warm neutral (it stands for the paper substrate they laminate). The old site's tan-and-gray "Architecture - Tan" Yahoo SiteBuilder template colors were stock, not their brand, so they were dropped.
- Fonts: Archivo (expanded headings), IBM Plex Sans (body), IBM Plex Mono (labels, spec-sheet feel).
- Motif: converting and laminating. The hero has a 3D exploded stack of the four substrates they laminate (paper, plastic film, fabric, foam), dashed die-cut lines, printer's crop marks around the product card, a perforated tear edge under the hero, and die-line drawings of each product.
- Signature section: a bag-size checker built from their "up to 60" wide by 250" long" spec. Enter a part's width and length and it draws it inside the maximum bag and says whether it fits.
- Section order: header with phone → hero (headline, quote/phone buttons, stats, layer stack) → seven products as a tabbed spec viewer → bag-size checker → five reasons → who we are (Bob and Judy Schmoker) → quote request form with phone, fax, email, address → footer.

## What changed from the current site
- The site is a 2018-era Yahoo SiteBuilder page (generator tag "Yahoo SiteBuilder/2.8.9") built as a fixed 762px-wide absolutely positioned layout, so on a phone it is tiny and has to be pinched and scrolled sideways. The concept is responsive and checked at 390px.
- The navigation is four image buttons with mouse-over swaps and no text, so it can't be read by search engines or screen readers. The concept uses real text links.
- The header and sidebar art (an office tower and glass building) is the template's stock architecture clipart, unrelated to packaging. The concept replaces it with packaging-specific visuals.
- The contact form posts over plain `http://` to `us.1.p9.webhosting.yahoo.com/forms`, a Yahoo web hosting form handler from the old Yahoo Small Business platform; the concept's quote form asks for product, quantity and part size.
- The phone and email are plain text in the footer, not tap-to-call or mailto links. Every phone number and email in the concept is a link.
- "In business for 35 years" is static text that hasn't changed since the page was published, and conflicts with "Started Premier Flexipac in the 70's" on the About page.
- Typos fixed: "commited", "developement", "innovated product", "Pipe w raps", "Grille Guards Wraps", "Bags and Pouches" header vs list.

## Photos
The current site has no photos of their own (only template clipart), so the concept uses drawn illustrations (layer stack, product die-line icons). Real photos of their products, plant and team would make a big difference before launch.
No awards, badges or reviews appear on the current site, so none are shown.

## Owner should confirm
- How long they have been in business. The site says "35 years" (written around 2018) and "started in the 70's"; the concept says "since the '70s" and drops the 35. Give the founding year to use.
- That Bob and Judy Schmoker still own and run it, and their titles (President / Vice President).
- Phone 903-581-5405, fax 903-581-5436 and the 2160 Deerbrook Dr. address are still current; whether a fax number is still wanted.
- "Priced below major competitors", "distributors throughout the US and abroad" and "a few pieces to truckloads every month" are taken from the site; confirm they still hold.
- The four linings (Valeron, Tyvek, non-woven fabric, plastic film) and the 60" × 250" maximum bag size.
- The quantity options in the quote form (a few pieces, hundreds, thousands, truckload/monthly) are the concept's own buckets.
- Office hours (none on the current site, so none are shown).
- No reviews are shown (none on the current site).
