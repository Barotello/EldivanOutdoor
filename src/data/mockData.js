// TODO: Gerçek kulüp numarası girilmeli. Tüm WhatsApp/arama butonları buradan beslenir.
export const CLUB_CONFIG = {
  whatsappNumber: '905000000000',
  phoneDisplay: '+90 500 000 00 00',
  phoneHref: 'tel:+905000000000',
  coordinates: '40.6034° K, 33.5140° D',
  centerCoordinates: '40.5700° K, 33.5250° D',
  elevation: '1.420M',
  region: 'ÇANKIRI / ELDİVAN',
  address: 'Topraklık Mah. Cevher Dudayev Cad. No:40, Eldivan / Çankırı',
  meetingPointMapsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Toprakl%C4%B1k+Mah.+Cevher+Dudayev+Cad.+No%3A40,+Eldivan,+%C3%87ank%C4%B1r%C4%B1',
  osmFullMapUrl: 'https://www.openstreetmap.org/#map=13/40.5750/33.5250',
  // Hava durumu için kullanılan nokta (Eldivan zirve hattı)
  weatherCoords: { latitude: 40.6034, longitude: 33.514 }
};

export const MAP_LOCATIONS = [
  {
    id: 'zirve',
    label: 'Zirve',
    title: 'Eldivan Zirve',
    subtitle: '1.420m Rakım · Tırmanış Noktası',
    coords: [40.6034, 33.514],
    zoom: 14,
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.6034,33.5140'
  },
  {
    id: 'merkez',
    label: 'Merkez',
    title: 'Eldivan Kulüp Binası',
    subtitle: 'Topraklık Mah. Cevher Dudayev Cad. No:40',
    coords: [40.57, 33.525],
    zoom: 14,
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Toprakl%C4%B1k+Mah.+Cevher+Dudayev+Cad.+No%3A40,+Eldivan,+%C3%87ank%C4%B1r%C4%B1'
  },
  {
    id: 'baraj',
    label: 'Baraj',
    title: 'Koyunbaba Barajı',
    subtitle: 'Enduro & Kamp Alanı',
    coords: [40.542, 33.551],
    zoom: 14,
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.5420,33.5510'
  }
];

export const CARDS_DATA = [
  {
    id: 'zirve',
    badge: 'ZİRVE & TIRMANIŞ',
    tag: '1.420M ZİRVE',
    title: 'Zirve Tırmanışı',
    detailTitle: 'Eldivan Zirve Tırmanışı',
    desc: 'Eldivan Dağı ve yaylalarında çam ormanları eşliğinde teknik doğa yürüyüşü rotası.',
    activityDetails: 'Sabah kulüp binasında brifing sonrası çam ormanı patikalarından 1.420m zirve hattına rehberli tırmanış gerçekleştirilir. Zirvede panoramik mola ve fotoğraf çekimi yapılır.',
    equipment: 'Bilekli yürüyüş botu, rüzgarlık, en az 1.5L su',
    meta: 'RAKIM 1.420M · MESAFE 14.2 KM · ORTA SEVİYE',
    dist: '14.2 KM',
    image: '/images/grup.jpg',
    icon: 'Mountain',
    filter: 'zirve'
  },
  {
    id: 'enduro',
    badge: 'ENDURO MOTOSİKLET',
    tag: 'TOPRAK PARKUR',
    title: 'Enduro Rotaları',
    detailTitle: 'Enduro & Toprak Parkur',
    desc: 'Koyunbaba Barajı ve dik yamaçlarda yüksek adrenalinli motosiklet sürüşü.',
    activityDetails: 'Koyunbaba Barajı çevresindeki toprak yollar, dere yatakları ve dik tırmanış etaplarında öncü ve artçı ekip eşliğinde grup enduro sürüşü yapılır.',
    equipment: 'Kask, enduro botu, dizlik/dirseklik ve tam koruma ekipmanı',
    meta: 'MESAFE 18.5 KM · ZORLU ZEMİN · KORUMALI EKİPMAN',
    dist: '18.5 KM',
    image: '/images/enduro.jpg',
    icon: 'Bike',
    filter: 'enduro'
  },
  {
    id: 'kamp',
    badge: 'YAYLA KAMPI',
    tag: 'YILDIZLI GECE',
    title: 'Yayla Kampı',
    detailTitle: 'Yayla Kampı & Çadır',
    desc: 'Yıldızların altında, doğanın kalbinde huzurlu çadır ve karavan kampı deneyimi.',
    activityDetails: 'Eldivan Yaylası kamp sahasında çadır kurulumu, kontrollü kamp ateşi, doğada gece gökyüzü gözlemi ve sabah yayla yürüyüşü etkinlikleri düzenlenir.',
    equipment: 'Çadır, uyku tulumu, mat, kafa feneri ve sıcak tutan katmanlı giysi',
    meta: 'ELDİVAN YAYLASI · SU KAYNAĞI MEVCUT · AİLE UYGUN',
    dist: 'YAYLA HATTI',
    image: '/images/kamp.jpg',
    icon: 'Tent',
    filter: 'kamp'
  },
  {
    id: 'bisiklet',
    badge: 'DAĞ BİSİKLETİ',
    tag: 'ORMAN PARKURU',
    title: 'Dağ Bisikleti',
    detailTitle: 'Rehberli Dağ Bisikleti',
    desc: 'Eldivan köy parkurları ve orman içi single-track parkurlarında bisiklet turları.',
    activityDetails: 'Orman içi akıcı toprak patikalarda 380m tırmanış ve teknik iniş etaplarını kapsayan tempolu dağ bisikleti sürüşü ve teknik destek molaları yapılır.',
    equipment: 'Bakımlı MTB bisiklet, kask, eldiven, yedek iç lastik ve pompa',
    meta: 'MESAFE 16.0 KM · İNİŞ / ÇIKIŞ 380M · KASK ZORUNLU',
    dist: '16.0 KM',
    image: '/images/bisiklet.jpg',
    icon: 'Activity',
    filter: 'bisiklet'
  },
  {
    id: 'offroad',
    badge: 'OFF-ROAD 4X4',
    tag: 'ZORLU ARAZİ',
    title: 'Off-Road 4x4',
    detailTitle: 'Off-Road & ATV/UTV',
    desc: 'Zorlu arazi şartlarında, dere yatakları ve tepelerde 4x4 arazi aracı keşifleri.',
    activityDetails: 'Taşlık dere geçişleri, çamurlu orman yolları ve dik yamaçlarda telsiz bağlantılı konvoy sürüşü ile arazi keşif etkinliği gerçekleştirilir.',
    equipment: '4x4 arazi aracı veya ATV/UTV, çekme halatı ve arazi lastiği',
    meta: 'ÇAMUR / TAŞLIK ZEMİN · VİNÇ & KURTARMA EKİBİ',
    dist: 'KOYUNBABA',
    image: '/images/offroad.jpg',
    icon: 'Compass',
    filter: 'offroad'
  },
  {
    id: 'all',
    badge: 'PARKUR & ORYANTİRİNG',
    tag: 'ORYANTİRİNG',
    title: 'Doğa Parkuru',
    detailTitle: 'Doğa Parkuru & Oryantiring',
    desc: 'Harita ve pusula ile hedefleri bulma, açık hava oryantiring ve takım etkinlikleri.',
    activityDetails: 'Katılımcılar harita ve pusula kullanarak orman içine yerleştirilmiş 18 kontrol noktasını en kısa sürede bulmaya yönelik takım ve bireysel parkur yarışına katılır.',
    equipment: 'Rahat spor kıyafet, arazi ayakkabısı (harita ve pusula kulüpçe verilir)',
    meta: 'HEDEF NOKTALARI: 18 · TÜM YAŞ GRUPLARI İÇİN UYGUN',
    dist: '18 NOKTA',
    image: '/images/oryantiring.jpg',
    icon: 'MapPin',
    filter: 'oryantiring'
  }
];

export const ROUTES_DATA = [
  {
    id: 1,
    title: 'Eldivan Zirve Patikası',
    category: 'zirve',
    categoryName: 'ZİRVE & TIRMANIŞ',
    distance: '14.2 km',
    duration: '4.5 Saat',
    elevation: '+680m',
    difficulty: 'Orta - Zor',
    image: '/images/hero.jpg',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.6034,33.5140',
    desc: 'Karasenir dağ eteklerinden başlayarak çam ormanları boyunca uzanan panoramik vadi manzaralı tırmanış rotası.'
  },
  {
    id: 2,
    title: 'Koyunbaba Barajı Enduro Parkuru',
    category: 'enduro',
    categoryName: 'ENDURO',
    distance: '18.5 km',
    duration: '2.5 Saat',
    elevation: '+420m',
    difficulty: 'İleri Seviye',
    image: '/images/enduro.jpg',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.5420,33.5510',
    desc: 'Engebeli toprak zemin, keskin virajlar ve çamur geçişleriyle motosiklet tutkunları için özel belirlenmiş hat.'
  },
  {
    id: 3,
    title: 'Yayla Çamlığı Kamp Sahası',
    category: 'kamp',
    categoryName: 'KAMP & KARAVAN',
    distance: 'Sabit İstasyon',
    duration: '24+ Saat',
    elevation: '1.240m',
    difficulty: 'Kolay / Aile',
    image: '/images/kamp.jpg',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.5850,33.5190',
    desc: 'Doğal kaynak suyu, güvenli ateş çukurları ve geniş çadır alanlarıyla gökyüzü gözlemi için ideal kamp noktası.'
  },
  {
    id: 4,
    title: 'Eldivan Dağ Bisikleti Trail',
    category: 'bisiklet',
    categoryName: 'BİSİKLET',
    distance: '16.0 km',
    duration: '1.5 Saat',
    elevation: '+380m',
    difficulty: 'Orta',
    image: '/images/bisiklet.jpg',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.5700,33.5250',
    desc: 'Orman içi akıcı inişler (singletrack) ve teknik toprak tırmanış etapları içeren yüksek tempolu bisiklet parkuru.'
  },
  {
    id: 5,
    title: 'Kanyon Geçişi 4x4 Off-Road',
    category: 'offroad',
    categoryName: 'OFF-ROAD',
    distance: '22.0 km',
    duration: '3.0 Saat',
    elevation: '+520m',
    difficulty: 'Zorlu Zemin',
    image: '/images/offroad.jpg',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.5550,33.5400',
    desc: 'Yüksek 4x4 araçlar ve ATV turları için taşlık dere yatakları ve dik çakıllı tırmanış etapları.'
  },
  {
    id: 6,
    title: 'Kirazlı Dere Oryantiring Rotası',
    category: 'oryantiring',
    categoryName: 'ORYANTİRİNG',
    distance: '8.5 km',
    duration: '2.0 Saat',
    elevation: '+210m',
    difficulty: 'Başlangıç',
    image: '/images/oryantiring.jpg',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.5910,33.5180',
    desc: 'Harita ve pusula ile 18 kontrol noktasını keşfetmeye dayalı doğa sporu ve takım oyunu rotası.'
  }
];

export const PACKAGES_DATA = [
  {
    id: 'kurumsal-ekip',
    badge: 'KURUMSAL & TAKIM',
    title: 'Doğada Güçlenen Ekipler',
    desc: 'Takım ruhunu pekiştiren liderlik, güven, oryantiring ve outdoor macera programı.',
    priceLabel: 'BAŞLANGIÇ',
    price: '₺1.000',
    image: '/images/grup.jpg'
  },
  {
    id: 'aile-doga',
    badge: 'AİLE & ÇOCUK',
    title: 'Oyun Alanımız Doğa Olsun',
    desc: 'Aileler ve çocuklar için güvenli kamp, doğa keşfi ve açık hava atölyeleri.',
    priceLabel: 'PAKET',
    price: '₺750',
    image: '/images/kamp-cadir.jpg'
  }
];

// startsAt geçmişte kalan etkinlikler uygulamada otomatik gizlenir.
export const EVENTS_DATA = [
  {
    id: 1,
    title: 'Eldivan Dağı Bahar Zirve Tırmanışı',
    desc: 'Rehber eşliğinde Eldivan Dağı zirvesine bahar yürüyüşü ve panoramik manzara molası.',
    startsAt: '2026-05-18T08:30:00+03:00',
    date: '18 MAYIS 2026 · CUMARTESİ',
    time: '08:30',
    location: 'Eldivan Merkez Toplanma Alanı',
    quota: 'Kalan: 8 Kişi',
    badge: 'YAKLAŞIYOR',
    image: '/images/yuruyus.jpg',
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Eldivan+Da%C4%9F%C4%B1+Bahar+Zirve+T%C4%B1rman%C4%B1%C5%9F%C4%B1&dates=20260518T053000Z/20260518T110000Z&location=Eldivan,+%C3%87ank%C4%B1r%C4%B1&details=Eldivan+Outdoor+rehberli+zirve+t%C4%B1rman%C4%B1%C5%9F%C4%B1.'
  },
  {
    id: 2,
    title: 'Gece Gökyüzü & Yayla Kampı',
    desc: 'Yıldızların altında, doğanın kalbinde huzurlu çadır kampı, teleskop ve ateş başı deneyimi.',
    startsAt: '2026-05-25T14:00:00+03:00',
    endsAt: '2026-05-26T15:00:00+03:00',
    date: '25-26 MAYIS 2026 · HAFTASONU',
    time: '14:00',
    location: 'Eldivan Yaylası Kamp Alanı',
    quota: 'Kalan: 4 Çadır',
    badge: 'KAYIT AÇIK',
    image: '/images/kamp.jpg',
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Gece+G%C3%B6ky%C3%BCz%C3%BC+%26+Yayla+Kamp%C4%B1&dates=20260525T110000Z/20260526T120000Z&location=Eldivan+Yaylas%C4%B1,+%C3%87ank%C4%B1r%C4%B1&details=Eldivan+Outdoor+hafta+sonu+yayla+kamp%C4%B1.'
  },
  {
    id: 3,
    title: 'Koyunbaba Enduro & Toprak Sürüşü',
    desc: 'Zorlu toprak etaplar, çamur geçişleri ve akıcı patikalarda rehberli enduro sürüşü.',
    startsAt: '2026-06-02T10:00:00+03:00',
    date: '02 HAZİRAN 2026 · PAZAR',
    time: '10:00',
    location: 'Koyunbaba Barajı Parkuru',
    quota: 'Kalan: 6 Motor',
    badge: 'LİMİTLİ',
    image: '/images/enduro.jpg',
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Koyunbaba+Enduro+%26+Toprak+S%C3%BCr%C3%BC%C5%9F%C3%BC&dates=20260602T070000Z/20260602T130000Z&location=Koyunbaba+Baraj%C4%B1,+%C3%87ank%C4%B1r%C4%B1&details=Eldivan+Outdoor+enduro+ve+toprak+s%C3%BCr%C3%BC%C5%9F%C3%BC.'
  }
];
