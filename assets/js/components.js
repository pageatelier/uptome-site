
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

const navLinks = navItems.map(([href, label]) => `
  <a href="${href}" ${pageName === href ? 'aria-current="page"' : ""}>${label}</a>
`).join("");

const header = `
  <header class="${headerClass}" data-header>
    <a class="wordmark" href="index.html" aria-label="UPTOME 홈">Uptome</a>
    <nav class="site-nav" aria-label="주요 메뉴">
      ${navLinks}
    </nav>

    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">
      Menu
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
      <a href="https://www.instagram.com/up_to_me_official" target="_blank" rel="noopener noreferrer">Instagram</a>
    </div>
  </div>
`;

const footer = `
  <footer class="site-footer">
    <div class="site-footer__top">
      <a class="wordmark site-footer__logo" href="index.html">UPTOME</a>
      <p class="site-footer__intro">서울 연남동의<br>호주식 모던 다이닝</p>
    </div>

    <div class="site-footer__middle">
      <div class="site-footer__info">
        <p>서울특별시 마포구 성미산로 165-6, 1층</p>
        <p>매일 12:00 — 22:00 · 브레이크 타임 없음</p>
      </div>
      <div class="site-footer__links">
        <a href="https://www.instagram.com/up_to_me_official" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <a href="tel:050714801438">Contact ↗</a>
        <a href="reservation.html">Reservation ↗</a>
      </div>
    </div>

    <div class="site-footer__bottom">
      <small>© ${year} UPTOME</small>
      <a href="index.html">KR</a>
    </div>
  </footer>
`;

document.querySelectorAll("[data-site-header]").forEach(el => el.innerHTML = header);
document.querySelectorAll("[data-site-footer]").forEach(el => el.innerHTML = footer);
