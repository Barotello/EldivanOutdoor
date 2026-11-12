// 10 Kasım anma mesajı: yalnızca 10 Kasım günü (Türkiye saatiyle), her ziyaretçiye bir kez gösterilir.
// Kapatınca o yıl tekrar çıkmaz. Adresin sonuna ?anma=1 eklenirse test için her gün gösterilir.
(function () {
  function bugunTurkiye() {
    try {
      var p = {};
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit"
      }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      return p.year + "-" + p.month + "-" + p.day;
    } catch (e) {
      return new Date(Date.now() + 3 * 3600 * 1000).toISOString().slice(0, 10);
    }
  }

  var bugun = bugunTurkiye();
  var test = /[?&]anma=1\b/.test(location.search);
  if (bugun.slice(5) !== "11-10" && !test) return;

  var anahtar = "anma-goruldu-" + bugun.slice(0, 4);
  try {
    if (!test && localStorage.getItem(anahtar)) return;
  } catch (e) {}

  function goster() {
    var oncekiOdak = document.activeElement;
    var perde = document.createElement("div");
    perde.className = "anma-perde";
    perde.innerHTML =
      '<div class="anma-kutu" role="dialog" aria-modal="true" aria-labelledby="anma-baslik">' +
        '<button type="button" class="anma-carpi" aria-label="Kapat">&times;</button>' +
        '<img src="/images/ataturk-portre.jpg" alt="Mustafa Kemal Atatürk portresi" width="600" height="800">' +
        '<div class="anma-yazi">' +
          '<h2 id="anma-baslik">10 Kasım</h2>' +
          '<p class="yil">1938 – ∞</p>' +
          '<p class="soz">Saygıyla ve Minnetle&hellip;</p>' +
          '<button type="button" class="anma-kapat-btn">Kapat</button>' +
        '</div>' +
      '</div>';

    function kapat() {
      try { localStorage.setItem(anahtar, "1"); } catch (e) {}
      document.removeEventListener("keydown", tusla);
      document.body.style.overflow = "";
      perde.remove();
      if (oncekiOdak && oncekiOdak.focus) oncekiOdak.focus();
    }
    function tusla(e) { if (e.key === "Escape") kapat(); }

    perde.addEventListener("click", function (e) {
      if (e.target === perde || e.target.closest(".anma-carpi, .anma-kapat-btn")) kapat();
    });
    document.addEventListener("keydown", tusla);
    document.body.style.overflow = "hidden";
    document.body.appendChild(perde);
    perde.querySelector(".anma-kapat-btn").focus();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", goster);
  else goster();
})();
