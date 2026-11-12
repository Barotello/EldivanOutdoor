export const CARDS_DATA = [
  {
    id: 'zirve',
    badge: '01 / ZİRVE & TIRMANIŞ',
    tag: '1.420M ZİRVE',
    title: 'Zirve Tırmanışı',
    detailTitle: 'Eldivan Zirve Tırmanışı',
    desc: 'Eldivan Dağı ve yaylalarında çam ormanları eşliğinde teknik doğa yürüyüşü rotası.',
    meta: 'RAKIM 1.420M · MESAFE 14.2 KM · ORTA SEVİYE',
    dist: '14.2 KM',
    image: '/images/grup.jpg',
    icon: 'Mountain',
    filter: 'zirve'
  },
  {
    id: 'enduro',
    badge: '02 / ENDURO MOTOSİKLET',
    tag: 'TOPRAK PARKUR',
    title: 'Enduro Rotaları',
    detailTitle: 'Enduro & Toprak Parkur',
    desc: 'Koyunbaba Barajı ve dik yamaçlarda yüksek adrenalinli motosiklet sürüşü.',
    meta: 'MESAFE 18.5 KM · ZORLU ZEMİN · KORUMALI EKİPMAN',
    dist: '18.5 KM',
    image: '/images/enduro.jpg',
    icon: 'Bike',
    filter: 'enduro'
  },
  {
    id: 'kamp',
    badge: '03 / YAYLA KAMPI',
    tag: 'YILDIZLI GECE',
    title: 'Yayla Kampı',
    detailTitle: 'Yayla Kampı & Çadır',
    desc: 'Yıldızların altında, doğanın kalbinde huzurlu çadır ve karavan kampı deneyimi.',
    meta: 'ELDİVAN YAYLASI · SU KAYNAĞI MEVCUT · AİLE UYGUN',
    dist: 'YAYLA HATTI',
    image: '/images/kamp.jpg',
    icon: 'Tent',
    filter: 'kamp'
  },
  {
    id: 'bisiklet',
    badge: '04 / DAĞ BİSİKLETİ',
    tag: 'ORMAN PARKURU',
    title: 'Dağ Bisikleti',
    detailTitle: 'Rehberli Dağ Bisikleti',
    desc: 'Eldivan köy parkurları ve orman içi single-track parkurlarında bisiklet turları.',
    meta: 'MESAFE 16.0 KM · İNİŞ / ÇIKIŞ 380M · KASK ZORUNLU',
    dist: '16.0 KM',
    image: '/images/bisiklet.jpg',
    icon: 'Activity',
    filter: 'bisiklet'
  },
  {
    id: 'offroad',
    badge: '05 / OFF-ROAD 4X4',
    tag: 'ZORLU ARAZİ',
    title: 'Off-Road 4x4',
    detailTitle: 'Off-Road & ATV/UTV',
    desc: 'Zorlu arazi şartlarında, dere yatakları ve tepelerde 4x4 arazi aracı keşifleri.',
    meta: 'ÇAMUR / TAŞLIK ZEMİN · VİNÇ & KURTARMA EKİBİ',
    dist: 'KOYUNBABA',
    image: '/images/offroad.jpg',
    icon: 'Compass',
    filter: 'offroad'
  },
  {
    id: 'all',
    badge: '06 / PARKUR & ORYANTİRİNG',
    tag: 'ORYANTİRİNG',
    title: 'Doğa Parkuru',
    detailTitle: 'Doğa Parkuru & Oryantiring',
    desc: 'Harita ve pusula ile hedefleri bulma, açık hava oryantiring ve takım etkinlikleri.',
    meta: 'HEDEF NOKTALARI: 18 · TÜM YAŞ GRUPLARI İÇİN UYGUN',
    dist: '18 NOKTA',
    image: '/images/oryantiring.jpg',
    icon: 'MapPin',
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
    image: '/images/hero.jpg',
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
    image: '/images/enduro.jpg',
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
    image: '/images/kamp.jpg',
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
    image: '/images/bisiklet.jpg',
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
    image: '/images/offroad.jpg',
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
    image: '/images/oryantiring.jpg',
    desc: 'Harita ve pusula ile 18 kontrol noktasını keşfetmeye dayalı doğa sporu ve takım oyunu rotası.'
  }
];

export const EVENTS_DATA = [
  {
    id: 1,
    title: 'Eldivan Dağı Bahar Zirve Tırmanışı',
    date: '18 MAYIS 2026 · CUMARTESİ',
    time: '08:30',
    location: 'Eldivan Merkez Toplanma Alanı',
    quota: 'Kalan: 8 Kişi',
    badge: 'YAKLAŞIYOR'
  },
  {
    id: 2,
    title: 'Gece Gökyüzü & Yayla Kampı',
    date: '25-26 MAYIS 2026 · HAFTASONU',
    time: '14:00',
    location: 'Eldivan Yaylası Kamp Alanı',
    quota: 'Kalan: 4 Çadır',
    badge: 'KAYIT AÇIK'
  },
  {
    id: 3,
    title: 'Koyunbaba Enduro & Toprak Sürüşü',
    date: '02 HAZİRAN 2026 · PAZAR',
    time: '10:00',
    location: 'Koyunbaba Barajı Parkuru',
    quota: 'Kalan: 6 Motor',
    badge: 'LİMİTLİ'
  }
];
