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

      {/* Rota Kartları Listesi (Görselli Paket / Deneyim Tasarım Formatında) */}
      <div className="space-y-4">
        {filteredRoutes.map((route) => (
          <article
            key={route.id}
            className="relative rounded-2xl overflow-hidden shadow-sm border border-light-outline-variant/80 min-h-[265px] flex flex-col justify-end group hover:shadow-md transition-shadow"
          >
            {/* Tam Alan Arka Plan Görseli */}
            {route.image && (
              <img
                src={route.image}
                alt={route.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent" />

            {/* Sol Üst Kategori Rozeti */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-forest text-white backdrop-blur-md text-[10px] font-mono-tech uppercase font-bold tracking-wider shadow-sm">
                {route.categoryName}
              </span>
            </div>

            {/* Sağ Üst Puan ve Zorluk Rozeti */}
            <div className="absolute top-3.5 right-3.5 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-ink backdrop-blur-md text-[10px] font-mono-tech font-bold shadow-sm border border-black/5">
                <Star className="w-3 h-3 fill-accent text-accent" />
                <span>{route.rating}</span>
                <span className="text-muted/70 font-normal">· {route.difficulty}</span>
              </span>
            </div>

            {/* Kart İçerik Gövdesi */}
            <div className="relative z-10 p-5 pt-8">
              <h3 className="font-headline font-extrabold text-ink text-[18px] leading-snug">
                {route.title}
              </h3>
              <p className="text-muted text-[12.5px] leading-relaxed mt-1 line-clamp-2">
                {route.desc}
              </p>

              {/* Parkur Metrikleri (Mesafe, Süre, İrtifa) */}
              <div className="mt-3 space-y-1 font-mono-tech text-[11px] text-muted">
                <div className="flex items-center gap-1.5 text-ink font-semibold">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>
                    {route.distance} · {route.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-muted" />
                  <span>{route.elevation} İrtifa · Çankırı Eldivan Parkuru</span>
                </div>
              </div>

              {/* Alt İşlem Butonları (Yol Tarifi + Rehber Talep Et) */}
              <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-black/10 gap-2">
                <a
                  href={route.mapsUrl || CLUB_CONFIG.meetingPointMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand-dark text-ink font-mono-tech text-[10px] font-bold hover:bg-ink hover:text-white active:scale-95 transition-all"
                  title="Başlangıç Noktasına Yol Tarifi Al"
                >
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>Yol Tarifi</span>
                </a>

                <a
                  href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20${encodeURIComponent(route.title)}%20hakkinda%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-white font-mono-tech text-[11px] font-bold hover:bg-accent active:scale-95 transition-all shadow-sm"
                >
                  <span>REHBER TALEP ET</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
