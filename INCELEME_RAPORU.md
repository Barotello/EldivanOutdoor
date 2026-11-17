# Eldivan Outdoor Mobil – İnceleme Raporu

**Tarih:** 16 Kasım 2026 · **Kapsam:** `mobile/` (Expo SDK 58, React Native 0.88) · **Kod:** 9 bileşen, ~3.000 satır

## Özet

Uygulama şu an **web sitesinin mobil bir vitrini**: tek bir uzun kaydırmalı sayfa, tüm veri `mockData.js` içinde sabit, bütün aksiyonlar WhatsApp'a ya da Google Maps'e gidiyor. Görsel dil tutarlı ve marka hissi güçlü. Ama mağazaya çıkmadan önce kapatılması gereken **gerçek hatalar** var (sahte telefon numarası, geçmiş tarihli "yaklaşan" etkinlikler) ve bir outdoor kullanıcısının uygulamayı siteden ayrı olarak indirmesini sağlayacak **çevrimdışı/güvenlik özellikleri** henüz yok.

---

## 🔴 Kritik – hemen düzeltilmeli

| # | Sorun | Yer |
|---|---|---|
| K1 | **WhatsApp ve telefon numarası sahte** (`905000000000`, `+90 500 000 00 00`). Tüm "Kayıt / Rezervasyon / Ara" butonları boşa gidiyor. | `mockData.js` → `CLUB_CONFIG` |
| K2 | **Etkinlik tarihleri geçmiş** (18 Mayıs, 25 Mayıs, 2 Haziran 2026) ama "YAKLAŞIYOR / KAYIT AÇIK" rozetiyle gösteriliyor. Kontenjanlar ("Kalan: 8 Kişi") de sabit. | `EVENTS_DATA` |
| K3 | **Sahte "canlı" veri**: hava durumu (12°C, %64 nem) sabit; menüde "Canlı Hava & Rüzgar (12°C)", "GPS Canlı Saha Haritası" yazıyor. Kullanıcıyı yanıltıyor; dağda yanlış hava bilgisi güvenlik sorunu. | `WEATHER_METRICS`, `SidebarDrawer.js` |
| K4 | **OSM kullanım koşulları ihlali**: Leaflet haritasında `attribution: ''` ile OpenStreetMap atfı kaldırılmış. OSM tile sunucuları ayrıca uygulama içi yoğun kullanıma izin vermiyor. | `FieldMap.js` |
| K5 | **Mağaza yapılandırması eksik**: `app.json` içinde `ios.bundleIdentifier`, `android.package` yok; `eas.json` yok; gizlilik politikası yok. Bu haliyle mağazaya build alınamaz. | `app.json` |
| K6 | Rota/puan verisi doğrulanmamış (4.9 ★ vb. sabit). Gerçek değerlendirme sistemi yoksa yıldızlar kaldırılmalı. | `ROUTES_DATA` |

---

## 🥾 Outdoor kullanıcı gözüyle

**Güçlü yanlar:** Etkinlik detayında gerekli ekipman listesi, buluşma adresi, tek dokunuşla yol tarifi ve takvime ekleme gerçekten işe yarıyor.

**Eksikler (önem sırasıyla):**
1. **Çevrimdışı çalışmıyor.** Eldivan Dağı'nda çekim zayıf; harita (unpkg + OSM) ve yol tarifi tamamen internete bağlı. Outdoor uygulamasının 1 numaralı beklentisi: rotayı önceden indirip sinyalsiz takip edebilmek.
2. **GPX / rota çizgisi yok.** Rotalar yalnızca bir varış noktası (`destination=lat,lng`). Patikanın kendisi, yükseklik profili, su kaynakları, tehlikeli noktalar görünmüyor; GPX indirme yok.
3. **Güvenlik özellikleri yok:** acil durum butonu (112 / AFAD / JAK), konumunu grup liderine/ailene paylaş, "rotadayım, şu saatte dönmezsem haber ver" bildirimi.
4. **Konum takibi yok:** "Haritada neredeyim?", kayıt (track), mesafe/süre ölçümü.
5. **Gerçek hava durumu yok:** saatlik tahmin, rüzgar, gün doğumu/batımı, yağış uyarısı (Open-Meteo ücretsiz ve anahtarsız).
6. **Etkinliğe katılım akışı WhatsApp'a bağımlı.** Kontenjanı gerçekten düşen bir kayıt, katılımcı listesi, hatırlatma bildirimi yok.
7. Zorluk seviyeleri tutarsız ("Orta - Zor", "Zorlu Zemin", "Kolay / Aile") – standart 1–5 ölçek + açıklama olmalı.
8. Kullanıcı kendi fotoğrafını/rota yorumunu paylaşamıyor; topluluk hissi eksik.

---

## 📋 Proje yöneticisi gözüyle

1. **Uygulamanın siteden farkı tanımlanmamış.** Şu an içerik sitenin birebir kopyası; insanlar siteyi açmak yerine uygulamayı neden indirsin? Önerilen değer önerisi: *"Eldivan'da çevrimdışı rota + etkinlik kaydı + güvenlik."*
2. **İçerik yönetimi yok.** Her etkinlik/fiyat değişikliği için kod değişikliği + yeni build gerekiyor. Basit bir arka uç (Supabase / Firebase / headless CMS ya da sitenin bir JSON uç noktası) şart.
3. **Çift kod tabanı:** `src/` (web) ve `mobile/` aynı veriyi ayrı tutuyor – son commit'teki değişiklik iki yere elle yapılmış. Ortak veri kaynağı olmazsa site ile uygulama kısa sürede birbirinden kopar.
4. **Ölçüm yok:** analytics, crash raporlama (Sentry), "WhatsApp'a tıklama" dönüşüm takibi yok. Başarı ölçülemiyor.
5. **Yasal:** KVKK aydınlatma metni, gizlilik politikası, etkinlik katılım/sorumluluk feragatnamesi (motor sporları için önemli), sigorta bilgisi.
6. **Yayın planı yok:** EAS Build/Submit, sürümleme, OTA güncelleme (`eas update`), test kullanıcı grubu (TestFlight / Play internal).

---

## 💻 Developer gözüyle

| Konu | Detay |
|---|---|
| **Navigasyon** | Tek `ScrollView` + `onLayout` ile bölüm kaydırma. Ekran yok, derin bağlantı (deep link) yok, Android geri tuşu modal dışında anlamsız. `mobile/AGENTS.md` Expo Router öneriyor → `src/app/` altında sekmeli yapı kurulmalı. |
| **Performans** | Tüm bölümler (harita WebView'u dahil) açılışta render ediliyor. `assets/images` **9,2 MB**; `grup.jpg` 1 MB. Görseller WebP'ye çevrilip ~1080px'e küçültülmeli, `expo-image` kullanılmalı. Kullanılmayan görseller var (`satranc`, `kayak`, `kano`, `sup`, `balik`…). |
| **Harita** | Leaflet'i WebView'da unpkg'den çekmek: yavaş, çevrimdışı çalışmaz, web'de hiç görünmüyor. `react-native-maps` veya MapLibre (`@maplibre/maplibre-react-native`, offline paket desteği var) daha doğru. |
| **Hatalı veri eşlemesi** | "Kirazlı Dere Oryantiring" rotası `category: 'zirve'`; "Doğa Parkuru" kartı `filter: 'all'` → oryantiring seçince tüm rotalar geliyor. Filtre çiplerinde ORYANTİRİNG yok. |
| **İç içe dokunma alanları** | `CardDeck`'te kart `TouchableOpacity` içinde "SEÇ & İNCELE" butonu; `SidebarDrawer` başlığında marka butonu içinde kapatma butonu. Yanlış dokunma ve erişilebilirlik sorunu üretir. `Pressable` + kardeş yerleşim kullanılmalı. |
| **Safe area** | `BottomDock` `bottom: 12` sabit; iPhone ana çubuğuyla çakışır. Splash "Geç" butonu `top: 52` sabit. `useSafeAreaInsets()` kullanılmalı. |
| **Boyutlar** | `Dimensions.get` modül seviyesinde okunuyor; `supportsTablet: true` iken tablet/dönmede yanlış boyut. `useWindowDimensions` kullanılmalı. |
| **Splash** | Native splash'ta görsel yok + her açılışta 2,6 sn özel animasyon. `expo-splash-screen` ile tek ve kısa bir açılış yeterli. |
| **Kod kalitesi** | TypeScript, ESLint, test yok. `KEŞİF 0{n}` sabit "0" öneki. URL'ler elle encode edilmiş; `encodeURIComponent` ile tek yardımcı fonksiyona alınmalı. WhatsApp link kodu 6 yerde tekrar ediyor. |
| **Tema** | `userInterfaceStyle: "light"` – karanlık mod yok (gece kamp kullanımında önemli). |

---

## 🎨 UI/UX gözüyle

**Güçlü yanlar:** Toprak/orman renk paleti tutarlı ve markaya uygun; kart destesi + motor ikonlu ilerleme çubuğu akılda kalıcı; alt dock'ta WhatsApp'ın sabit durması iyi bir dönüşüm kararı.

**Sorunlar:**
1. **Bilgi mimarisi:** Alt dock "sekme" gibi görünüyor ama sadece sayfayı kaydırıyor; kullanıcı ayrı ekran bekler. Ayrıca "Saha" ve "İletişim" dock'ta yok, aktif sekme kaydırmayla güncellenmiyor.
2. **Menü tekrarı ve yanıltıcı öğeler:** Yan menüdeki "Enduro & Motosiklet Parkuru", "Haftalık Enduro Sürüşü", "Doğada Hayatta Kalma Kampı", "Zirve Foto Safari" gibi öğeler var olmayan içeriğe gidiyor; hepsi aynı bölüme kaydırıyor. "PLATFORM" etiketi ve `terminal-outline` ikonu geliştirici şablonundan kalma.
3. **Otomatik oynayan kart destesi** (5 sn): okumaya çalışırken kart değişiyor; erişilebilirlik açısından da sorunlu. Kullanıcı etkileşiminden sonra durmalı.
4. **Etkinlikler en altta:** Asıl dönüşüm noktası (etkinliğe katılım) uzun bir kaydırmanın sonunda. Ana ekranda "Sıradaki etkinlik" kartı en üstte olmalı.
5. **Erişilebilirlik:** Hiçbir bileşende `accessibilityLabel/Role` yok (0 kullanım). Yazı boyutları 10–11 px düzeyinde (dock etiketleri, rozetler); büyük harfli uzun metinler okunabilirliği düşürüyor. Görseller üzerindeki beyaz metin bazı fotoğraflarda kontrast sorunu yaşıyor.
6. **Boş/yükleme/hata durumları yok:** Harita yüklenmezse ya da internet yoksa kullanıcı boş kutu görüyor.
7. **Dokunma geri bildirimi:** Haptik yok (`expo-haptics`), modallar fade ile açılıyor; alttan açılan bottom-sheet mobilde daha doğal.

---

## 🛣️ Önerilen yol haritası

**Faz 0 – Düzeltmeler (1–2 gün)**
- Gerçek telefon/WhatsApp numarası, etkinlik tarihleri, OSM atfı
- Sahte "canlı" ifadelerini kaldır; oryantiring kategori hatası
- Safe-area, iç içe butonlar, otomatik oynatmanın durması
- Görsel optimizasyonu, kullanılmayan görsellerin silinmesi

**Faz 1 – Gerçek uygulama iskeleti (1 hafta)**
- Expo Router ile sekmeli yapı: *Keşfet · Rotalar · Etkinlikler · Harita · Profil/Menü*
- Rota ve etkinlik detayları için ayrı ekranlar + derin bağlantı (`eldivanoutdoor.com/rota/...` → uygulama)
- Gerçek hava durumu (Open-Meteo)
- `app.json` mağaza alanları + `eas.json`

**Faz 2 – Outdoor değeri (2–3 hafta)**
- Rota çizgileri (GPX/GeoJSON) + yükseklik profili
- Çevrimdışı harita ve rota indirme
- Konum gösterimi ve "konumumu paylaş / SOS" ekranı

**Faz 3 – Kulüp ve topluluk**
- Arka uç (site ile ortak veri), etkinlik kaydı ve kontenjan
- Push bildirimleri (yeni etkinlik, hatırlatma, hava uyarısı)
- Üyelik, katılım geçmişi, fotoğraf galerisi
- Analytics + crash raporlama, KVKK/gizlilik metinleri
