const html = document.documentElement;
const body = document.body;
const toggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

let lockedScrollY = 0;

function setMenuState(isOpen) {
  if (!toggle || !mobileMenu) return;

  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.textContent = isOpen ? "Close" : "Menu";

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
}

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

/*
 * Lock the mobile hero to the viewport height measured at load.
 * Mobile browser toolbars alter viewport height while scrolling,
 * so height-only resize events are intentionally ignored.
 */
let lastViewportWidth = window.innerWidth;

function setStableHeroHeight() {
  if (!window.matchMedia("(max-width: 850px)").matches) {
    html.style.removeProperty("--hero-height");
    return;
  }

  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  html.style.setProperty("--hero-height", `${Math.round(viewportHeight)}px`);
}

setStableHeroHeight();

window.addEventListener(
  "resize",
  () => {
    const currentWidth = window.innerWidth;
    const widthChanged = Math.abs(currentWidth - lastViewportWidth) > 40;

    if (!widthChanged) return;

    lastViewportWidth = currentWidth;
    setStableHeroHeight();
  },
  { passive: true }
);

window.addEventListener("orientationchange", () => {
  window.setTimeout(() => {
    lastViewportWidth = window.innerWidth;
    setStableHeroHeight();
  }, 250);
});