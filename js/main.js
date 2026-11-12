// Eldivan Doğa ve Motor Sporları Kulübü - Mobile & Liquid Glass Modal Scripts

document.addEventListener("DOMContentLoaded", function () {
  // 1. Service Worker Kaydı (PWA ve Çevrimdışı/Arazi Kullanımı)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      var swPath = window.location.pathname.includes("/blog/") ? "../sw.js" : "sw.js";
      navigator.serviceWorker.register(swPath).then(
        function (reg) {
          console.log("Eldivan Outdoor SW kayıtlı:", reg.scope);
        },
        function (err) {
          console.warn("SW kayıt hatası:", err);
        }
      );
    });
  }

  // 2. Sayfa Yolu Belirleme
  var isBlog = window.location.pathname.includes("/blog/");
  var prefix = isBlog ? "../" : "";
  var currentPath = window.location.pathname.split("/").pop() || "index.html";

  // 3. Ekranın Ortasında Açılan Liquid Glass Menü Modalı
  var drawerBackdrop = document.querySelector(".drawer-backdrop");
  var drawer = document.querySelector(".mobile-drawer");

  if (!drawerBackdrop || !drawer) {
    drawerBackdrop = document.createElement("div");
    drawerBackdrop.className = "drawer-backdrop";
    drawerBackdrop.setAttribute("aria-hidden", "true");

    drawer = document.createElement("div");
    drawer.className = "mobile-drawer liquid-glass-modal";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", "Eldivan Outdoor Hızlı Menü");

    drawer.innerHTML = `
      <div class="drawer-header glass-header">
        <div class="drawer-brand">
          <img src="${prefix}images/logo.jpg" alt="Logo" width="38" height="38" class="glass-logo">
          <div>
            <div class="drawer-title">ELDIVAN<span style="color:#ff2d55;">.</span></div>
            <div class="drawer-sub">Doğa &amp; Motor Sporları</div>
          </div>
        </div>
        <button class="drawer-close glass-close" aria-label="Menüyü Kapat" title="Kapat">&times;</button>
      </div>

      <div class="drawer-body glass-body">
        <ul class="drawer-nav glass-nav">
          <li><a href="${prefix}index.html" class="glass-item ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">🏠 Ana Sayfa</a></li>
          <li><a href="${prefix}etkinlikler.html" class="glass-item ${currentPath === 'etkinlikler.html' ? 'active' : ''}">📅 Etkinlik Takvimi</a></li>
          <li><a href="${prefix}hizmetlerimiz.html" class="glass-item ${currentPath === 'hizmetlerimiz.html' ? 'active' : ''}">⚡ Hizmetlerimiz & Turlar</a></li>
          <li><a href="${prefix}biz-kimiz.html" class="glass-item ${currentPath === 'biz-kimiz.html' ? 'active' : ''}">🌲 Biz Kimiz & Kulüp</a></li>
          <li><a href="${prefix}gruplar.html" class="glass-item ${currentPath === 'gruplar.html' ? 'active' : ''}">👥 Spor Gruplarımız</a></li>
          <li><a href="${prefix}duyurular.html" class="glass-item ${currentPath === 'duyurular.html' ? 'active' : ''}">📢 Kulüp Duyuruları</a></li>
          <li><a href="${prefix}blog/index.html" class="glass-item ${isBlog ? 'active' : ''}">📝 Doğa & Gezi Blogu</a></li>
          <li><a href="${prefix}iletisim.html" class="glass-item ${currentPath === 'iletisim.html' ? 'active' : ''}">📍 İletişim & Konum</a></li>
        </ul>

        <div class="drawer-cta-box glass-cta-box">
          <div class="drawer-cta-title">Aramıza Katılın</div>
          <p class="drawer-cta-desc">Doğa yürüyüşleri, enduro rotaları ve kamplar için bize anında yazın.</p>
          <a href="https://wa.me/905000000000?text=Merhaba,%20Eldivan%20Outdoor%20etkinliklerine%20kat%C4%B1lmak%20istiyorum." target="_blank" rel="noopener" class="drawer-whatsapp-btn glass-whatsapp">
            💬 WhatsApp ile Yazın
          </a>
        </div>
      </div>

      <div class="drawer-footer glass-footer">
        <div>ELDIVAN OUTDOOR &middot; 40.5489° N, 33.5042° E</div>
      </div>
    `;

    document.body.appendChild(drawerBackdrop);
    document.body.appendChild(drawer);
  }

  function openMenu() {
    drawer.classList.add("open");
    drawerBackdrop.classList.add("active");
    var navToggles = document.querySelectorAll(".nav-toggle");
    navToggles.forEach(function(t) { t.classList.add("open"); });
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    drawer.classList.remove("open");
    drawerBackdrop.classList.remove("active");
    var navToggles = document.querySelectorAll(".nav-toggle");
    navToggles.forEach(function(t) { t.classList.remove("open"); });
    document.body.style.overflow = "";
  }

  // Menü açma/kapama buton olayları
  var navToggles = document.querySelectorAll(".nav-toggle, .js-open-drawer, .outside-menu-pill");
  navToggles.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (drawer.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  });

  var drawerCloseBtn = drawer.querySelector(".drawer-close");
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeMenu);
  }

  drawerBackdrop.addEventListener("click", closeMenu);

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeMenu();
    }
  });

  // 4. Sabit Alt Navigasyon Çubuğu (Mobile Bottom Navigation Bar)
  var bottomBar = document.querySelector(".mobile-bottom-bar, .floating-dock-nav");
  if (!bottomBar) {
    bottomBar = document.createElement("nav");
    bottomBar.className = "mobile-bottom-bar";
    bottomBar.setAttribute("aria-label", "Hızlı Mobil Gezinme");

    var isHome = currentPath === "index.html" || currentPath === "";
    var isEvents = currentPath === "etkinlikler.html";
    var isServices = currentPath === "hizmetlerimiz.html" || currentPath === "gruplar.html";

    bottomBar.innerHTML = `
      <a href="${prefix}index.html" class="bottom-nav-item ${isHome ? 'active' : ''}" title="Ana Ekran">
        <svg viewBox="0 0 24 24" class="dock-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H4a1 1 0 0 1-1-1V9.5z"/>
        </svg>
        <span>Ana Ekran</span>
      </a>
      <a href="${prefix}etkinlikler.html" class="bottom-nav-item ${isEvents ? 'active' : ''}" title="Etkinlik">
        <svg viewBox="0 0 24 24" class="dock-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="3" ry="3"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <circle cx="8.5" cy="15" r="1" fill="currentColor"/>
          <circle cx="12" cy="15" r="1" fill="currentColor"/>
          <circle cx="15.5" cy="15" r="1" fill="currentColor"/>
        </svg>
        <span>Etkinlik</span>
      </a>
      <a href="${prefix}hizmetlerimiz.html" class="bottom-nav-item ${isServices ? 'active' : ''}" title="Rotalar">
        <svg viewBox="0 0 24 24" class="dock-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3l4 8 5-5 5 15H2L8 3z"/>
          <path d="M4.5 15.5h9"/>
        </svg>
        <span>Rotalar</span>
      </a>
      <a href="https://wa.me/905000000000?text=Merhaba,%20Eldivan%20Outdoor%20etkinliklerine%20kat%C4%B1lmak%20istiyorum." target="_blank" rel="noopener" class="bottom-nav-item highlight" title="WhatsApp Hattı">
        <svg viewBox="0 0 24 24" class="dock-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          <path d="M10 9a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2" stroke-width="1.5"/>
        </svg>
        <span>WhatsApp</span>
      </a>
      <button type="button" class="bottom-nav-item js-open-drawer" aria-label="Menü" title="Menü">
        <svg viewBox="0 0 24 24" class="dock-icon" fill="currentColor">
          <circle cx="12" cy="5" r="1.8"/>
          <circle cx="12" cy="12" r="1.8"/>
          <circle cx="12" cy="19" r="1.8"/>
        </svg>
        <span>Menü</span>
      </button>
    `;

    document.body.appendChild(bottomBar);

    var menuBtn = bottomBar.querySelector(".js-open-drawer");
    if (menuBtn) {
      menuBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openMenu();
      });
    }
  }

  // 5. Scroll Reveal Animasyonu
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }
});
