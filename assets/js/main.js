const html = document.documentElement;
const body = document.body;
const toggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

let lockedScrollY = 0;

function setMenuState(isOpen) {
  if (!toggle || !mobileMenu) return;

  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  toggle.classList.toggle("is-open", isOpen);

  mobileMenu.classList.toggle("is-open", isOpen);
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));

  html.classList.toggle("menu-open", isOpen);
  body.classList.toggle("menu-open", isOpen);

  if (isOpen) {
    lockedScrollY = window.scrollY;

    body.style.position = "fixed";
    body.style.top = `-${lockedScrollY}px`;
    body.style.right = "0";
    body.style.left = "0";
    body.style.width = "100%";
  } else {
    body.style.position = "";
    body.style.top = "";
    body.style.right = "";
    body.style.left = "";
    body.style.width = "";

    window.scrollTo(0, lockedScrollY);
  }

  window.requestAnimationFrame(updateMenuToggleTone);
}


/*
 * Mobile hamburger auto contrast
 * mix-blend-mode is unreliable inside fixed/stacked headers on some browsers.
 * Instead, sample the element directly beneath the button and switch the icon
 * between navy and white according to the resolved background tone.
 */
function parseCssColor(value) {
  const match = value?.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;

  const parts = match[1]
    .split(",")
    .map((part) => Number.parseFloat(part.trim()));

  if (parts.length < 3 || parts.slice(0, 3).some(Number.isNaN)) return null;

  return {
    r: parts[0],
    g: parts[1],
    b: parts[2],
    a: Number.isFinite(parts[3]) ? parts[3] : 1
  };
}

function relativeLuminance({ r, g, b }) {
  const channels = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });

  return (
    channels[0] * 0.2126 +
    channels[1] * 0.7152 +
    channels[2] * 0.0722
  );
}

function resolveBackgroundTone(startElement) {
  let element = startElement;

  while (element && element !== document.documentElement) {
    const style = window.getComputedStyle(element);

    /* Photographic/background-image sections use a light icon. */
    if (style.backgroundImage && style.backgroundImage !== "none") {
      return "dark";
    }

    if (["IMG", "VIDEO", "CANVAS"].includes(element.tagName)) {
      return "dark";
    }

    /* Embedded maps are generally light. */
    if (element.tagName === "IFRAME") {
      return "light";
    }

    const color = parseCssColor(style.backgroundColor);

    /* Very transparent overlays defer to their parent background. */
    if (color && color.a >= 0.65) {
      return relativeLuminance(color) < 0.42 ? "dark" : "light";
    }

    element = element.parentElement;
  }

  const bodyColor = parseCssColor(window.getComputedStyle(body).backgroundColor);
  return bodyColor && relativeLuminance(bodyColor) < 0.42 ? "dark" : "light";
}

let menuToneFrame = 0;

function updateMenuToggleTone() {
  if (!toggle) return;

  if (!window.matchMedia("(max-width: 850px)").matches) {
    toggle.classList.remove("is-on-dark");
    return;
  }

  const rect = toggle.getBoundingClientRect();
  const sampleX = Math.min(window.innerWidth - 1, Math.max(0, rect.left + rect.width / 2));
  const sampleY = Math.min(window.innerHeight - 1, Math.max(0, rect.top + rect.height / 2));

  const ignoredElements = new Set([
    toggle,
    toggle.closest(".site-header"),
    toggle.closest("[data-site-header]")
  ]);

  const underlyingElement = document
    .elementsFromPoint(sampleX, sampleY)
    .find((element) => {
      if (ignoredElements.has(element)) return false;
      if (toggle.contains(element)) return false;
      if (element.classList?.contains("mobile-menu")) return false;
      return true;
    });

  const tone = resolveBackgroundTone(underlyingElement || body);
  toggle.classList.toggle("is-on-dark", tone === "dark");
}

function requestMenuToggleToneUpdate() {
  if (menuToneFrame) return;

  menuToneFrame = window.requestAnimationFrame(() => {
    menuToneFrame = 0;
    updateMenuToggleTone();
  });
}

updateMenuToggleTone();
window.addEventListener("scroll", requestMenuToggleToneUpdate, { passive: true });
window.addEventListener("resize", requestMenuToggleToneUpdate, { passive: true });
window.addEventListener("orientationchange", requestMenuToggleToneUpdate);

if (toggle && mobileMenu) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });
}

/* Reveal animations */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
