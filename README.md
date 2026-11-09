# Half 4 Life (H4L) — Lanz Clinic website

A static, multi-page website for **Half 4 Life**, the surgical charity of **Lanz Clinic** in Mbarara, Western Uganda. The design uses a sticky header, a single-image hero, split editorial sections, a six-photo field strip, a featured procedure, a donation band, a contact band, and a footer. Content is adapted from the H4L project proposal.

The site is plain HTML, CSS, and vanilla JavaScript. There is no build step, framework, package manager, or backend.

## Run locally

```bash
cd "/Users/giftmuhoozi/Half 4 Life"
python3 -m http.server 8128
```

Then open:

**http://127.0.0.1:8128/index.html**

The site can also be opened directly from `index.html`, but a local server is recommended so relative paths and the WhatsApp form behave exactly as they will when hosted.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Homepage: static hero, mission split, stats, six-step pathway, six-photo field strip, featured procedure, donation band, and WhatsApp contact form. |
| `about.html` | Mission, vision, values, clinical pathway, governance, leadership, districts served, and a link to the patient stories. |
| `donate.html` | Unit-cost explanation, donation tiers, transparent cost table, bank details, accountability measures, and other ways to help. |
| `contact.html` | Contact directory, medical-emergency notice, referral and partnership form, clinic/donation cards, and FAQ. |
| `galleries.html` | “Surgery Galleries”: twelve curated clinical and theatre photographs. |
| `procedures.html` | Priority general surgery procedures and the plastic/reconstructive surgery program, with referral and support CTAs. |
| `stories.html` | Five patient-story cards, a giving card, and a three-photo “patient journey” strip. |
| `blog.html` | Filterable story index for the five full articles. |
| `story-hernia.html` | Full article: hernia repair. |
| `story-hydrocele.html` | Full article: hydrocelectomy. |
| `story-gallstones.html` | Full article: gallbladder surgery. |
| `story-thyroid.html` | Full article: thyroid surgery. |
| `story-tumour.html` | Full article: benign tumour excision. |
| `privacy.html` | Privacy policy covering website inquiries, WhatsApp, donations, patient privacy, and data rights. |
| `terms.html` | Website terms and donation policy, including receipting, refunds, monthly pledges, and medical disclaimers. |
| `safeguarding.html` | Safeguarding statement: consent, patient dignity, children and vulnerable adults, and how to raise a concern. |
| `404.html` | Custom “page not found” page. |

There are **17 HTML files** in total: 16 public pages and one 404 page.

## File structure

```text
Half 4 Life/
├── index.html
├── about.html
├── donate.html
├── contact.html
├── galleries.html
├── procedures.html
├── stories.html
├── blog.html
├── story-*.html
├── privacy.html
├── terms.html
├── safeguarding.html
├── 404.html
├── robots.txt
├── css/
│   ├── style.css        # design tokens, header/nav, footer, page banners
│   ├── home.css         # hero, photo strip, splits, bands, forms
│   ├── pages.css        # about, donate, contact, gallery, blog, article, legal, 404
│   └── responsive.css   # tablet/mobile breakpoints and the stacked mobile cost table
├── js/
│   └── main.js          # menu, dropdowns, hero guard, lightbox, filters, WhatsApp form
└── assets/
    └── images/          # 26 public photographs and 2 brand SVGs
```

The unpublished source photos live in `../Half 4 Life-private-assets/`, outside this folder, so deploying `Half 4 Life/` does not expose them.

## Photography

The public site uses **26 photographs**: 25 clinical and field photographs and Dr. Adriana Cappelletti's profile portrait. Images are stored as JPEG/JPG and served directly. `logo.svg` and `favicon.svg` are the only brand assets. Photography is cropped with `object-fit: cover`, so source files do not need to match the display aspect ratio exactly.

**Twelve unused source photographs have been moved outside the public web root** to `/Users/giftmuhoozi/Half 4 Life-private-assets/images/`. They show patient conditions, graphic surgical close-ups, or unsuitable phone screenshots, and they are not linked from the site:
`donate-operation.jpeg`, `donate-patient.jpg`, `field-operating-team-01.jpeg`, `field-operating-team-04.jpeg`, `field-operating-team-05.jpeg`, `field-patient-condition-head.jpeg`, `field-patient-condition-scalp.jpeg`, `field-patient-neck-condition.jpg`, `field-procedure-detail.jpeg`, `field-surgery-detail-01.jpeg`, `field-surgery-detail-02.jpeg`, and `field-surgical-specimen.jpeg`.

Do not copy any of them back into `assets/images/` without documented consent and an approved publication context. The private archive also contains a short handling note.

The 58 legacy SVG placeholders from the first build have been removed.

### Images in use

| File | Dimensions | Used on |
| --- | --- | --- |
| `donate-theatre-care.jpeg` | 756 × 1008 | Donate |
| `dr-adriana-cappelletti.jpg` | 768 × 821 | About |
| `dr-buluke-brian.jpeg` | 768 × 768 | About |
| `dr-yasa-abdullahi-mohamed.jpg` | 797 × 768 | About |
| `muhoozi-gift.jpg` | 768 × 934 | About |
| `field-surgeon-portrait-green.jpeg` | 768 × 960 | Homepage, Galleries |
| `field-surgeon-in-theatre-procedure.jpeg` | 478 × 1078 | Homepage, Galleries |
| `field-clinician-in-theatre.jpeg` | 1920 × 2560 | About, Galleries, Homepage |
| `field-laparoscopy-01.jpeg` | 810 × 1080 | Galleries |
| `field-laparoscopy-02.jpeg` | 810 × 1080 | Homepage |
| `field-laparoscopy-team.jpeg` | 810 × 1080 | Blog, Galleries, Procedures, Gallstones article |
| `field-operating-team-02.jpeg` | 813 × 1080 | Blog, Safeguarding banner, Hydrocele article, Thyroid article |
| `field-operating-team-03.jpeg` | 813 × 1080 | Galleries |
| `field-operating-theatre-view.jpeg` | 960 × 1280 | Galleries |
| `field-patient-care.jpeg` | 1080 × 720 | Galleries, Stories |
| `field-surgeon-at-bedside.jpeg` | 756 × 1008 | Galleries, Stories |
| `field-surgeon-at-work.jpeg` | 960 × 1280 | Blog, Homepage, Stories, Hernia article |
| `field-surgeon-in-theatre.jpeg` | 720 × 1080 | Blog, Galleries, Homepage, Tumour article |
| `field-surgeon-portrait.jpeg` | 963 × 1280 | Homepage |
| `field-surgical-instruments.jpeg` | 900 × 1600 | Galleries |
| `field-team-at-work.jpeg` | 2252 × 1736 | Galleries, Homepage |
| `field-team-portrait-bw.jpeg` | 768 × 1020 | Homepage |
| `field-theatre-team-01.jpeg` | 1008 × 567 | Homepage |
| `field-theatre-team-02.jpeg` | 1008 × 567 | About, Contact, Donate, Stories |
| `field-theatre-team-03.jpeg` | 1008 × 567 | Donate, Galleries, Privacy banner |
| `field-theatre-team-04.jpeg` | 1008 × 567 | Donate, Galleries, Homepage, Terms banner |
| `mrs-nankunda-mercy.jpeg` | 768 × 1024 | About |
| `logo.svg` | 330 × 76 | Shared header and footer on all pages |
| `favicon.svg` | 64 × 64 | Browser favicon on all pages |

## WhatsApp form

The forms on `index.html` and `contact.html` have no server-side handler. On submit, `js/main.js` builds a pre-filled WhatsApp message and opens:

```text
https://wa.me/256777542219?text=...
```

The recipient is controlled by the `data-whatsapp` attribute on each `<form>`. Change it in both places if the contact number changes. The form uses native browser validation for required fields, then opens WhatsApp in a new tab. If WhatsApp is not installed, WhatsApp Web opens.

Both forms include a medical-emergency warning and a link to the privacy policy.

## Donation details used on the site

- **Bank:** Absa Bank Uganda
- **Branch:** Mbarara
- **Account name:** Lanz Clinic
- **Account number:** 6008658879
- **Transfer reference:** H4L donation
- **WorldRemit mobile money:** Airtel Money 0700210064 and MTN Mobile Money 0777542219 (Buluke Brian)
- **Western Union:** Buluke Brian, +256700210064, Mbarara City, Uganda

There is **no online payment integration**. The donation page lists bank transfer, WorldRemit mobile-money, and Western Union details.

## Trust, legal, and privacy pages

The following pages now exist and are linked from the footer:

- `privacy.html`
- `terms.html`
- `safeguarding.html`

They are plain-language drafts based on the site’s current practices and the facts supplied by H4L. They should be reviewed by H4L and, where appropriate, by Ugandan legal counsel before launch. They do not invent a charity registration number, legal entity, audited accounts, or board structure.

The sample testimonial carousel has been removed from `about.html`. Its CSS/JS component remains available for approved quotes if real, consent-cleared testimonials are supplied later.

## SEO and deployment status

Implemented:

- Unique titles and meta descriptions on every page.
- Relative canonical links that resolve on any host.
- Open Graph and Twitter summary metadata.
- Organization JSON-LD on the homepage.
- `robots.txt` with the 404 page disallowed.
- A custom `404.html` page.

Still dependent on the production domain:

- `sitemap.xml` (needs absolute URLs).
- Absolute `og:url` and `og:image` share-preview URLs.
- Final canonical-domain confirmation.

Do not add a guessed domain. Once the live domain is known, replace the relative canonical strategy with absolute URLs if preferred and generate the sitemap.

## Content and publication caveats

- **Patient stories are illustrative composites.** Names are withheld and clinical details are generalised. Replace them with verified, consent-cleared accounts before publishing as real patient stories, or keep the existing disclosure wording.
- **All clinical photographs must have informed consent.** Do not publish identifiable patient images without a signed consent form. The neck-condition photograph previously used on the donate page and the other unsuitable clinical files have been moved to `/Users/giftmuhoozi/Half 4 Life-private-assets/`; they should remain unpublished unless consent is documented.
- **No invented social-media accounts.** Header and footer links point only to the real WhatsApp number and email addresses. Add Instagram, TikTok, or Facebook only when official accounts exist.
- **Figures are taken from the supplied proposal:** $175 / 630,000 UGX all-inclusive per patient, 336 surgeries per six months, nine districts, and a separate six-month operating budget of 39,400,000 UGX. Review all figures with the H4L team before launch.
- **Volunteer surgeon fees are described as donated.** Confirm this arrangement with every participating surgeon before publishing.
- **Financial-review wording has been softened** where the site previously implied a completed independent audit. Add audited accounts or an annual report only when those documents exist.

## Design notes

- Accent green: `#2e7d32`; dark green: `#1b5e20`.
- Typography: **Poppins** for display, navigation, and body copy; italic accents also use Poppins.
- The layout is intentionally editorial and spacious, with a single static hero, a six-photo field strip, a twelve-photo gallery, and a three-photo story journey strip.
- The static hero and text-led Procedures page are intentional choices. The unused slideshow and masonry components are not exposed in the markup.
- Mobile layouts use a two-column gallery, stacked procedure cards, full-width buttons, and a slide-down navigation menu. The Stories journey strip stays three-up.
- All animations respect `prefers-reduced-motion`.

## Checks performed

- All local `src` and `href` references resolve.
- All 23 public photographs in use load.
- All page titles are unique; one `<h1>` per page.
- JavaScript passes `node --check`; no console errors during interaction tests.
- Mobile menu, navigation dropdown, single-slide hero, lightbox, blog filters, and WhatsApp form tested in headless Chrome.
- No horizontal overflow at 390 px, 768 px, or 1440 px viewports.
- Gallery counts verified: 12 on Surgery Galleries, 6 on the homepage field strip, 3 on the Stories journey strip.
- Legal, privacy, safeguarding, and 404 pages load with the shared header/footer and responsive layout.
