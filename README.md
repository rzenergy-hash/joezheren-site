# Zhe Ren — Portfolio (static site)

Clean, image-first static site. No build step, no dependencies — just HTML, CSS, and one JS file.

## Structure

```
/                         index.html              Home (hero + series grid + pull-quote)
/about/                   about/index.html        Bio + full artist statement (相 / xiàng)
/work/                    work/index.html         Series landing grid
/work/splash/                                     Splash series
/work/man-made-landscape/                         Man-Made Landscape (gallery + video)
/work/perspective-of-duality/                     Perspective of Duality (gallery + video)
/work/students-work/                              Students Work (PDF + video)
/cv/                      cv/index.html           CV / exhibitions / publications
/contact/                 contact/index.html      Contact form + direct links
css/style.css             Styles
js/main.js                Mobile nav, image lightbox, click-to-load video embeds
images/full/              Web-optimized full images (lightbox)
images/thumb/             Web-optimized thumbnails (grids/galleries)
assets/pdf/               Research & Students portfolio PDFs
.htaccess                 HTTPS, 301 redirects from old WP URLs, caching
sitemap.xml, robots.txt, 404.html, favicon.svg, apple-touch-icon.png
```

## Editing artwork captions

Each gallery image is a `<figure>` with data attributes the lightbox reads:

```html
<figure data-full="/images/full/NAME.jpg"
        data-title="Title" data-year="2018"
        data-medium="Digital print on paper" data-dimensions="27&quot; × 40&quot;">
  <img src="/images/thumb/NAME.jpg" alt="..." loading="lazy">
  <figcaption>...</figcaption>
</figure>
```

Add `data-year` / `data-dimensions` to any piece as info becomes available; blank ones simply don't display.

## Things to finish (placeholders left in the code)

- **Contact form**: in `contact/index.html`, replace `YOUR_FORM_ID` with a real
  [Formspree](https://formspree.io) endpoint (HostGator is static — it can't send mail by itself).
- **Email / social**: in `contact/index.html`, replace `hello@joezheren.com` and the
  Instagram/LinkedIn/Expose links (marked with `TODO`).
- **CV page**: fill real exhibition venues/cities/years and publication citations in `cv/index.html`.
- **CV PDF**: drop an updated CV at `assets/pdf/cv.pdf` and uncomment the button in `cv/index.html`.

## Deploy to HostGator (cPanel)

1. **Back up the current live site first** (cPanel → Backup, or download `public_html`).
2. Upload the **contents** of this folder into `public_html/` (File Manager or FTP),
   replacing the WordPress files. Make sure the hidden `.htaccess` is included.
3. Visit https://joezheren.com — check pages, mobile view, lightbox, PDFs, and that
   old URLs (e.g. `/about-artist/`) redirect to the new ones.
4. In Google Search Console, submit `https://joezheren.com/sitemap.xml`.

## Local preview

From this folder: `python3 -m http.server 8000` then open http://localhost:8000
(Use a server, not file://, so the root-relative `/` links resolve.)
