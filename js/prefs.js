// Shared page preferences: link target and the light theme that does not exist.
// Renders the toggles into every [data-prefs] element and appends the dialogs to <body>.
(() => {
  const KEY = "flowkap:newtab";
  const svg = (paths) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`;
  const ICONS = {
    moon: svg('<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>'),
    same: svg('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="m12 16 4-4-4-4"/>'),
    ext: svg('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
  };

  let newTab = false;
  try { newTab = localStorage.getItem(KEY) === "1"; } catch {}

  const isExternal = (a) => /^https?:$/.test(a.protocol) && a.origin !== location.origin;
  function applyLink(a) {
    if (!isExternal(a)) return;
    if (newTab) { a.target = "_blank"; a.relList.add("noopener"); } else { a.removeAttribute("target"); a.relList.remove("noopener"); }
  }
  function applyAll() {
    document.querySelectorAll("a[href]").forEach(applyLink);
    document.querySelectorAll("form[data-prefs-target]").forEach((f) => { f.target = newTab ? "_blank" : "_self"; });
    document.querySelectorAll('[data-pref="links"]').forEach((b) => b.setAttribute("aria-pressed", String((b.value === "new") === newTab)));
  }

  document.querySelectorAll("[data-prefs]").forEach((host) => {
    host.classList.add("prefs");
    host.innerHTML = `
      <div class="prefs-group" role="group" aria-label="Theme">
        <button type="button" class="prefs-option" data-pref="theme" value="dark" aria-pressed="true" aria-label="Dark theme">${ICONS.moon}</button>
        <button type="button" class="prefs-option" data-pref="theme" value="light" aria-pressed="false" aria-label="Light theme">${ICONS.sun}</button>
      </div>
      <div class="prefs-group" role="group" aria-label="Open links">
        <button type="button" class="prefs-option" data-pref="links" value="same" aria-pressed="true" aria-label="Open links in this tab">${ICONS.same}</button>
        <button type="button" class="prefs-option" data-pref="links" value="new" aria-pressed="false" aria-label="Open links in a new tab">${ICONS.ext}</button>
      </div>`;
  });

  document.body.insertAdjacentHTML("beforeend", `
<dialog class="nope" id="nope" aria-labelledby="nope-title">
  <div class="nope-body">
    <p class="prompt"><b>flowkap@earth</b>:~$ theme --light</p>
    <h2 id="nope-title">u ok?</h2>
    <p>bash: theme: light: permission denied by your retinas. Light mode is how the bugs find you – they are attracted to light, everybody knows that.</p>
    <p>Your eyes have filed a complaint. Are you sure you want to stare into the sun?</p>
    <div class="nope-actions">
      <button type="button" class="btn btn-primary" data-close autofocus>cd ~/dark</button>
      <button type="button" class="btn doom" id="nope-confirm">sudo apt install light-mode</button>
    </div>
  </div>
</dialog>
<dialog class="nope" id="nope-install" aria-label="Installing light-mode">
  <div class="nope-body">
    <p class="prompt"><b>flowkap@earth</b>:~$ sudo apt install light-mode</p>
    <pre class="nope-install-log" id="install-log" aria-hidden="true"></pre>
    <p class="sr-only" id="install-status" role="status"></p>
  </div>
</dialog>
<dialog class="nope" id="nope-error" aria-labelledby="nope-error-title">
  <div class="nope-body">
    <p class="prompt"><b>flowkap@earth</b>:~$ sudo apt install light-mode</p>
    <h2 id="nope-error-title">403</h2>
    <p>flowkap is not in the sudoers file. This incident will be reported.</p>
    <p>There is no light mode. There never was.</p>
    <div class="nope-actions">
      <button type="button" class="btn btn-primary" data-close autofocus>cd ~/dark</button>
    </div>
  </div>
</dialog>`);

  const $ = (id) => document.getElementById(id);
  const nope = $("nope"), nopeInstall = $("nope-install"), nopeError = $("nope-error"), log = $("install-log"), status = $("install-status");
  const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  // [line, duration in ms, suffix once done]
  const INSTALL_STEPS = [
    ["[sudo] password for flowkap: ********", 1100, ""],
    ["Reading package lists...", 1300, " Done"],
    ["Building dependency tree...", 1400, " Done"],
    ["Reading state information...", 900, " Done"],
    ["The following NEW packages will be installed:\n  light-mode retina-burner", 700, ""],
    ["Get:1 https://deb.flowkap.dev/sun stable/main light-mode 6.6.6-1 [42 MB]", 1600, ""],
    ["Unpacking light-mode (6.6.6-1) ...", 1500, ""],
    ["Setting up light-mode (6.6.6-1) ...", 2600, ""],
  ];
  const FRAME_MS = 90;
  let installTimer = null;

  document.querySelectorAll("dialog.nope [data-close]").forEach((b) => b.addEventListener("click", () => b.closest("dialog").close()));
  nopeInstall.addEventListener("close", () => clearInterval(installTimer));
  // Closing a modal dialog returns focus to the sun button, which would keep its focus ring and tooltip.
  // Keyboard users keep their focus position.
  let openedByPointer = false;
  [nope, nopeInstall, nopeError].forEach((d) => d.addEventListener("close", () => {
    if (openedByPointer && document.activeElement?.matches(".prefs-option")) document.activeElement.blur();
  }));
  $("nope-confirm").addEventListener("click", () => {
    nope.close();
    log.replaceChildren();
    status.textContent = "";
    delete status.dataset.step;
    nopeInstall.showModal();
    const started = Date.now();
    const total = INSTALL_STEPS.reduce((a, [, ms]) => a + ms, 0);
    let tick = 0;
    const draw = () => {
      const elapsed = Date.now() - started;
      if (elapsed >= total) {
        clearInterval(installTimer);
        nopeInstall.close();
        nopeError.showModal();
        return;
      }
      let t = 0, i = 0;
      while (i < INSTALL_STEPS.length - 1 && elapsed >= t + INSTALL_STEPS[i][1]) t += INSTALL_STEPS[i++][1];
      const done = INSTALL_STEPS.slice(0, i).map(([line, , suffix]) => line + suffix);
      if (status.dataset.step !== String(i)) { status.dataset.step = String(i); status.textContent = INSTALL_STEPS[i][0]; }
      let current = INSTALL_STEPS[i][0] + " ";
      if (i === INSTALL_STEPS.length - 1) {
        // Progress bar that creeps up to 99% and never finishes.
        const pct = Math.min(99, Math.floor(((elapsed - t) / INSTALL_STEPS[i][1]) * 100));
        const filled = Math.round(pct / 5);
        current += `\nProgress: [${"#".repeat(filled)}${".".repeat(20 - filled)}] ${pct}% `;
      }
      const spin = document.createElement("span");
      spin.className = "spin";
      spin.textContent = SPINNER[tick++ % SPINNER.length];
      log.replaceChildren(document.createTextNode([...done, current].join("\n")), spin);
    };
    draw();
    installTimer = setInterval(draw, FRAME_MS);
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-pref]");
    if (!btn) return;
    if (btn.dataset.pref === "theme") {
      if (btn.value === "light") { openedByPointer = e.detail > 0; nope.showModal(); }
      return;
    }
    newTab = btn.value === "new";
    try { localStorage.setItem(KEY, newTab ? "1" : "0"); } catch {}
    applyAll();
  });

  // Pages that render links later (the dashboard) get the same treatment.
  new MutationObserver((records) => {
    records.forEach((r) => r.addedNodes.forEach((n) => {
      if (n.nodeType !== 1) return;
      if (n.matches("a[href]")) applyLink(n);
      n.querySelectorAll("a[href]").forEach(applyLink);
    }));
  }).observe(document.body, { childList: true, subtree: true });

  applyAll();
})();
