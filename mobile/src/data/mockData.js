export const IMAGES = {
  appIcon: require('../../assets/images/app-icon.png'),
  logo: require('../../assets/images/logo.jpg'),
  osman: require('../../assets/images/osman.jpg'),
  ataturk: require('../../assets/images/ataturk-gozler.jpg'),
  grup: require('../../assets/images/grup.jpg'),
  enduro: require('../../assets/images/enduro.jpg'),
  kamp: require('../../assets/images/kamp.jpg'),
  kampCadir: require('../../assets/images/kamp-cadir.jpg'),
  bisiklet: require('../../assets/images/bisiklet.jpg'),
  offroad: require('../../assets/images/offroad.jpg'),
  oryantiring: require('../../assets/images/oryantiring.jpg'),
  hero: require('../../assets/images/hero.jpg'),
  yuruyus: require('../../assets/images/yuruyus.jpg'),
  motoIcon: require('../../assets/images/moto-icon.png')
};

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
  osmFullMapUrl: 'https://www.openstreetmap.org/#map=13/40.5750/33.5250'
};

export const WEATHER_METRICS = [
  {
    id: 'temp',
    label: 'SICAKLIK',
    value: '12°C',
    sub: 'HİS: 9°C',
    icon: 'thermometer-outline'
  },
  {
    id: 'elevation',
    label: 'RAKIM',
    value: '1,420M',
    sub: 'ZİRVE',
    icon: 'trail-sign-outline'
  },
  {
    id: 'humidity',
    label: 'NEM',
    value: '64%',
    sub: '18 KM/S',
    icon: 'speedometer-outline'
  }
];

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
    meta: 'RAKIM 1.420M · MESAFE 14.2 KM · ORTA SEVİYE',
    dist: '14.2 KM',
    image: IMAGES.grup,
    icon: 'terrain',
    filter: 'zirve'
  },
  {
    id: 'enduro',
    badge: 'ENDURO MOTOSİKLET',
    tag: 'TOPRAK PARKUR',
    title: 'Enduro Rotaları',
    detailTitle: 'Enduro & Toprak Parkur',
    desc: 'Koyunbaba Barajı ve dik yamaçlarda yüksek adrenalinli motosiklet sürüşü.',
    meta: 'MESAFE 18.5 KM · ZORLU ZEMİN · KORUMALI EKİPMAN',
    dist: '18.5 KM',
    image: IMAGES.enduro,
    icon: 'motorbike',
    filter: 'enduro'
  },
  {
    id: 'kamp',
    badge: 'YAYLA KAMPI',
    tag: 'YILDIZLI GECE',
    title: 'Yayla Kampı',
    detailTitle: 'Yayla Kampı & Çadır',
    desc: 'Yıldızların altında, doğanın kalbinde huzurlu çadır ve karavan kampı deneyimi.',
    meta: 'ELDİVAN YAYLASI · SU KAYNAĞI MEVCUT · AİLE UYGUN',
    dist: 'YAYLA HATTI',
    image: IMAGES.kamp,
    icon: 'tent',
    filter: 'kamp'
  },
  {
    id: 'bisiklet',
    badge: 'DAĞ BİSİKLETİ',
    tag: 'ORMAN PARKURU',
    title: 'Dağ Bisikleti',
    detailTitle: 'Rehberli Dağ Bisikleti',
    desc: 'Eldivan köy parkurları ve orman içi single-track parkurlarında bisiklet turları.',
    meta: 'MESAFE 16.0 KM · İNİŞ / ÇIKIŞ 380M · KASK ZORUNLU',
    dist: '16.0 KM',
    image: IMAGES.bisiklet,
    icon: 'bike',
    filter: 'bisiklet'
  },
  {
    id: 'offroad',
    badge: 'OFF-ROAD 4X4',
    tag: 'ZORLU ARAZİ',
    title: 'Off-Road 4x4',
    detailTitle: 'Off-Road & ATV/UTV',
    desc: 'Zorlu arazi şartlarında, dere yatakları ve tepelerde 4x4 arazi aracı keşifleri.',
    meta: 'ÇAMUR / TAŞLIK ZEMİN · VİNÇ & KURTARMA EKİBİ',
    dist: 'KOYUNBABA',
    image: IMAGES.offroad,
    icon: 'compass',
    filter: 'offroad'
  },
  {
    id: 'all',
    badge: 'PARKUR & ORYANTİRİNG',
    tag: 'ORYANTİRİNG',
    title: 'Doğa Parkuru',
    detailTitle: 'Doğa Parkuru & Oryantiring',
    desc: 'Harita ve pusula ile hedefleri bulma, açık hava oryantiring ve takım etkinlikleri.',
    meta: 'HEDEF NOKTALARI: 18 · TÜM YAŞ GRUPLARI İÇİN UYGUN',
    dist: '18 NOKTA',
    image: IMAGES.oryantiring,
    icon: 'map-marker',
    filter: 'all'
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
    rating: '4.9',
    image: IMAGES.hero,
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
    rating: '4.8',
    image: IMAGES.enduro,
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
    rating: '5.0',
    image: IMAGES.kamp,
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
    rating: '4.7',
    image: IMAGES.bisiklet,
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
    rating: '4.9',
    image: IMAGES.offroad,
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.5550,33.5400',
    desc: 'Yüksek 4x4 araçlar ve ATV turları için taşlık dere yatakları ve dik çakıllı tırmanış etapları.'
  },
  {
    id: 6,
    title: 'Kirazlı Dere Oryantiring Rotası',
    category: 'zirve',
    categoryName: 'ORYANTİRİNG',
    distance: '8.5 km',
    duration: '2.0 Saat',
    elevation: '+210m',
    difficulty: 'Başlangıç',
    rating: '4.6',
    image: IMAGES.oryantiring,
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
    image: IMAGES.grup
  },
  {
    id: 'aile-doga',
    badge: 'AİLE & ÇOCUK',
    title: 'Oyun Alanımız Doğa Olsun',
    desc: 'Aileler ve çocuklar için güvenli kamp, doğa keşfi ve açık hava atölyeleri.',
    priceLabel: 'PAKET',
    price: '₺750',
    image: IMAGES.kampCadir
  }
];

export const EVENTS_DATA = [
  {
    id: 1,
    title: 'Eldivan Dağı Bahar Zirve Tırmanışı',
    desc: 'Rehber eşliğinde Eldivan Dağı zirvesine bahar yürüyüşü ve panoramik manzara molası.',
    date: '18 MAYIS 2026 · CUMARTESİ',
    time: '08:30',
    location: 'Eldivan Merkez Toplanma Alanı',
    quota: 'Kalan: 8 Kişi',
    badge: 'YAKLAŞIYOR',
    image: IMAGES.yuruyus,
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Eldivan+Da%C4%9F%C4%B1+Bahar+Zirve+T%C4%B1rman%C4%B1%C5%9F%C4%B1&dates=20260518T053000Z/20260518T110000Z&location=Eldivan,+%C3%87ank%C4%B1r%C4%B1&details=Eldivan+Outdoor+rehberli+zirve+t%C4%B1rman%C4%B1%C5%9F%C4%B1.'
  },
  {
    id: 2,
    title: 'Gece Gökyüzü & Yayla Kampı',
    desc: 'Yıldızların altında, doğanın kalbinde huzurlu çadır kampı, teleskop ve ateş başı deneyimi.',
    date: '25-26 MAYIS 2026 · HAFTASONU',
    time: '14:00',
    location: 'Eldivan Yaylası Kamp Alanı',
    quota: 'Kalan: 4 Çadır',
    badge: 'KAYIT AÇIK',
    image: IMAGES.kamp,
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Gece+G%C3%B6ky%C3%BCz%C3%BC+%26+Yayla+Kamp%C4%B1&dates=20260525T110000Z/20260526T120000Z&location=Eldivan+Yaylas%C4%B1,+%C3%87ank%C4%B1r%C4%B1&details=Eldivan+Outdoor+hafta+sonu+yayla+kamp%C4%B1.'
  },
  {
    id: 3,
    title: 'Koyunbaba Enduro & Toprak Sürüşü',
    desc: 'Zorlu toprak etaplar, çamur geçişleri ve akıcı patikalarda rehberli enduro sürüşü.',
    date: '02 HAZİRAN 2026 · PAZAR',
    time: '10:00',
    location: 'Koyunbaba Barajı Parkuru',
    quota: 'Kalan: 6 Motor',
    badge: 'LİMİTLİ',
    image: IMAGES.enduro,
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Koyunbaba+Enduro+%26+Toprak+S%C3%BCr%C3%BC%C5%9F%C3%BC&dates=20260602T070000Z/20260602T130000Z&location=Koyunbaba+Baraj%C4%B1,+%C3%87ank%C4%B1r%C4%B1&details=Eldivan+Outdoor+enduro+ve+toprak+s%C3%BCr%C3%BC%C5%9F%C3%BC.'
  }
];
