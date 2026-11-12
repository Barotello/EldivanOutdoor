import React from 'react';
import { Star, ArrowUpRight, MapPin, Clock, Mountain } from 'lucide-react';
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
  const filter = activeFilter || 'all';

  const handleChipClick = (id) => {
    onFilterChange?.(id);
  };

  const filteredRoutes =
    filter === 'all'
      ? ROUTES_DATA
      : ROUTES_DATA.filter((r) => r.category === filter);

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

      {/* Rota Kartları Listesi (Etkinlik Kutucuk Formatında) */}
      <div className="space-y-3">
        {filteredRoutes.map((route) => (
          <div
            key={route.id}
            className="p-4 rounded-2xl bg-white border border-light-outline-variant/80 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Üst Rozet & Zorluk / Puan */}
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full bg-forest text-white font-mono-tech text-[9px] font-bold uppercase">
                {route.categoryName}
              </span>
              <div className="flex items-center gap-1 font-mono-tech text-[10px] text-accent font-bold">
                <Star className="w-3 h-3 fill-accent text-accent" />
                <span>{route.rating}</span>
                <span className="text-muted/70 font-normal">· {route.difficulty}</span>
              </div>
            </div>

            {/* Başlık, Açıklama ve Görsel Thumbnail */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-headline font-bold text-[16px] text-ink leading-snug">
                  {route.title}
                </h4>
                <p className="text-[12px] text-muted leading-relaxed mt-1 line-clamp-2">
                  {route.desc}
                </p>
              </div>
              {route.image && (
                <img
                  src={route.image}
                  alt={route.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-black/5"
                  loading="lazy"
                />
              )}
            </div>

            {/* Rota Detay Metrikleri */}
            <div className="mt-2.5 space-y-1.5 font-mono-tech text-[11px] text-muted">
              <div className="flex items-center gap-1.5 text-ink font-semibold">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>{route.distance} · {route.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-muted" />
                <span>{route.elevation} İrtifa · Çankırı Eldivan Parkuru</span>
              </div>
            </div>

            {/* Alt İşlem Butonları (Yol Tarifi + Rehber Talep Et) */}
            <div className="mt-3.5 pt-3 border-t border-light-outline-variant/60 flex items-center justify-between gap-2">
              <a
                href={route.mapsUrl || CLUB_CONFIG.meetingPointMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-sand-dark text-ink font-mono-tech text-[10px] font-bold hover:bg-ink hover:text-white active:scale-95 transition-all"
                title="Başlangıç Noktasına Yol Tarifi Al"
              >
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Yol Tarifi</span>
              </a>

              <a
                href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20${encodeURIComponent(route.title)}%20hakkinda%20bilgi%20almak%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-ink text-white font-mono-tech text-[11px] font-bold hover:bg-accent active:scale-95 transition-all"
              >
                <span>Rehber Talep Et</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
