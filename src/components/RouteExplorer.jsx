import React, { useState, useEffect } from 'react';
import { Star, ArrowUpRight, MapPin, Clock, Mountain, X, Compass, Route as RouteIcon, MessageCircle } from 'lucide-react';
import { ROUTES_DATA, CLUB_CONFIG } from '../data/mockData';

const FILTER_CHIPS = [
  { id: 'all', label: 'TÜMÜ' },
  { id: 'zirve', label: 'ZİRVE' },
  { id: 'enduro', label: 'ENDURO' },
  { id: 'kamp', label: 'KAMP' },
  { id: 'bisiklet', label: 'BİSİKLET' },
  { id: 'offroad', label: 'OFF-ROAD' }
];

export default function RouteExplorer({ activeFilter = 'all', onFilterChange }) {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const filter = activeFilter || 'all';

  const handleChipClick = (id) => {
    onFilterChange?.(id);
  };

  const filteredRoutes =
    filter === 'all'
      ? ROUTES_DATA
      : ROUTES_DATA.filter((r) => r.category === filter);

  // Modal açıkken klavye ESC tuşu dinleyicisi & body scroll kilidi
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedRoute) {
        setSelectedRoute(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (selectedRoute) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedRoute]);

  return (
    <section
      id="rotalar"
      tabIndex={-1}
      className="px-5 py-6 bg-sand-light/60 border-t border-light-outline-variant/60 outline-none scroll-mt-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-headline text-[22px] font-black text-ink tracking-tight">
          Rotalar &amp; Parkurlar
        </h2>
        <span className="font-mono-tech text-[10px] font-bold text-accent px-2 py-0.5 rounded bg-accent/10">
          {filteredRoutes.length} PARKUR
        </span>
      </div>
      <p className="text-[12px] text-muted mb-4">
        Eldivan'ın keşfedilmiş resmi dağ, toprak ve doğa rotaları.
      </p>

      {/* Filtre Çipleri (Snap-Scroll Destekli) */}
      <div className="flex items-center gap-2 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none mb-4 -mx-1 px-1">
        {FILTER_CHIPS.map((chip) => {
          const isActive = filter === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => handleChipClick(chip.id)}
              className={`snap-start flex-shrink-0 px-3.5 py-1.5 rounded-full font-mono-tech text-[11px] font-bold transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-sand-dark text-muted hover:text-ink border border-light-outline-variant/60'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Rota Kartları Listesi: Sadece Fotoğraf ve Ana Başlık */}
      <div className="space-y-3.5">
        {filteredRoutes.map((route) => (
          <article
            key={route.id}
            onClick={() => setSelectedRoute(route)}
            className="relative rounded-2xl overflow-hidden shadow-sm border border-light-outline-variant/80 h-[210px] flex flex-col justify-end group hover:shadow-md transition-all cursor-pointer active:scale-[0.99] select-none"
            title={`${route.title} detaylarını açmak için dokunun`}
          >
            {/* Sadece Fotoğraf */}
            {route.image && (
              <img
                src={route.image}
                alt={route.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

            {/* Sadece Ana Başlık ve Dokunma İpucu */}
            <div className="relative z-10 p-5 flex items-end justify-between gap-3">
              <h3 className="font-headline font-black text-white text-[19px] leading-tight drop-shadow-sm">
                {route.title}
              </h3>
              <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-mono-tech font-bold uppercase tracking-wider border border-white/20 group-hover:bg-accent group-hover:border-accent transition-all shadow-sm">
                <span>DETAY</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Rota Detay Penceresi (Modal - Uygulamanın Sand & Forest Renk Paleti ile Uyumlu) */}
      {selectedRoute && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedRoute.title} Detayları`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 font-headline animate-in fade-in duration-200"
        >
          {/* Karartılmış Arka Plan */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setSelectedRoute(null)}
          />

          {/* Uygulama Temasıyla Uyumlu Rota Detay Kartı */}
          <div
            className="relative w-full max-w-[400px] max-h-[90vh] bg-white text-ink rounded-3xl shadow-2xl border border-light-outline-variant flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Üst Çubuk */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-light-outline-variant/80 bg-sand-light">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-forest text-white font-mono-tech text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                  {selectedRoute.categoryName || selectedRoute.category}
                </span>
                <div className="flex items-center gap-1 font-mono-tech text-[11px] text-accent font-bold">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  <span>{selectedRoute.rating}</span>
                  <span className="text-muted font-normal">· {selectedRoute.difficulty}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRoute(null)}
                aria-label="Kapat"
                className="w-8 h-8 rounded-full bg-sand-dark hover:bg-light-outline-variant text-ink flex items-center justify-center active:scale-95 transition-all border border-light-outline-variant/60 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Kaydırılabilir Gövdesi */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Rota Fotoğrafı & Başlık */}
              <div className="relative rounded-2xl overflow-hidden h-[185px] border border-light-outline-variant/80 shadow-sm">
                <img
                  src={selectedRoute.image}
                  alt={selectedRoute.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <div className="text-[10px] font-mono-tech uppercase font-bold text-[#E8B07A] tracking-wider">
                    ELDİVAN DOĞA &amp; MOTOR PARKURU
                  </div>
                  <h3 className="font-headline font-black text-[20px] leading-tight mt-0.5">
                    {selectedRoute.title}
                  </h3>
                </div>
              </div>

              {/* Rota Açıklaması */}
              <div className="p-4 rounded-2xl bg-sand-light border border-light-outline-variant/80 text-[13px] text-ink-muted leading-relaxed font-body">
                {selectedRoute.desc}
              </div>

              {/* 4'lü Telemetri Metrikleri */}
              <div className="grid grid-cols-2 gap-2.5 font-mono-tech text-xs">
                <div className="p-3.5 rounded-xl bg-sand-light border border-light-outline-variant/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-accent font-bold text-[10.5px] uppercase">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Mesafe &amp; Süre</span>
                  </div>
                  <div className="font-headline font-black text-ink text-[15px] mt-1">
                    {selectedRoute.distance}
                  </div>
                  <div className="text-[11px] text-muted font-medium mt-0.5">
                    Tahmini: {selectedRoute.duration}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-sand-light border border-light-outline-variant/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-accent font-bold text-[10.5px] uppercase">
                    <Mountain className="w-3.5 h-3.5" />
                    <span>İrtifa &amp; Zorluk</span>
                  </div>
                  <div className="font-headline font-black text-ink text-[15px] mt-1">
                    {selectedRoute.elevation}
                  </div>
                  <div className="text-[11px] text-muted font-medium mt-0.5">
                    Zorluk: {selectedRoute.difficulty}
                  </div>
                </div>
              </div>

              {/* Rota Başlangıç Noktası Notu */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-forest/5 border border-forest/15 text-[12px] text-forest font-mono-tech">
                <Compass className="w-4 h-4 text-forest flex-shrink-0" />
                <span>Çankırı Eldivan · GPS &amp; Saha Koordinatları Onaylı</span>
              </div>
            </div>

            {/* Modal Alt Butonları (Uygulama Renkleri) */}
            <div className="p-4 border-t border-light-outline-variant/80 bg-sand-light flex items-center justify-between gap-2.5">
              <a
                href={selectedRoute.mapsUrl || CLUB_CONFIG.meetingPointMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-xl bg-sand-dark hover:bg-light-outline-variant text-ink border border-light-outline-variant font-mono-tech text-xs font-bold active:scale-95 transition-all no-underline shadow-xs cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-ink" />
                <span>Yol Tarifi Al</span>
              </a>

              <a
                href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20${encodeURIComponent(selectedRoute.title)}%20rotasi%20hakkinda%20rehberlik%20ve%20detayli%20bilgi%20almak%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-mono-tech text-xs font-bold active:scale-95 transition-all shadow-md no-underline cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Rehber Talep Et</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
