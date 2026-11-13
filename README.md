<div align="center">
  <br>
  <img src="/images/avatar/flowkap.svg" alt="Flowkap" width="200"/>
</div>

---

## About

Personal site of Flowkap, served via GitHub Pages at <https://flowkap.dev/>.

Plain static HTML – no build step, no generator, no external requests (except the dashboard, which reads public APIs in the browser):

- `index.html` – the single-page site (page-specific CSS/JS inline)
- `404.html` – not-found page (root-absolute paths, as GitHub Pages serves it at any URL)
- `dashboard/` – personal start page (DuckDuckGo search, shortcuts) and status overview of all sites: UptimeRobot, GitHub, DNS (Cloudflare DoH), TLS (crt.sh), RDAP (not linked from the main page)
- `pixelme/` – standalone LEGO mosaic manual (not linked from the main page)
- `css/site.css` – shared design tokens and components (main page, 404, dashboard)
- `js/footer.js` – shared footer (main page, dashboard)
- `js/prefs.js` – shared link-target toggle and the light-mode joke dialogs (main page, dashboard)
- `images/` – illustrations; web sizes are generated from the PNG originals
- `images/avatar/` – the avatar: `flowkap.png` (original), its PNG/WebP sizes and `flowkap.svg`
  - `flowkap.svg` is a vector trace of the original and is what the pages use (avatar, favicon); `flowkap-32.png` (favicon for Safari) and `flowkap-180.png` (apple-touch-icon) are the raster fallbacks; `flowkap-512.webp` is kept but unused
- `images/icons/` – brand icons for the dashboard (shortcuts, repo buttons), colored in the site green
- `favicon.ico` – root favicon (16/32/48 px) for browsers that request it automatically, rendered from `images/avatar/flowkap.svg`
- `CNAME`, `.nojekyll` – GitHub Pages custom domain and plain-file serving

To preview, serve the folder locally (the 404 page and the dashboard need a server): `python3 -m http.server` and open <http://localhost:8000/>.

## License

All rights reserved – see [LICENSE](LICENSE).
