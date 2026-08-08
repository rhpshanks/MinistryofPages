# Ministry of Pages — static landing page

A standalone single-page site built from the brandbook. Static: one HTML file plus images, no build step and no dependencies.

This folder is independent of the React storefront in the repository root. Nothing here is part of the Vite build, and Vercel does not serve it, so the two can sit side by side without interfering.

```
landing/
  index.html          the whole site (styles + scripts inline)
  assets/             product photos, app icon
  README.md
```

## Run it locally

```bash
python -m http.server 5183 -d landing
```

Then open http://localhost:5183

## Publish it

Any static host works. Drag the `ministryofpages` folder onto Netlify Drop, or push it to a GitHub repo and enable Pages, or upload the contents to `public_html` on shared hosting. Point the ministryofpages.com DNS at whichever you pick.

## Things you will want to change

**WhatsApp number** — appears in 12 links as `wa.me/923195015013`. Find and replace that string to change it everywhere. Each product link carries a pre-typed message naming that product, so the chat opens with the customer's request already written.

**Email** — `contactministryofpages@gmail.com` in the footer, taken from your earlier mockups. Confirm it before going live.

**Products** — each one is an `<article class="card">` block in the catalogue section. Copy a block, swap the image, title, description, spec line, and the WhatsApp message text in the link. Product images live in `assets/` at 1000px on the long edge.

**Prices** — deliberately absent. The site sends people to WhatsApp for the day's rate, which keeps it honest when paper prices move. If you later want printed prices, add a line under `.card-spec`.

## Brand notes

Colours and type come from the brandbook: Ministry Navy `#16243F`, Foil Gold `#B08A3E`, Forest Green `#2E5A41`, Page Paper `#F4F0E6`. Type is Newsreader (serif headlines), Hanken Grotesk (body), IBM Plex Mono (labels and specs), loaded from Google Fonts.

The recurring motif is the dog-eared page from the brand mark: hero sheets, card corners, the order form corner, and the seal watermark all use it.
