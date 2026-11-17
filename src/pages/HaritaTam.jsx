import React, { useEffect, useRef, useState } from 'react';
import { X, Navigation } from 'lucide-react';
import { useNavigate, useSearchParams } from '../lib/router';
import { MAP_LOCATIONS } from '../data/mockData';
import { openUrl } from '../lib/links';
import LeafletMap from '../components/LeafletMap';

// Sayfadan ayrılmadan, tüm ekranı kaplayan harita
export default function HaritaTam() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const requested = params.get('loc');
  const initialId = MAP_LOCATIONS.some((l) => l.id === requested) ? requested : 'merkez';
  const mapRef = useRef(null);
  const [activeId, setActiveId] = useState(initialId);
  const active = MAP_LOCATIONS.find((l) => l.id === activeId) ?? MAP_LOCATIONS[0];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && navigate.back();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [navigate]);

  const focus = (id) => {
    setActiveId(id);
    mapRef.current?.focus(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-sand-dark">
      <div className="relative w-full max-w-[402px] h-full">
        <div className="absolute inset-0 isolate">
          <LeafletMap
            ref={mapRef}
            initialLocationId={initialId}
            zoomPosition="topright"
            openPopupOnLoad
            className="!h-full"
          />
        </div>

        <div className="absolute z-[1100] left-3.5 right-16 top-[max(10px,env(safe-area-inset-top))] flex items-center gap-2.5 pointer-events-none">
          <button
            type="button"
            onClick={() => navigate.back()}
            aria-label="Haritayı kapat"
            className="pointer-events-auto w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center cursor-pointer active:scale-95"
          >
            <X className="w-[22px] h-[22px] text-ink" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3.5 h-[38px] rounded-full bg-white/95 shadow-md">
            <Navigation className="w-3.5 h-3.5 text-accent" />
            <span className="text-[14px] font-black text-ink">Eldivan Haritası</span>
          </div>
        </div>

        <div className="absolute z-[1100] left-0 right-0 bottom-0 pt-3.5 px-4 pb-[max(14px,env(safe-area-inset-bottom))] flex flex-col gap-3 rounded-t-[22px] bg-white shadow-[0_-4px_14px_rgba(0,0,0,0.16)]">
          <div className="flex gap-2 overflow-x-auto">
            {MAP_LOCATIONS.map((l) => {
              const selected = l.id === activeId;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => focus(l.id)}
                  aria-pressed={selected}
                  className={`px-4 py-2 rounded-full text-[13px] font-extrabold cursor-pointer ${
                    selected ? 'bg-ink text-white' : 'bg-sand border border-light-outline-variant text-ink-muted'
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-headline text-[17px] leading-[22px] font-black text-ink truncate">{active.title}</div>
              <div className="text-[12.5px] leading-[17px] text-ink-muted truncate">{active.subtitle}</div>
              <div className="mt-0.5 text-[12px] font-bold text-forest">
                {active.coords[0].toFixed(4)}° K, {active.coords[1].toFixed(4)}° D
              </div>
            </div>
            <button
              type="button"
              onClick={() => openUrl(active.mapsUrl)}
              aria-label={`${active.title} için yol tarifi al`}
              className="inline-flex items-center gap-1.5 px-4 min-h-[46px] rounded-[14px] bg-forest text-white text-[14px] font-extrabold cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              Yol Tarifi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
