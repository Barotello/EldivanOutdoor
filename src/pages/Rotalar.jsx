import React, { useEffect, useRef } from 'react';
import { Clock, Ruler, Gauge, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from '../lib/router';
import { ROUTES_DATA } from '../data/mockData';

const FILTER_CHIPS = [
  { id: 'all', label: 'TÜMÜ' },
  { id: 'zirve', label: 'ZİRVE' },
  { id: 'enduro', label: 'ENDURO' },
  { id: 'kamp', label: 'KAMP' },
  { id: 'bisiklet', label: 'BİSİKLET' },
  { id: 'offroad', label: 'OFF-ROAD' },
  { id: 'oryantiring', label: 'ORYANTİRİNG' }
];

export default function Rotalar() {
  const [params, setParams] = useSearchParams();
  const requested = params.get('filter') || 'all';
  const filter = FILTER_CHIPS.some((c) => c.id === requested) ? requested : 'all';
  const chipsRef = useRef(null);

  const routes = filter === 'all' ? ROUTES_DATA : ROUTES_DATA.filter((r) => r.category === filter);

  // Menüden gelen filtre ekran dışındaysa çipi görünür alana kaydır
  useEffect(() => {
    const el = chipsRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [filter]);

  return (
    <section className="px-[18px] py-5 bg-sand-light min-h-[70vh]">
      <div className="flex items-center justify-between mb-1.5">
        <h1 className="font-headline text-[22px] font-black text-ink">Rotalar &amp; Parkurlar</h1>
        <span className="px-2 py-1 rounded-md bg-accent/10 text-accent text-[10px] font-mono-tech font-extrabold">
          {routes.length} PARKUR
        </span>
      </div>
      <p className="text-[12.5px] text-muted mb-3.5">Eldivan'ın dağ, toprak ve doğa rotaları.</p>

      <div ref={chipsRef} className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-none" role="tablist">
        {FILTER_CHIPS.map((chip) => {
          const active = chip.id === filter;
          return (
            <button
              key={chip.id}
              type="button"
              data-active={active}
              aria-pressed={active}
              onClick={() => setParams(chip.id === 'all' ? {} : { filter: chip.id })}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-mono-tech font-extrabold cursor-pointer transition ${
                active ? 'bg-ink text-white' : 'bg-sand-dark border border-light-outline-variant text-muted'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3.5">
        {routes.map((route) => (
          <Link
            key={route.id}
            to={`/rota/${route.id}`}
            aria-label={`${route.title}, ${route.distance}, ${route.difficulty}`}
            className="block rounded-[18px] overflow-hidden border border-light-outline-variant bg-white no-underline active:scale-[0.99] transition"
          >
            <div className="relative h-[150px] bg-forest">
              <img src={route.image} alt="" className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[rgba(20,32,26,0.85)] text-white text-[10.5px] font-mono-tech font-extrabold tracking-wider">
                {route.categoryName}
              </span>
            </div>
            <div className="p-3.5 flex flex-col gap-2">
              <h2 className="font-headline text-[17px] leading-[22px] font-black text-ink">{route.title}</h2>
              <p className="text-[13px] leading-[19px] text-ink-muted line-clamp-2">{route.desc}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  [Ruler, route.distance],
                  [Clock, route.duration],
                  [Gauge, route.difficulty]
                ].map(([Icon, text]) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sand text-[12px] font-bold text-ink"
                  >
                    <Icon className="w-3.5 h-3.5 text-accent" />
                    {text}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-end gap-1 text-accent text-[13px] font-extrabold">
                Rotayı incele
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
