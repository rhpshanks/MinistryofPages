# Ministry of Pages — static landing page

A standalone single-page site built from the brandbook. Static: one HTML file plus images, no build step and no dependencies.

It lives at **https://www.ministryofpages.com/new/**, published alongside the React storefront rather than replacing it. Both stay reachable, so the shop keeps its sign in, cart, wishlist, and EasyPaisa checkout while this design can be reviewed on the real domain.

```
public/new/
  index.html          the whole site (styles + scripts inline)
  assets/             product photos, app icon
  README.md
```

## How it reaches the domain

Vite copies everything in `public/` verbatim into `dist/`, so `public/new/` lands at `dist/new/` and Vercel serves it at `/new/`. The SPA rewrite in `vercel.json` sends unmatched paths to the React app, but a real file always wins first, which is what keeps this page reachable.

Every path inside `index.html` is relative, so the folder can be renamed or moved without editing links. Only the two `og:` meta tags carry absolute URLs.

## Run it locally

```bash
python -m http.server 5183 -d public/new
```

Then open http://localhost:5183

## Making it the homepage instead

Deploying this in place of the storefront takes one change: replace the repository's root `index.html` with this file, move `assets/` to `public/assets/`, and remove the `/src/main.tsx` script tag reference. Be deliberate about it, because the React app provides sign in, cart, wishlist, and EasyPaisa checkout that this page does not, so promoting it retires those features from the live site.

## Things you will want to change

**WhatsApp number** — appears in 12 links as `wa.me/923195015013`. Find and replace that string to change it everywhere. Each product link carries a pre-typed message naming that product, so the chat opens with the customer's request already written.

**Email** — `contactministryofpages@gmail.com` in the footer, taken from your earlier mockups. Confirm it before going live.

**Products** — each one is an `<article class="card">` block in the catalogue section. Copy a block, swap the image, title, description, spec line, and the WhatsApp message text in the link. Product images live in `assets/` at 1000px on the long edge.

**Prices** — deliberately absent. The site sends people to WhatsApp for the day's rate, which keeps it honest when paper prices move. If you later want printed prices, add a line under `.card-spec`.

## Brand notes

Colours and type come from the brandbook: Ministry Navy `#16243F`, Foil Gold `#B08A3E`, Forest Green `#2E5A41`, Page Paper `#F4F0E6`. Type is Newsreader (serif headlines), Hanken Grotesk (body), IBM Plex Mono (labels and specs), loaded from Google Fonts.

The recurring motif is the dog-eared page from the brand mark: hero sheets, card corners, the order form corner, and the seal watermark all use it.
