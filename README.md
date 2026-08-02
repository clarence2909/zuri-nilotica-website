# Zuri Nilotica Website

AI-oriented project guide for the static website published at [zurinilotica.com](https://zurinilotica.com).

## Project summary

Zuri Nilotica is a premium skincare brand centered on pure Ugandan Nilotica shea butter. The site explains the product, its Ugandan origin, sourcing and preparation, everyday skin and hair uses, and brand values.

This is a dependency-free, multipage static website built with HTML, CSS, and vanilla JavaScript. There is no framework, package manager, build step, server-side application, database, CMS, or JavaScript router.

## Authoritative public site

The five HTML files in the repository root are the current public pages and the source of truth:

| Page | Source file | Production URL | Styles | Script |
| --- | --- | --- | --- | --- |
| Home | `index.html` | `https://zurinilotica.com/` | `styles.css` | `script.js` |
| Product | `products.html` | `https://zurinilotica.com/products.html` | `zuri-clean.css` | `zuri-clean.js` |
| About | `about.html` | `https://zurinilotica.com/about.html` | `styles.css` | `script.js` |
| Sourcing | `sourcing.html` | `https://zurinilotica.com/sourcing.html` | `zuri-clean.css` | `zuri-clean.js` |
| Contact | `contact.html` | `https://zurinilotica.com/contact.html` | `zuri-clean.css` | `zuri-clean.js` |

Do not treat `zuri-nilotica-proper-site/` as the deployed site. It is an older, self-contained duplicate with a different `product.html` filename. Do not edit or include it in the sitemap unless the project owner explicitly chooses to restore it.

`scan/index.html` is not part of the main public navigation or sitemap. It points to a missing `scan.html` file and should not be treated as a valid public route.

## Page content

- Home: brand introduction, Ugandan origin, collection carousel, Nilotica benefits, sourcing values, testimonials, and product calls to action.
- Product: benefits, usage ritual, single ingredient, Ugandan origin, and Amazon calls to action.
- About: brand story, origin and process imagery, ritual, and the Pure/Traceable/Useful values.
- Sourcing: Nile Basin origin, harvest/drying/preparation process, tree stewardship, ingredient transparency, and sourcing call to action.
- Contact: product and wholesale questions, contact details, Amazon link, and a client-side contact form.

Each public page currently has one `<h1>` and shared desktop/mobile navigation linking all five pages.

## Repository map

```text
/
|-- index.html                  # Home page
|-- products.html               # Product page
|-- about.html                  # About page
|-- sourcing.html               # Sourcing page
|-- contact.html                # Contact page
|-- styles.css                  # Home and About styles
|-- script.js                   # Home/About interactions
|-- zuri-clean.css              # Product, Sourcing, Contact styles
|-- zuri-clean.js               # Shared secondary-page interactions
|-- assets/                     # Primary images used by current pages
|-- images/                     # Additional Home and About images
|-- sitemap.xml                 # Canonical public-page sitemap
|-- robots.txt                  # Crawler access and sitemap pointer
|-- docs/design-direction.md    # Earlier design notes
|-- scan/                       # Incomplete legacy helper; not public
`-- zuri-nilotica-proper-site/  # Older duplicate; not authoritative
```

Other loose media and `shea pngs/` are source/reference material. Before deleting an image, search HTML and CSS because decorative images may be CSS backgrounds or positioned overlays.

## Design system

The visual language is editorial, premium, natural, and Ugandan-source focused.

- Display typeface: Cormorant Garamond.
- UI/body typeface: Inter.
- Fonts load from Google Fonts in both CSS files.
- Core colors include sky blue `#BEE1F7`, dark ink `#171713`, warm gold `#c8a456`, cream/paper neutrals, sage, and clay.
- Layout uses large editorial typography, whitespace, rounded cards, product cutouts, source photography, and responsive botanical overlays.
- The fixed header and mobile menu are shared conceptually, but styling is duplicated between `styles.css` and `zuri-clean.css`.
- Responsive breakpoints live directly in the CSS. Test desktop, tablet, and narrow mobile layouts after structural changes.

Preserve the current design unless a task explicitly requests a redesign. Avoid adding a framework, build tooling, CSS reset, or large global rewrite for a focused change.

## JavaScript behavior

`script.js` provides:

- Desktop/mobile menu behavior.
- Home collection carousel and expanded product view.
- Rotating testimonials.
- IntersectionObserver reveal animations.
- Animated canvas particles in the Home hero.
- Hash-target scrolling after page load.

`zuri-clean.js` provides:

- Desktop/mobile menu behavior.
- IntersectionObserver reveal animations.
- Contact-form demo behavior.

The contact form does not send data. JavaScript prevents submission, displays "Thank you. We will reply soon.", and resets the form. Connecting it to a service or backend requires an explicit decision and should include spam protection, validation, privacy handling, and tested success/error flows.

## Images and accessibility

Primary social-sharing image:

```text
/assets/zuri-uganda-shea-hero.png
```

Current favicon fallback:

```text
/assets/zuri-shea-product-mockup.png
```

Content images have descriptive `alt` text. Decorative transparent overlays use `alt=""` and `aria-hidden="true"`; preserve that distinction. Do not give decorative images keyword-heavy alt text.

## SEO conventions

Every authoritative page must keep:

- A unique title and meta description.
- `robots` set to `index, follow`.
- Author set to `Zuri Nilotica`.
- One canonical URL on `https://zurinilotica.com`.
- Open Graph and Twitter card metadata using real assets.
- UTF-8, responsive viewport metadata, and `<html lang="en">`.
- Exactly one primary `<h1>` with logical downstream heading order.

Home includes Organization and WebSite JSON-LD. Product includes Product/Brand JSON-LD without invented offers, prices, SKU, ratings, or reviews.

When adding or removing a real public page, update together:

1. Desktop navigation.
2. Mobile navigation.
3. Footer navigation where present.
4. Page-specific canonical and social URLs.
5. `sitemap.xml`.

Do not add legacy duplicates, assets, error pages, fragments, or nonexistent routes to the sitemap. This is a normal multipage site, so do not add a catch-all SPA redirect such as `/* /index.html 200`.

## Known placeholders and incomplete integrations

These values are not confirmed production destinations and must not be promoted into metadata or structured data:

- Amazon links point to the generic `https://www.amazon.com/` homepage.
- About-page Instagram, Facebook, and TikTok links use `href="#"`.
- The displayed phone/WhatsApp number is `+256 XXX XXX XXX`.
- The contact form has no backend.

The displayed email is `hello@zurinilotica.com`, but it is plain text rather than a `mailto:` link.

Never invent prices, availability, product identifiers, reviews, ratings, addresses, phone numbers, social profiles, or business-registration information. Ask the owner for verified values.

## Safe editing rules for AI agents

1. Work on the root public files unless explicitly told otherwise.
2. Preserve plain HTML/CSS/JavaScript and visible content unless the task requires copy changes.
3. Do not rename `products.html`; navigation, canonical metadata, and the sitemap depend on that path.
4. Keep internal links relative and production canonical/social URLs absolute.
5. Check desktop and mobile navigation after editing shared header markup.
6. Pair external links that open a new tab with `rel="noopener"`.
7. Use buttons for actions and anchors for navigation.
8. Preserve meaningful image alt text and empty alt text for decorative imagery.
9. Do not add sourcing, sustainability, medical, certification, or performance claims unless supplied and approved by the owner.
10. Inspect `git diff` before finishing so unrelated or legacy files are not changed.

## Local development

No installation is required. Open `index.html` directly for a quick check, or serve the repository root with a static HTTP server:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000/`.

Some behavior is easier to validate through HTTP than a `file://` URL. Internet access is required for Google Fonts; system fallbacks remain available offline.

## Validation checklist

Before handing off changes:

- Load all five root pages and check for console errors.
- Test desktop and mobile menus.
- Test Home carousel controls, testimonial controls, reveal effects, and hero animation.
- Test anchor links on Product, About, and Sourcing.
- Confirm the Contact form's intended demo or production behavior.
- Check that every local `href` and `src` exists.
- Confirm each page has one H1, one canonical URL, and unique metadata.
- Parse JSON-LD and `sitemap.xml`.
- Confirm `robots.txt` points to `https://zurinilotica.com/sitemap.xml`.
- Test responsive layout around 1024 px, 768 px, 620 px, and 390 px.
- Run `git diff --check` and review the final diff.

## Deployment

The repository has no committed host-specific build configuration. Deploy the repository root as a static site with `index.html` as the entry page. After deployment, confirm all five canonical URLs return HTTP 200 and submit the sitemap to Google Search Console and Bing Webmaster Tools.
