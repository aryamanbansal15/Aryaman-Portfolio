
(() => {
  "use strict";

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* storage blocked */ } }
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function applySiteData() {
    $$("[data-link]").forEach((el) => {
      const url = SITE.links[el.dataset.link];
      if (!url) { el.hidden = true; el.closest("li") && (el.closest("li").hidden = true); return; }
      el.href = url;
      if (/^https?:/i.test(url)) { el.target = "_blank"; el.rel = "noopener noreferrer"; }
    });

    $$("[data-email]").forEach((el) => {
      el.href = "mailto:" + SITE.email;
      el.textContent = SITE.email;
    });

    if (SITE.photo) {
      const box = $("#portrait");
      box.innerHTML = `<img src="${esc(SITE.photo)}" alt="Portrait of ${esc(SITE.name)}" loading="lazy">`;
      box.removeAttribute("aria-hidden");
    }

    $("#year").textContent = new Date().getFullYear();
  }

  function initTheme() {
    const btn = $("#themeToggle");
    const sync = () => {
      const dark = root.getAttribute("data-theme") === "dark";
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    };
    sync();
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store.set("ab-theme", next);
      sync();
    });
  }

  const ACCENTS = [
    { name: "Violet",  base: "#5b3df5", hi: "#9b86ff" },
    { name: "Blue",    base: "#1b6ef3", hi: "#6fa3ff" },
    { name: "Teal",    base: "#0b7f70", hi: "#3dd6be" },
    { name: "Magenta", base: "#c2277f", hi: "#ff6fb5" },
    { name: "Orange",  base: "#c2500a", hi: "#ff9a57" }
  ];
  const DEFAULT_TOKENS = { accent: 0, radius: 12 };

  function initTokens() {
    const swatches = $("#swatches");
    const radius = $("#radius");
    const out = $("#radiusOut");
    let tokens = { ...DEFAULT_TOKENS };

    try {
      const saved = JSON.parse(store.get("ab-tokens") || "null");
      if (saved && ACCENTS[saved.accent] && saved.radius >= 0 && saved.radius <= 28) tokens = saved;
    } catch (e) {}

    swatches.innerHTML = ACCENTS.map((a, i) =>
      `<button type="button" class="swatch" data-i="${i}" style="background:${a.base}" aria-label="${a.name}" aria-pressed="false"></button>`
    ).join("");

    function apply() {
      const a = ACCENTS[tokens.accent];
      root.style.setProperty("--accent", a.base);
      root.style.setProperty("--accent-hi", a.hi);
      root.style.setProperty("--r", tokens.radius + "px");
      radius.value = tokens.radius;
      out.textContent = tokens.radius + "px";
      $$(".swatch", swatches).forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.i === tokens.accent)));
      store.set("ab-tokens", JSON.stringify(tokens));
    }

    swatches.addEventListener("click", (e) => {
      const b = e.target.closest(".swatch");
      if (!b) return;
      tokens.accent = +b.dataset.i;
      apply();
    });
    radius.addEventListener("input", () => { tokens.radius = +radius.value; apply(); });
    $("#resetTokens").addEventListener("click", () => { tokens = { ...DEFAULT_TOKENS }; apply(); });

    apply();
  }

  function initHero() {
    const frame = $("#frame");
    const pill = $("#sizePill");
    const cursor = $("#cursor");

    const measure = () => {
      const r = frame.getBoundingClientRect();
      pill.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
    };
    measure();
    if ("ResizeObserver" in window) new ResizeObserver(measure).observe(frame);
    else window.addEventListener("resize", measure);

    if (reduceMotion || !cursor.animate) { frame.classList.add("selected"); return; }

    const dx = Math.min(window.innerWidth * 0.55, 560);
    const dy = 150;
    const anim = cursor.animate(
      [
        { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: "translate(0, 0)", opacity: 1 }
      ],
      { duration: 1200, delay: 500, easing: "cubic-bezier(.22,.8,.24,1)", fill: "both" }
    );
    anim.onfinish = () => frame.classList.add("selected");
  }

  function initProjects() {
    const grid = $("#projectGrid");
    const dialog = $("#projectDialog");
    const body = $("#dlgBody");
    let lastTrigger = null;

    grid.innerHTML = PROJECTS.map((p) => `
      <article class="card${p.featured ? " featured" : ""}" data-cat="${esc(p.category)}">
        <div class="card-art">${(ART[p.art] || ART.shell)()}</div>
        <div class="card-body">
          <p class="card-kind">${esc(p.kind)}</p>
          <h3><button type="button" class="card-open" data-id="${esc(p.id)}" aria-haspopup="dialog">${esc(p.title)}</button></h3>
          <p class="card-blurb">${esc(p.blurb)}</p>
          <ul class="chips">${p.stack.slice(0, p.featured ? 6 : 4).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        </div>
      </article>`).join("");

    $$(".filter").forEach((btn) => btn.addEventListener("click", () => {
      $$(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      const f = btn.dataset.filter;
      $$(".card", grid).forEach((card) => { card.hidden = !(f === "all" || card.dataset.cat === f); });
    }));

    function open(id, trigger) {
      const p = PROJECTS.find((x) => x.id === id);
      if (!p) return;
      lastTrigger = trigger;

      const meta = [["Period", p.period], ["Team", p.team], ["Guide", p.guide]]
        .filter(([, v]) => v)
        .map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");

      const links = [
        ["github", "View on GitHub", p.links.github],
        ["live", "Open live site", p.links.live],
        ["figma", "Open in Figma", p.links.figma]
      ].filter(([, , url]) => url)
       .map(([key, label, url], i) =>
         `<a class="btn${i === 0 ? " primary" : ""}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`).join("");

      body.innerHTML = `
        <button class="icon-btn dlg-close" type="button" aria-label="Close project details">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <div class="dlg-art">${(ART[p.art] || ART.shell)()}</div>
        <div class="dlg-body">
          <p class="dlg-kind">${esc(p.kind)}</p>
          <h2 id="dlgTitle">${esc(p.title)}</h2>
          ${meta ? `<dl class="dlg-meta">${meta}</dl>` : ""}
          <p>${esc(p.blurb)}</p>
          <h3>What I did</h3>
          <ul class="bullets">${p.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
          <h3>Built with</h3>
          <ul class="chips">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          ${p.note ? `<p class="dlg-note">${esc(p.note)}</p>` : ""}
          ${links ? `<div class="dlg-links">${links}</div>` : ""}
        </div>`;

      document.body.classList.add("lock");
      dialog.showModal();
    }

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".card-open");
      if (btn) open(btn.dataset.id, btn);
    });
    body.addEventListener("click", (e) => { if (e.target.closest(".dlg-close")) dialog.close(); });
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("lock");
      if (lastTrigger) lastTrigger.focus();
    });
  }

  function initNav() {
    const nav = $("#nav");
    const menuBtn = $("#menuBtn");

    const setMenu = (open) => {
      nav.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

    const links = $$("a", nav);
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute("aria-current"));
        const a = map.get(entry.target.id);
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  function initCopy() {
    const toast = $("#toast");
    let timer;
    const say = (msg) => {
      toast.textContent = msg;
      toast.classList.add("show");
      clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove("show"), 2200);
    };
    $("#copyEmail").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(SITE.email);
        say("Email copied");
      } catch (e) {
        say("Copy failed. Select the address and copy it manually.");
      }
    });
  }

  applySiteData();
  initTheme();
  initTokens();
  initProjects();
  initNav();
  initCopy();
  initHero();
})();
