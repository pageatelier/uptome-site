const isHome = location.pathname.endsWith("/") || location.pathname.endsWith("index.html");
const isEnglish = location.pathname.includes("/en/");
const root = isEnglish ? "../" : "";
const headerClass = isHome && !isEnglish ? "site-header" : "site-header site-header--dark";

const header = `
  <header class="${headerClass}">
    <a class="wordmark" href="${root}index.html" aria-label="UPTOME 홈">
      UP<span>TO</span>ME
    </a>
    <nav class="site-nav" aria-label="주요 메뉴">
      <a href="${root}about.html">About</a>
      <a href="${root}menu.html">Menu</a>
      <a href="${root}visit.html">Visit</a>
      <a href="${isEnglish ? "../index.html" : "en/index.html"}">${isEnglish ? "KR" : "EN"}</a>
    </nav>
    <a class="reserve-link" href="${root}reservation.html">
      Reserve <span aria-hidden="true">↗</span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">
      Menu
    </button>
  </header>
  <nav class="mobile-menu" id="mobile-menu" aria-label="모바일 메뉴">
    <a href="${root}about.html">About</a>
    <a href="${root}menu.html">Menu</a>
    <a href="${root}visit.html">Visit</a>
    <a href="${root}reservation.html">Reservation ↗</a>
  </nav>
`;

const footer = `
  <footer class="site-footer">
    <a class="wordmark site-footer__logo" href="${root}index.html">UP<span>TO</span>ME</a>
    <p>Australian-inspired modern dining<br>in Yeonnam, Seoul.</p>
    <div class="site-footer__links">
      <a href="#" aria-label="업투미 인스타그램">Instagram</a>
      <a href="mailto:hello@example.com">Contact</a>
    </div>
    <small>© 2026 UPTOME</small>
  </footer>
`;

document.querySelectorAll("[data-site-header]").forEach((element) => {
  element.innerHTML = header;
});

document.querySelectorAll("[data-site-footer]").forEach((element) => {
  element.innerHTML = footer;
});
