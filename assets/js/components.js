const pathname = window.location.pathname;
const pageName = pathname.split("/").pop() || "index.html";
const isHome = pageName === "index.html" || pageName === "";
const headerClass = isHome ? "site-header" : "site-header site-header--dark";
const year = new Date().getFullYear();

const navItems = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["menu.html", "Menu"],
  ["visit.html", "Visit"],
  ["reservation.html", "Reservation"]
];

const navLinks = navItems
  .map(
    ([href, label]) => `
      <a href="${href}" ${pageName === href ? 'aria-current="page"' : ""}>${label}</a>
    `
  )
  .join("");

const header = `
  <header class="${headerClass}" data-header>
    <a class="wordmark" href="index.html" aria-label="UPTOME 홈">Uptome</a>

    <nav class="site-nav" aria-label="주요 메뉴">
      ${navLinks}
    </nav>

    <button
      class="menu-toggle"
      type="button"
      aria-expanded="false"
      aria-controls="mobile-menu"
      aria-label="메뉴 열기"
    >
      <span class="menu-toggle__icon" aria-hidden="true">
        <span class="menu-toggle__line"></span>
        <span class="menu-toggle__line"></span>
      </span>
    </button>
  </header>

  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <nav class="mobile-menu__nav" aria-label="모바일 메뉴">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="menu.html">Menu</a>
      <a href="visit.html">Visit</a>
      <a href="reservation.html">Reservation</a>
    </nav>

    <div class="mobile-menu__bottom">
      <a
        class="mobile-menu__instagram"
        href="https://www.instagram.com/up_to_me_official"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="instagram-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="5"></rect>
            <circle cx="12" cy="12" r="4"></circle>
            <circle cx="17.5" cy="6.5" r="1"></circle>
          </svg>
        </span>
        <span>Instagram</span>
      </a>

      <div class="mobile-menu__reservation">
        <a
          class="mobile-menu__reserve mobile-menu__reserve--primary"
          href="https://app.catchtable.co.kr/ct/shop/uptome?from"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>캐치테이블로 예약하기</span>
          <span aria-hidden="true">→</span>
        </a>

        <a
          class="mobile-menu__reserve mobile-menu__reserve--secondary"
          href="https://www.catchtable.net/explore/shop/uptome"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Reserve in English</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>
`;

const footer = `
  <footer class="site-footer">
    <div class="site-footer__top">
      <a class="wordmark site-footer__logo" href="index.html">Uptome</a>
    </div>

    <div class="site-footer__middle">
      <div class="site-footer__info">
        <p>서울특별시 마포구 성미산로 165-6, 1층<br>1F, 165-6 Seongmisan-ro, Mapo-gu, Seoul</p>
        <p>Open daily 12:00 — 22:00<br>All dining is by advance reservation only.</p>
      </div>

      <div class="site-footer__links">
        <a href="https://www.instagram.com/up_to_me_official" target="_blank" rel="noopener noreferrer">Instagram →</a>
        <a href="tel:01077461288">Contact →</a>
        <a href="reservation.html">Reservation →</a>
      </div>
    </div>

    <div class="site-footer__bottom">
      <small>© ${year} Uptome. All rights reserved.<br>Site by Page Atelier.</small>
    </div>
  </footer>
`;

document.querySelectorAll("[data-site-header]").forEach((element) => {
  element.innerHTML = header;
});

document.querySelectorAll("[data-site-footer]").forEach((element) => {
  element.innerHTML = footer;
});