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
        <div>ELDIVAN OUTDOOR &middot; 40.5489° K, 33.5042° D</div>
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

  // 4. Sabit Alt Navigasyon Çubuğu (Yüzen Kapsül Floating Dock)
  var bottomBar = document.querySelector(".floating-dock-nav, .mobile-bottom-bar");
  if (!bottomBar) {
    bottomBar = document.createElement("nav");
    bottomBar.className = "floating-dock-nav";
    bottomBar.setAttribute("aria-label", "Hızlı Mobil Gezinme");

    var isHome = currentPath === "index.html" || currentPath === "";
    var isEvents = currentPath === "etkinlikler.html";
    var isServices = currentPath === "hizmetlerimiz.html" || currentPath === "gruplar.html";

    bottomBar.innerHTML = `
      <a href="${prefix}index.html" class="dock-item ${isHome ? 'active' : ''}" title="Ana Ekran">
        <svg viewBox="0 0 24 24" class="dock-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H4a1 1 0 0 1-1-1V9.5z"/>
        </svg>
        <span>Ana Ekran</span>
      </a>
      <a href="${prefix}etkinlikler.html" class="dock-item ${isEvents ? 'active' : ''}" title="Etkinlik">
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
      <a href="${prefix}hizmetlerimiz.html" class="dock-item ${isServices ? 'active' : ''}" title="Rotalar">
        <svg viewBox="0 0 24 24" class="dock-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3l4 8 5-5 5 15H2L8 3z"/>
          <path d="M4.5 15.5h9"/>
        </svg>
        <span>Rotalar</span>
      </a>
      <a href="https://wa.me/905000000000?text=Merhaba,%20Eldivan%20Outdoor%20etkinliklerine%20kat%C4%B1lmak%20istiyorum." target="_blank" rel="noopener" class="dock-item highlight" title="WhatsApp Hattı">
        <svg viewBox="0 0 24 24" class="dock-icon" fill="#25D366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/>
        </svg>
        <span>WhatsApp</span>
      </a>
      <button type="button" class="dock-item js-open-drawer" aria-label="Menü" title="Menü">
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
