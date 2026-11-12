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
      <a href="${prefix}index.html" class="bottom-nav-item ${isHome ? 'active' : ''}">
        <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        <span>Ana Sayfa</span>
      </a>
      <a href="${prefix}etkinlikler.html" class="bottom-nav-item ${isEvents ? 'active' : ''}">
        <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
        <span>Etkinlikler</span>
      </a>
      <a href="${prefix}hizmetlerimiz.html" class="bottom-nav-item ${isServices ? 'active' : ''}">
        <svg viewBox="0 0 24 24"><path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2L7 10l-6 8h22L14 6z"/></svg>
        <span>Aktiviteler</span>
      </a>
      <a href="https://wa.me/905000000000?text=Merhaba,%20Eldivan%20Outdoor%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener" class="bottom-nav-item highlight" aria-label="WhatsApp İletişim">
        <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.39 1.3-1.92 1.38-.49.08-1.12.11-3.64-.93-3.23-1.33-5.3-4.63-5.46-4.85-.16-.21-1.31-1.74-1.31-3.32s.83-2.36 1.12-2.68c.3-.32.65-.4 0.87-.4.22 0 .43 0 .62.01.2.01.47-.08.73.55.27.65.92 2.25 1 2.42.08.16.14.36.03.58-.11.21-.16.35-.33.54-.16.2-.35.44-.5.59-.16.16-.33.34-.14.67.19.32.84 1.38 1.8 2.24 1.24 1.1 2.29 1.44 2.62 1.6.32.16.51.14.7-.08.2-.22.84-.98 1.07-1.32.22-.34.45-.28.75-.17.31.11 1.95.92 2.29 1.09.33.16.55.25.63.39.08.14.08.82-.16 1.5z"/></svg>
        <span>WhatsApp</span>
      </a>
      <button type="button" class="bottom-nav-item js-open-drawer" aria-label="3 Nokta Menü">
        <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
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
