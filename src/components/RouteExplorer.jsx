import React, { useState } from 'react';
import { Compass, Clock, Mountain, Star, ArrowUpRight } from 'lucide-react';
import { ROUTES_DATA } from '../data/mockData';

const FILTER_CHIPS = [
  { id: 'all', label: 'TÜMÜ' },
  { id: 'zirve', label: 'ZİRVE' },
  { id: 'enduro', label: 'ENDURO' },
  { id: 'kamp', label: 'KAMP' },
  { id: 'bisiklet', label: 'BİSİKLET' },
  { id: 'offroad', label: 'OFF-ROAD' }
];

export default function RouteExplorer({ activeFilter = 'all', onFilterChange }) {
  const [filter, setFilter] = useState(activeFilter);

  const handleChipClick = (id) => {
    setFilter(id);
    onFilterChange?.(id);
  };

  const filteredRoutes = filter === 'all'
    ? ROUTES_DATA
    : ROUTES_DATA.filter((r) => r.category === filter);

  return (
    <section id="rotalar" className="px-5 py-6 bg-sand-light/60 border-t border-light-outline-variant/60">
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

      {/* Filtre Çipleri */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-4 -mx-1 px-1">
        {FILTER_CHIPS.map((chip) => {
          const isActive = (filter || 'all') === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => handleChipClick(chip.id)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full font-mono-tech text-[11px] font-bold transition-all active:scale-95 ${
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

      {/* Rota Kartları Listesi */}
      <div className="space-y-4">
        {filteredRoutes.map((route) => (
          <div
            key={route.id}
            className="rounded-2xl bg-white border border-light-outline-variant/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={route.image}
                alt={route.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono-tech text-[10px] font-bold uppercase">
                  {route.categoryName}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-ink font-mono-tech text-[10px] font-bold">
                <Star className="w-3 h-3 fill-accent text-accent" />
                <span>{route.rating}</span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-headline font-extrabold text-[17px] text-ink leading-snug">
                {route.title}
              </h3>
              <p className="text-[12px] text-muted leading-relaxed mt-1 line-clamp-2">
                {route.desc}
              </p>

              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-light-outline-variant/60 text-center font-mono-tech text-[10px]">
                <div className="bg-sand-light p-1.5 rounded-lg">
                  <div className="text-muted/80">MESAFE</div>
                  <div className="font-bold text-ink mt-0.5">{route.distance}</div>
                </div>
                <div className="bg-sand-light p-1.5 rounded-lg">
                  <div className="text-muted/80">SÜRE</div>
                  <div className="font-bold text-ink mt-0.5">{route.duration}</div>
                </div>
                <div className="bg-sand-light p-1.5 rounded-lg">
                  <div className="text-muted/80">ZORLUK</div>
                  <div className="font-bold text-ink mt-0.5">{route.difficulty}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono-tech text-accent font-semibold">
                  Eldivan Çankırı Hattı
                </span>
                <a
                  href={`https://wa.me/905000000000?text=Merhaba,%20${encodeURIComponent(route.title)}%20hakkinda%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-forest text-white font-mono-tech text-[11px] font-bold hover:bg-forest-dark transition-colors"
                >
                  <span>Rehber Talep Et</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
