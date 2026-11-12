import React, { useState, useEffect } from 'react';
import { Star, ArrowUpRight, MapPin, Clock, Mountain, X, Compass } from 'lucide-react';
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
      className="px-5 py-6 bg-sand-light/60 border-t border-light-outline-variant/60 outline-none"
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
              className={`snap-start flex-shrink-0 px-3.5 py-1.5 rounded-full font-mono-tech text-[11px] font-bold transition-all active:scale-95 ${
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

      {/* Fotoğrafın Üstüne Tıklayınca Açılan Rota Detay Penceresi (Modal) */}
      {selectedRoute && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedRoute.title} Detayları`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 font-headline animate-in fade-in duration-200"
        >
          {/* Karartılmış Arka Plan */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedRoute(null)}
          />

          {/* Koyu Orman Temalı Detay Kartı */}
          <div className="relative w-full max-w-[390px] max-h-[88vh] bg-[#1F3A2E] text-[#F5F2EA] rounded-3xl shadow-2xl border border-white/15 flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            {/* Modal Üst Çubuk */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/10 bg-[#162920]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-forest text-white font-mono-tech text-[9px] font-bold uppercase border border-white/10">
                  {selectedRoute.categoryName}
                </span>
                <div className="flex items-center gap-1 font-mono-tech text-[10px] text-[#E8B07A] font-bold">
                  <Star className="w-3 h-3 fill-[#E8B07A] text-[#E8B07A]" />
                  <span>{selectedRoute.rating}</span>
                  <span className="text-white/60 font-normal">· {selectedRoute.difficulty}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRoute(null)}
                aria-label="Kapat"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F5F2EA] hover:bg-white/20 active:scale-95 transition-all border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Kaydırılabilir Gövdesi */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Rota Fotoğrafı */}
              <div className="relative rounded-2xl overflow-hidden h-[180px] border border-white/10 shadow-md">
                <img
                  src={selectedRoute.image}
                  alt={selectedRoute.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[10px] font-mono-tech uppercase font-bold text-[#E8B07A]">
                    ELDİVAN DOĞA &amp; MOTOR PARKURU
                  </div>
                  <h3 className="font-headline font-black text-[18px] leading-tight">
                    {selectedRoute.title}
                  </h3>
                </div>
              </div>

              {/* Rota Açıklaması */}
              <div className="p-3.5 rounded-2xl bg-[#14201A]/80 border border-white/10 text-xs text-[#d6e3d9] leading-relaxed">
                {selectedRoute.desc}
              </div>

              {/* 4'lü Telemetri Metrikleri */}
              <div className="grid grid-cols-2 gap-2 font-mono-tech text-xs">
                <div className="p-3 rounded-xl bg-[#14201A]/80 border border-white/10">
                  <div className="flex items-center gap-1.5 text-[#E8B07A] font-bold text-[10px] uppercase">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Mesafe / Süre</span>
                  </div>
                  <div className="font-extrabold text-white text-[13px] mt-1">
                    {selectedRoute.distance}
                  </div>
                  <div className="text-[10px] text-white/60">
                    Tahmini: {selectedRoute.duration}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#14201A]/80 border border-white/10">
                  <div className="flex items-center gap-1.5 text-[#E8B07A] font-bold text-[10px] uppercase">
                    <Mountain className="w-3.5 h-3.5" />
                    <span>İrtifa / Zorluk</span>
                  </div>
                  <div className="font-extrabold text-white text-[13px] mt-1">
                    {selectedRoute.elevation}
                  </div>
                  <div className="text-[10px] text-white/60">
                    {selectedRoute.difficulty}
                  </div>
                </div>
              </div>

              {/* Rota Başlangıç Noktası Notu */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#14201A]/60 border border-white/10 text-[11px] text-[#d6e3d9]/90 font-mono-tech">
                <Compass className="w-4 h-4 text-[#E8B07A] flex-shrink-0" />
                <span>Çankırı Eldivan · GPS destekli resmi kulüp rotası</span>
              </div>
            </div>

            {/* Modal Alt Butonları */}
            <div className="p-4 border-t border-white/10 bg-[#162920] flex items-center justify-between gap-2.5">
              <a
                href={selectedRoute.mapsUrl || CLUB_CONFIG.meetingPointMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#14201A] border border-white/15 text-[#E8B07A] hover:bg-[#2A4A39] hover:text-white font-mono-tech text-xs font-bold active:scale-95 transition-all"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Yol Tarifi Al</span>
              </a>

              <a
                href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20${encodeURIComponent(selectedRoute.title)}%20rotasi%20hakkinda%20rehberlik%20ve%20detayli%20bilgi%20almak%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#D9531E] hover:bg-[#c24615] text-white font-mono-tech text-xs font-bold active:scale-95 transition-all shadow-md"
              >
                <span>Rehber Talep Et</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
