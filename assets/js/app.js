(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- theme ---------- */
  const themeToggle = $("#theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---------- custom cursor ---------- */
  const dot = $(".cursor-dot");
  const ring = $(".cursor-ring");
  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  const follow = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  };
  follow();
  document.addEventListener("mouseover", e => {
    if (e.target.closest("a, button, .card, .chip, .magnifier-wrap")) ring.classList.add("is-hover");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest("a, button, .card, .chip, .magnifier-wrap")) ring.classList.remove("is-hover");
  });

  /* ---------- hero counters ---------- */
  const counters = $$(".hero-meta .num");
  const animCount = el => {
    const target = +el.dataset.count;
    const dur = 1200;
    const t0 = performance.now();
    const step = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { animCount(e.target); io.unobserve(e.target); }});
  }, { threshold: .5 });
  counters.forEach(c => io.observe(c));

  /* update count from data */
  const setHeroCount = () => {
    const n = (window.PROMPTS || []).length;
    counters[0].dataset.count = n;
  };
  setHeroCount();

  /* ---------- primary button cursor glow ---------- */
  $$(".btn-primary").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      btn.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });

  /* ---------- about-card parallax glow ---------- */
  $$(".about-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });

  /* ---------- render cards ---------- */
  const grid = $("#card-grid");
  const PROMPTS = window.PROMPTS || [];

  const cardHtml = p => `
    <article class="card" data-id="${p.id}" data-category="${p.category || "all"}">
      <div class="card-media">
        ${p.image
          ? `<img src="${p.image}" alt="${p.imageAlt || ""}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'placeholder',textContent:'REFERENCE · AWAITING UPLOAD'}))"/>`
          : `<div class="placeholder">REFERENCE · AWAITING UPLOAD</div>`}
        <span class="card-tag">${p.tag || p.category || "prompt"}</span>
        <span class="card-open" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M7 17L17 7M9 7h8v8"/>
          </svg>
        </span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <p class="card-sub">${p.subtitle || ""}</p>
        <div class="card-meta">
          ${(p.meta || []).map(m => `<span>${m}</span>`).join("")}
        </div>
      </div>
    </article>`;

  const renderCards = (filter = "all") => {
    const list = filter === "all" ? PROMPTS : PROMPTS.filter(p => (p.category || "") === filter);
    grid.innerHTML = list.length
      ? list.map(cardHtml).join("")
      : `<div class="card" style="grid-column: 1/-1; text-align:center; padding:48px; cursor:default;">
           <div class="card-body">
             <h3 class="card-title">Здесь пока пусто</h3>
             <p class="card-sub">Добавьте промпт в <code>assets/js/data.js</code>.</p>
           </div>
         </div>`;
    bindCardClicks();
  };

  const bindCardClicks = () => {
    $$(".card").forEach(card => {
      const id = card.dataset.id;
      if (!id) return;
      card.addEventListener("click", () => openModal(id));
    });
  };

  /* ---------- filters ---------- */
  $$(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      $$(".chip").forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      renderCards(chip.dataset.filter);
    });
  });

  renderCards();

  /* ---------- modal ---------- */
  const modal = $("#modal");
  const modalTitle = $("#modal-title");
  const modalSub = $("#modal-sub");
  const modalTag = $("#modal-tag");
  const modalImg = $("#modal-image");
  const modalCode = $("#modal-code");
  const copyBtn = $("#copy-btn");
  const dlBtn = $("#download-btn");
  const lens = $("#magnifier-lens");
  const magWrap = $("#magnifier-wrap");

  let currentPrompt = null;

  const openModal = id => {
    const p = PROMPTS.find(x => x.id === id);
    if (!p) return;
    currentPrompt = p;
    modalTitle.textContent = p.title;
    modalSub.textContent = p.subtitle || "";
    modalTag.textContent = p.tag || p.category || "prompt";

    if (p.image) {
      modalImg.src = p.image;
      modalImg.alt = p.imageAlt || "";
      modalImg.style.display = "";
    } else {
      modalImg.removeAttribute("src");
      modalImg.alt = "";
      modalImg.style.display = "none";
    }

    modalCode.innerHTML = highlightJSON(p.prompt);

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentPrompt = null;
  };

  $$("[data-close]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
  });

  /* ---------- magnifier ---------- */
  const LENS_SIZE = 180;
  const ZOOM = 2.2;
  magWrap.addEventListener("mousemove", e => {
    if (!modalImg.src) return;
    const r = magWrap.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    lens.style.left = x + "px";
    lens.style.top = y + "px";

    const iw = modalImg.clientWidth;
    const ih = modalImg.clientHeight;
    const bgX = -(x * ZOOM - LENS_SIZE / 2);
    const bgY = -(y * ZOOM - LENS_SIZE / 2);
    lens.style.backgroundImage = `url(${modalImg.src})`;
    lens.style.backgroundSize = `${iw * ZOOM}px ${ih * ZOOM}px`;
    lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
  });

  /* ---------- copy / download ---------- */
  copyBtn.addEventListener("click", async () => {
    if (!currentPrompt) return;
    const json = JSON.stringify(currentPrompt.prompt, null, 2);
    try {
      await navigator.clipboard.writeText(json);
      copyBtn.classList.add("is-copied");
      copyBtn.querySelector(".label").textContent = "Скопировано";
      showToast("JSON-промпт в буфере обмена");
      setTimeout(() => {
        copyBtn.classList.remove("is-copied");
        copyBtn.querySelector(".label").textContent = "Скопировать JSON";
      }, 1800);
    } catch {
      showToast("Не удалось скопировать");
    }
  });

  dlBtn.addEventListener("click", () => {
    if (!currentPrompt) return;
    const json = JSON.stringify(currentPrompt.prompt, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentPrompt.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Файл скачан");
  });

  /* ---------- toast ---------- */
  const toast = $("#toast");
  let toastT;
  const showToast = msg => {
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove("is-show"), 2200);
  };

  /* ---------- JSON syntax highlight ---------- */
  function highlightJSON(obj) {
    const json = JSON.stringify(obj, null, 2);
    return json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/("(?:\\.|[^"\\])*")(\s*:)/g, '<span class="tok-key">$1</span>$2')
      .replace(/:\s*("(?:\\.|[^"\\])*")/g, ': <span class="tok-str">$1</span>')
      .replace(/:\s*(-?\d+(?:\.\d+)?)/g, ': <span class="tok-num">$1</span>')
      .replace(/:\s*(true|false|null)/g, ': <span class="tok-bool">$1</span>')
      .replace(/([{}\[\],])/g, '<span class="tok-punct">$1</span>');
  }
})();
