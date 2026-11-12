# Eldivan Outdoor (eldivanoutdoor.com) Mobil Dönüşüm ve Geliştirme Proje Dokümanı

> **Proje Adı:** Eldivan Doğa ve Motor Sporları Kulübü Web Sitesi Mobilizasyon & Outdoor UX Projesi  
> **Hedef Domain:** [eldivanoutdoor.com](https://eldivanoutdoor.com/)  
> **Konsept:** Doğa Sporları, Macera, Motor Sporları (Enduro, Bisiklet, Kamp, Off-road, Yürüyüş, Su ve Kış Sporları)  
> **Yaklaşım:** Mobile-First, PWA (Progressive Web App) Destekli, Açık Hava (Saha/Doğa) Kullanımına Uygun Ergonomi  
> **Tarih:** Kasım 2026  

---

## 1. Yönetici Özeti ve Proje Amacı

**Eldivan Doğa ve Motor Sporları Kulübü**, Çankırı Eldivan merkezli olarak doğa yürüyüşünden enduro motosiklete, dağ bisikletinden kampçılığa ve su sporlarına kadar çok geniş bir yelpazede adrenalin ve doğaseverleri buluşturan bir topluluktur.

Mevcut web sitesi (`eldivanoutdoor.com`) masaüstü ekranlar düşünülerek hazırlanmış, temiz ve doğaya uygun bir renk paletine (orman yeşili, toprak, kum, kiremit rengi) sahip statik bir tanıtım sitesidir. Ancak günümüzde outdoor sporcuları, rota katılımcıları ve kulüp üyeleri web sitesine **%85'in üzerinde oranla arazide, yolda veya hareket halindeyken akıllı telefonlar üzerinden** erişmektedir.

### Temel Amaç:
Web sitesini yalnızca "ekrana sığan" standart bir responsive tasarıma değil; **açık hava koşullarına (parlak güneş ışığı, tek elle eldivenli/hareketli kullanım, arazide zayıf hücresel internet bağlantısı, acil durum/konum ihtiyacı)** uygun, çağdaş bir **mobil deneyime** kavuşturmaktır.

---

## 2. Mevcut Sitenin Mobil İnceleme ve Teşhis Raporu

Mevcut sitenin kaynak kodları (`index.html`, `css/style.css`, `js/main.js`, vb.) ve alt sayfaları (`etkinlikler.html`, `hizmetlerimiz.html`, `biz-kimiz.html`, `gruplar.html`, `iletisim.html`) incelenmiş, mobil kullanım açısından şu darboğazlar tespit edilmiştir:

| Bölüm / Bileşen | Mevcut Durum | Mobil UX Sorunu / Darboğaz |
| :--- | :--- | :--- |
| **Üst Bar (Header)** | Logo + Atatürk Gözleri Görseli (`.nav-eyes`) + Hamburger Butonu tek satırda. | 360px-400px arası telefonlarda logo ve görseller sıkışmakta, dokunma alanı (touch target) daralmakta. |
| **Navigasyon Menüsü** | Açıldığında tüm ekranı kaplamayan, içeriğin üstüne açılan düz liste. | Tek elle başparmağın ulaşması zor (ekranın üst kısmında), alt navigasyon (Bottom Bar) bulunmuyor. |
| **Hero (Giriş) Alanı** | Masaüstü yatay banner mantığıyla ortalanmış metin ve buton. | Mobilde ekran yüksekliğinin çoğunu kaplamakta, kullanıcıyı doğrudan eyleme (etkinlik seçimi, ara, whatsapp) yönlendirememektedir. |
| **Aktivite Izgarası (`.tile-grid`)** | 11 farklı spor dalı dikey grid ile alt alta sıralanıyor. | Mobilde kullanıcı 11 aktiviteyi görmek için sayfayı çok uzun kaydırmak zorunda kalıyor (sonsuz scroll yorgunluğu). |
| **Kartlar ve Hizmetler** | Büyük dikey kartlar (`.grid-2up`, `.card`). | Ekran genişliğini tam verimli kullanamıyor, dikeyde çok fazla yer kaplıyor. |
| **Açık Hava & Güneş Okunabilirliği** | Küçük serif fontlar (`Fraunces`) ve düşük kontrastlı açık gri/bej metinler (`--muted: #647163`). | Güneş altında arazide telefon parlaklığı azaldığında okunması güçleşiyor. |
| **İletişim & Rota** | Statik form ve standart iletişim metinleri. | Tek tıkla WhatsApp başlatma, rota/konum alma (Google Maps bağlantısı) ve hızlı telefon arama butonları öne çıkarılmamış. |
| **Çevrimdışı (Offline) Destek** | Standart statik hosting. | Arazide veya dağda telefon şebekesi çekmediğinde siteye veya önceden bakılan etkinlik detayına ulaşılamıyor. |

---

## 3. Outdoor Konseptine Uygun Mobil Tasarım ve UX İlkeleri

Mobil tasarım sürecinde açık hava (outdoor) sporcularının saha alışkanlıkları ve fiziksel şartları rehber alınacaktır:

### 3.1. "Thumb-Zone" (Başparmak Ergonomisi) & Alt Navigasyon
- Kullanıcıların telefonu arazide tek elle tuttuğu varsayılır. Kritik menü ve butonlar ekranın tepesine değil, başparmağın rahatça ulaştığı alt bölgeye taşınacaktır.
- **Sabit Alt Menü (Sticky Bottom Navigation Bar):**
  1. 🏠 **Ana Sayfa**
  2. 📅 **Etkinlikler**
  3. 🧭 **Aktiviteler / Rotalar**
  4. 💬 **WhatsApp / Katıl**
  5. ☰ **Daha Fazla (Drawer Menü)**

### 3.2. Arazide Güneş Işığı ve Yüksek Kontrast
- Doğada ekran parlamasını yenmek için arka plan ile metin kontrastı WCAG AAA standardına yükseltilecektir.
- Gövde metinleri minimum 16px, kritik bilgiler (tarih, saat, fiyat, zorluk seviyesi) belirgin rozetler (badge) halinde sunulacaktır.

### 3.3. Dikey Kaydırma Yerine "Mobil Yatay Kaydırma" (Touch Swipe / Carousels)
- 11 farklı aktivite (Bisiklet, Enduro, Off-Road, Kamp, Kano vb.) mobilde tek tek alt alta dizilmek yerine, **yatayda parmakla kaydırılabilen (snap-scroll) modern hikaye/kategori kartları** haline getirilecektir.

### 3.4. Rota ve Zorluk Derecesi Göstergeleri (Outdoor Badges)
- Etkinlikler ve aktiviteler için mobil rozetler:
  - 🟢 **Kolay** / 🟡 **Orta** / 🔴 **Zor (İleri Düzey Enduro / Dağ Bisikleti)**
  - ⏱️ **Tahmini Süre** (Örn: 4 Saat)
  - 📍 **Konum / İrtifa** (Örn: Eldivan Çamlığı - 1450m)

### 3.5. Hızlı İletişim ve Acil Durum / Rota Butonu (Floating CTA)
- Ekranın sağ alt köşesinde doğaseverlerin doğrudan organizatörlerle konuşabilmesi için **"WhatsApp Bilgi & Kayıt"** yüzen butonu (Floating Action Button).

---

## 4. Sayfa Bazında Mobil Dönüşüm Planı

### 4.1. Header (Üst Alan) ve Navigasyon Çözümü
- **Üst Çubuk:**
  - Sol: Eldivan Outdoor kulüp logosu ve başlığı.
  - Sağ: Hızlı arama / filtre butonu ve Atatürk gözleri görseli (orantılı ve zarif bir ikon boyutunda).
- **Alt Çubuk (Bottom Bar):** En çok kullanılan 4-5 aksiyon tek dokunuşla ulaşılabilir.
- **Gelişmiş Yan Menü (Off-Canvas Drawer):**
  - Hamburger tıklandığında sağdan veya alttan akıcı bir animasyonla açılan modern mobil çekmece menü.
  - İçerisinde: Duyurular, Blog, Biz Kimiz, Fotoğraf Galerisi, Sosyal Medya hesapları ve İletişim.

### 4.2. Ana Sayfa (`index.html`) Mobil Yapısı
1. **Hero Alanı (Kompakt ve Vurucu):**
   - Tam ekran yerine ekranın %60'ını kapsayan, doğa arka planlı şık bir başlık.
   - Hızlı Aksiyon Hapları (Filter Chips): *"Bu Hafta Sonu"*, *"Enduro"*, *"Kamp"*, *"Yürüyüş"*.
2. **"Hızlı Aktivite Seçimi" (Horizontal Scroll Tile Bar):**
   - 11 aktivite yan yana yatay kaydırmalı dairesel veya yuvarlatılmış kartlar olarak dizilir.
3. **"Gelecek En Yakın Etkinlik" Vitrini:**
   - Tarihi yaklaşan ilk 2 etkinliğin kartı (Geri sayım sayacı, kontenjan durumu, "Hemen Katıl" butonu).
4. **Hizmetler & Turlar:**
   - 2 sütunlu kompakt kart ızgarası veya dokunmatik kaydırıcı.
5. **Kulüp Hakkında Özet:**
   - Katlanabilir akordeon veya kısa vurucu bir "Biz Kimiz" kartı.

### 4.3. Etkinlikler Sayfası (`etkinlikler.html`)
- **Mobil Takvim / Liste Geçişi:** Kullanıcı ister liste ister aylık takvim görünümünde etkinlikleri inceleyebilir.
- **Filtreleme Çubuğu (Sticky Top Filter):** Spor dalına göre tek dokunuşla filtreleme (Enduro, Bisiklet, Doğa Yürüyüşü vb.).
- **Detay Kartı:**
  - Tarih rozeti (Örn: `15 KAS`, `PAZ`).
  - Zorluk seviyesi ve ekipman gereksinimleri ikonu.
  - "WhatsApp'tan Bilgi Al" ve "Takvime Ekle (iCal/Google)" butonları.

### 4.4. Hizmetlerimiz Sayfası (`hizmetlerimiz.html`)
- Hizmet paketleri (Örn: *Doğada Güçlenen Ekipler*, *Oyun Alanımız Doğa Olsun*, *Doğa Bisiklet Turu*) mobilde "Fiyat Kartı / Paket Detayı" formatına dönüştürülecektir.
- Her hizmetin altında doğrudan organizatöre rezervasyon talebi gönderen hazır WhatsApp şablon butonu yer alacaktır.

### 4.5. İletişim ve Konum Sayfası (`iletisim.html`)
- **Doğrudan Aksiyon Butonları:**
  - 📞 **Hemen Ara** (Kulüp yetkilisi)
  - 💬 **WhatsApp'tan Yaz**
  - 🗺️ **Eldivan Buluşma Noktasına Yol Tarifi Al** (Google Haritalar derin bağlantısı)
- Kompakt, mobil klavye dostu (`inputmode="tel"`, `inputmode="email"`) iletişim formu.

---

## 5. Teknik Mimari ve Uygulama Stratejisi

Mevcut sitenin saf HTML5, CSS3 ve Vanilla JavaScript yapısı **korunarak**, sıfır framework yüküyle ultra hızlı (Lighthouse 95+) bir mobil deneyim elde edilecektir:

### 5.1. Teknik Standartlar
- **Modern CSS Mobil Özellikleri:**
  - CSS Grid & Flexbox tabanlı akışkan yapı.
  - Ekran yüksekliği için `100dvh` (Dynamic Viewport Height) kullanımı (mobil adres çubuğunun açılıp kapanmasında zıplamayı önler).
  - Dokunma hedefleri: Minimum 44x44px (tercihen 48x48px) tıklama alanı.
  - `scroll-snap-type: x mandatory` ile kütüphanesiz, akıcı yatay kart kaydırma.
- **PWA (Progressive Web App) Özellikleri:**
  - `manifest.json`: Kullanıcı siteyi telefonunun ana ekranına uygulama gibi indirebilir (Eldivan Outdoor ikonu ve açılış ekranı).
  - `sw.js` (Service Worker): Temel sayfaların ve rota fotoğraflarının arazide internet çekmediğinde de açılabilmesi için akıllı önbellekleme (Cache First / Stale While Revalidate).
- **Görsel & Performans Optimizasyonu:**
  - Modern WebP / AVIF formatlarına dönüştürme.
  - `loading="lazy"` ve `srcset` ile mobil cihazlara uygun çözünürlükte görsel indirilmesi (hücresel veri tasarrufu).

---

## 6. Proje Fazları ve Yol Haritası

```
+-------------------------------------------------------------------------+
| FAZ 1: ALTYAPI & MOBİL TASARIM SİSTEMİ                                  |
| - Renk, kontrast, tipografi ve touch token'larının belirlenmesi         |
| - CSS mobil temelinin (reset, variables, dvh, safe-area-inset) inşası   |
+-------------------------------------------------------------------------+
                                   |
                                   v
+-------------------------------------------------------------------------+
| FAZ 2: GLOBAL MOBİL BİLEŞENLER                                          |
| - Responsive Header & Atatürk gözleri entegrasyonu                      |
| - Sticky Bottom Navigation Bar (Alt Menü)                               |
| - Off-Canvas Çekmece Menü (Drawer) & Dokunmatik Aç/Kapa Etkileşimi      |
+-------------------------------------------------------------------------+
                                   |
                                   v
+-------------------------------------------------------------------------+
| FAZ 3: SAYFA BAZLI MOBİL UYARLAMA                                       |
| - index.html: Yatay kaydırmalı aktivite çubuğu, kompakt hero, vitrin    |
| - etkinlikler.html: Filtreleme hapları, kart görünümü, takvim aksiyonu   |
| - hizmetlerimiz.html & iletisim.html: Tek tık arama, harita, WhatsApp   |
+-------------------------------------------------------------------------+
                                   |
                                   v
+-------------------------------------------------------------------------+
| FAZ 4: OUTDOOR KATMA DEĞERLİ ÖZELLİKLER (PWA & SAHA ARAÇLARI)           |
| - Web App Manifest (Telefona İndirilebilir Uygulama Deneyimi)           |
| - Service Worker ile Çevrimdışı (Offline) çalışma desteği               |
| - Eldivan Bölgesi Rota & Harita / Konum yönlendirmeleri                 |
+-------------------------------------------------------------------------+
                                   |
                                   v
+-------------------------------------------------------------------------+
| FAZ 5: TEST, OPTİMİZASYON VE CANLIYA ALIM                               |
| - iOS Safari & Android Chrome gerçek cihaz testleri                     |
| - Google PageSpeed / Lighthouse Mobile (Hedef: 90+)                     |
| - Canlıya alma ve doğrulama                                             |
+-------------------------------------------------------------------------+
```

---

## 7. Kabul Kriterleri ve Başarı Ölçütleri

1. **Lighthouse Performans Puanı:** Mobil cihaz testinde Performans >= 90, Erişilebilirlik >= 95, SEO >= 95.
2. **Sıfır Yatay Taşma:** 320px genişlikteki en dar ekranlardan (iPhone SE vb.) katlanabilir ve büyük ekranlara kadar yatay kaydırma çubuğunun (overflow-x) kesinlikle oluşmaması.
3. **Başparmak Erişilebilirliği:** Ana sayfa ve alt sayfalarda tek elle gezinme oranının %100 karşılanması.
4. **PWA Uyumluluğu:** Chrome ve Safari'de "Ana Ekrana Ekle" uyarısı vermesi ve tarayıcı barı olmadan bir mobil uygulama hissiyle çalışabilmesi.
5. **Hızlı İletişim Dönüşümü:** Kullanıcının araziden veya evinden en fazla 2 dokunuşla kulüp yetkilisiyle WhatsApp üzerinden iletişime geçebilmesi.

