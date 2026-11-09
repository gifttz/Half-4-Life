/* ==========================================================================
   Half 4 Life — site interactions
   ========================================================================== */
(function () {
  "use strict";

  // Keep content visible if JavaScript fails to load; reveal animations are an enhancement.
  document.documentElement.classList.add("js-reveal");

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initMobileMenu();
    initDropdowns();
    initHero();
    initLightbox();
    initReveal();
    initTestimonials();
    initBlogFilters();
    initInquiryForm();
    initYear();
  }

  /* ---------- mobile menu ---------- */
  function initMobileMenu() {
    const toggle = qs("#mobile-toggle");
    const menu = qs("#mobile-menu");
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    }

    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));

    qsa("a", menu).forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- desktop dropdowns ---------- */
  function initDropdowns() {
    const dropdowns = qsa(".nav-dropdown");

    dropdowns.forEach((dropdown) => {
      const button = qs("button", dropdown);
      if (!button) return;

      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const willOpen = !dropdown.classList.contains("open");
        closeAll();
        if (willOpen) {
          dropdown.classList.add("open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });

    function closeAll(except) {
      dropdowns.forEach((dropdown) => {
        if (dropdown === except) return;
        dropdown.classList.remove("open");
        const button = qs("button", dropdown);
        if (button) button.setAttribute("aria-expanded", "false");
      });
    }

    document.addEventListener("click", () => closeAll());
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeAll();
    });
  }

  /* ---------- hero slideshow ---------- */
  function initHero() {
    const hero = qs("#hero");
    if (!hero) return;

    const slides = qsa(".hero-slide", hero);
    const dots = qsa(".hero-dot", hero);
    const prev = qs(".hero-arrow.prev", hero);
    const next = qs(".hero-arrow.next", hero);
    if (slides.length < 2) return;

    let current = 0;
    let timer = null;
    let paused = false;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach((dot, i) => {
        const active = i === current;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function advance() {
      if (!paused) show(current + 1);
    }

    function start() {
      stop();
      if (!reduceMotion && slides.length > 1) timer = window.setInterval(advance, 6500);
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function go(index) {
      show(index);
      start();
    }

    show(0);
    start();

    if (prev) prev.addEventListener("click", () => go(current - 1));
    if (next) next.addEventListener("click", () => go(current + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => go(i)));

    hero.addEventListener("mouseenter", () => { paused = true; });
    hero.addEventListener("mouseleave", () => { paused = false; });
    hero.addEventListener("focusin", () => { paused = true; });
    hero.addEventListener("focusout", () => { paused = false; });

    hero.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); go(current - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); go(current + 1); }
    });
  }

  /* ---------- lightbox ---------- */
  function initLightbox() {
    const lightbox = qs("#lightbox");
    if (!lightbox) return;

    const image = qs("#lightbox-image", lightbox);
    const caption = qs("#lightbox-caption", lightbox);
    const counter = qs("#lightbox-count", lightbox);
    const closeButton = qs(".lb-close", lightbox);
    const prevButton = qs(".lb-prev", lightbox);
    const nextButton = qs(".lb-next", lightbox);
    const triggers = qsa("[data-lightbox]");
    if (!triggers.length) return;

    let index = 0;
    let lastFocused = null;
    let touchStartX = 0;

    function open(i) {
      index = (i + triggers.length) % triggers.length;
      const trigger = triggers[index];
      const src = trigger.getAttribute("data-src") || qs("img", trigger)?.src || "";
      const alt = trigger.getAttribute("data-caption") || qs("img", trigger)?.alt || "";

      image.src = src;
      image.alt = alt;
      caption.textContent = alt;
      counter.textContent = `${index + 1} / ${triggers.length}`;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lastFocused = document.activeElement;
      closeButton.focus();
    }

    function close() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    triggers.forEach((trigger, i) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        open(i);
      });
    });

    closeButton.addEventListener("click", close);
    prevButton.addEventListener("click", () => open(index - 1));
    nextButton.addEventListener("click", () => open(index + 1));

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) close();
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("open")) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") open(index - 1);
      if (event.key === "ArrowRight") open(index + 1);
      if (event.key === "Tab") {
        const focusables = [closeButton, prevButton, nextButton];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    lightbox.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) < 50) return;
      open(index + (distance < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    const targets = qsa(".reveal");
    if (!targets.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    targets.forEach((target) => observer.observe(target));
  }

  /* ---------- testimonials ---------- */
  function initTestimonials() {
    const root = qs("#testimonials");
    if (!root) return;

    const items = qsa(".testimonial", root);
    const dots = qsa(".testimonial-dot", root);
    if (items.length < 2) return;

    let current = 0;
    let timer = null;

    function show(index) {
      current = (index + items.length) % items.length;
      items.forEach((item, i) => { item.hidden = i !== current; });
      dots.forEach((dot, i) => {
        const active = i === current;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-pressed", String(active));
      });
    }

    function start() {
      if (reduceMotion) return;
      window.clearInterval(timer);
      timer = window.setInterval(() => show(current + 1), 7500);
    }

    show(0);
    start();

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        show(i);
        start();
      });
    });

    root.addEventListener("mouseenter", () => window.clearInterval(timer));
    root.addEventListener("mouseleave", start);
  }

  /* ---------- blog filters ---------- */
  function initBlogFilters() {
    const filterBar = qs("#blog-filters");
    if (!filterBar) return;

    const buttons = qsa("[data-filter]", filterBar);
    const cards = qsa(".blog-card");
    const status = qs("#filter-status");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        let visible = 0;

        buttons.forEach((candidate) => {
          const active = candidate === button;
          candidate.classList.toggle("is-active", active);
          candidate.setAttribute("aria-pressed", String(active));
        });

        cards.forEach((card) => {
          const show = filter === "all" || card.getAttribute("data-category") === filter;
          card.hidden = !show;
          if (show) visible += 1;
        });

        if (status) {
          status.textContent = `${visible} ${visible === 1 ? "story" : "stories"} shown.`;
        }
      });
    });
  }

  /* ---------- inquiry form -> WhatsApp ---------- */
  function initInquiryForm() {
    const forms = qsa(".inquiry-form");
    if (!forms.length) return;

    forms.forEach((form) => {
      const status = qs("#form-status", form);
      const submit = qs("button[type='submit']", form);
      const whatsappNumber = form.getAttribute("data-whatsapp") || "256777542219";

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const value = (name) => {
          const field = form.elements.namedItem(name);
          return field && typeof field.value === "string" ? field.value.trim() : "";
        };

        const name = value("name");
        const email = value("email");
        const phone = value("phone");
        const topic = value("topic");
        const message = value("message");
        const errors = [];

        if (!name) errors.push("Please enter your name.");
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          errors.push("Please enter a valid email address.");
        }
        if (!message) errors.push("Please add a short message.");

        if (errors.length) {
          status.textContent = errors.join(" ");
          status.className = "form-status error";
          const firstField = !name ? "name" : !email ? "email" : "message";
          const target = form.elements.namedItem(firstField);
          if (target) target.focus();
          return;
        }

        const lines = [
          "Hello Half 4 Life / Lanz Clinic,",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : "",
          topic ? `Inquiry: ${topic}` : "",
          "",
          "Message:",
          message,
        ].filter(Boolean);

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;

        status.textContent = "Opening WhatsApp with your message…";
        status.className = "form-status success";
        if (submit) submit.disabled = true;

        const opened = window.open(url, "_blank", "noopener");
        if (!opened) {
          status.innerHTML = "";
          const fallback = document.createElement("a");
          fallback.href = url;
          fallback.target = "_blank";
          fallback.rel = "noopener";
          fallback.textContent = "Open your WhatsApp message";
          status.append("Your browser blocked the new tab. ", fallback, ".");
        }

        window.setTimeout(() => {
          if (submit) submit.disabled = false;
        }, 1200);
      });
    });
  }

  /* ---------- footer year ---------- */
  function initYear() {
    qsa("[data-year]").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  }
})();
