# EldivanOutdoor

**Eldivan Doğa ve Motor Sporları Kulübü (EDMSK)** için geliştirilmiş, açık hava ve arazi şartlarına uygun, yüksek performanslı ve modern mobil odaklı web uygulaması (PWA).

## 🌲 Özellikler

- **Adrenalin Dolu Açılış Animasyonu (Splash Scene):**
  - HTML5 Canvas ve SVG tabanlı, retro perspektif yol ve hızlanan enduro motosiklet animasyonu.
  - Ekrana çarpan 130 parçacıklı gerçekçi çamur sıçraması, ekran sarsıntısı ve telefon titreşim (haptic) desteği.
  - `sessionStorage` optimizasyonu ile oturum boyunca yalnızca 1 kez oynar; sayfa geçişlerinde anında ana ekran açılır.
  - "Geç" (Skip) butonu ve yan çekmece menüden istenildiğinde tekrar izleme seçeneği.

- **iPhone 17 Pro Çözünürlük ve Safe Area Optimizasyonu:**
  - 402px genişlik standardı, Dynamic Island ve alt çubuk için `env(safe-area-inset-*)` uyumu.
  - Liquid Glass alt navigasyon dock'u (Keşif, Rotalar, Saha, Orijinal WhatsApp butonu).

- **Bütünleşik Rotalar & Parkurlar Sayfası (rotalar.html):**
  - Ana keşif ekranı ile %100 aynı tasarım dilini paylaşan tescilli kulüp parkurları.
  - Anlık kategori filtreleme (Zirve, Enduro, Bisiklet, Off-Road, Kamp) ve URL query parametre desteği (`?filter=...`).
  - Yaklaşan kulüp etkinlikleri takvimi ve doğrudan WhatsApp katılım butonları.

- **React Bits "Card Spread" Keşfet Bölümü:**
  - İskambil destesi şeklinde fanned / yelpaze açılan etkileşimli kart destesi (`@reactbits-starter/card-spread-tw` tasarım dili).
  - 6 Temel Kulüp Disiplini: **Zirve Tırmanışı**, **Enduro**, **Yayla Kampı**, **Dağ Bisikleti**, **Off-Road 4x4**, **Oryantiring & Parkur**.
  - Dokunma ile desteyi yayma / toplama, kart üzerine odaklanma ve canlı telemetri paneli.

- **Teknik Saha & GPS Telemetrisi:**
  - Koordinatlar: `40.6034° K, 33.5140° D`
  - Rakım: `1.420M Zirve`
  - Canlı hava durumu, hissedilen sıcaklık, rüzgar ve nem metrikleri.

- **Kulüp Programları & Etkinlik Kartları:**
  - Tam boy fotoğraflı ve aşağıya doğru yumuşak beyaz degrade katmanına sahip kurumsal ve aile açık hava programları.

- **Mobil Ergonomi & PWA:**
  - Orijinal WhatsApp SVG logosuna sahip sabit alt kapsül navigasyon dock'u.
  - Çevrimdışı (offline) ve zayıf arazi çekim gücünde kesintisiz kullanım sağlayan Service Worker önbelleklemesi.
  - Mobil cihazlarda ana ekrana eklenebilir bağımsız (standalone) uygulama yapısı.

## 🛠️ Teknoloji Yığını

- **Stil & Tasarım:** Tailwind CSS, Custom Spring Animations, Frosted Glass (Liquid Glass)
- **Tipografi:** Inter, Space Grotesk (Teknik Mono), Material Symbols Outlined
- **Frontend Mantığı:** Vanilla JavaScript (ES6+), HTML5 Canvas
- **PWA:** Web App Manifest, Service Worker

## 🚀 Yerel Geliştirme

Projeyi yerel ortamda çalıştırmak için:

```bash
# Python ile yerel sunucu başlatma
python -m http.server 8080

# Tarayıcıda açma
http://localhost:8080
```

