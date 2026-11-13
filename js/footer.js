// Shared site footer: renders into every <footer data-footer>.
(() => {
  const home = new URL("../", document.currentScript.src);
  const here = (location.origin + location.pathname).replace(/index\.html$/, "");
  const legalBase = here === home.href ? "" : home.href;

  const SOCIALS = [
    { label: "GitHub", href: "https://github.com/flowkap",
      path: "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/floriankappes",
      path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" },
    { label: "Stack Overflow", href: "https://stackoverflow.com/users/2538750/flowkap",
      path: "M18.99 21.98v-6.4h2.13V24H2.9v-8.42h2.12v6.4h13.97zM7.38 15.98l.42-2.08 10.4 2.18-.43 2.07-10.4-2.17zm1.37-4.97.9-1.94 9.63 4.5-.9 1.92-9.63-4.48zm2.67-4.73 1.36-1.63 8.16 6.81-1.35 1.63-8.17-6.81zM16.7 1.25l6.33 8.53-1.7 1.27-6.33-8.53 1.7-1.27zM7.17 19.85v-2.13h10.6v2.13H7.17z" },
    { label: "Bandcamp", href: "https://bandcamp.com/flowkap",
      path: "M0 18.75 7.44 5.25H24l-7.44 13.5H0z" },
  ];

  const icon = (d) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
  const html = `
  <div class="wrap">
    <div class="socials socials-small">
      ${SOCIALS.map((s) => `<a href="${s.href}" aria-label="${s.label}">${icon(s.path)}</a>`).join("\n      ")}
    </div>
    <span>© ${new Date().getFullYear()} Florian Kappes · <a href="${legalBase}#imprint">Imprint</a> · <a href="${legalBase}#privacy">Privacy Policy</a></span>
  </div>`;

  document.querySelectorAll("footer[data-footer]").forEach((f) => {
    f.classList.add("site-footer");
    f.innerHTML = html;
  });
})();
