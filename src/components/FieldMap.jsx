import React, { useEffect, useRef, useState } from 'react';
import { Navigation, Thermometer, Mountain, Wind, ExternalLink, MapPin } from 'lucide-react';
import { WEATHER_METRICS, MAP_LOCATIONS, CLUB_CONFIG } from '../data/mockData';

const WEATHER_ICON_MAP = {
  Thermometer,
  Mountain,
  Wind
};

export default function FieldMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [activeLocId, setActiveLocId] = useState('merkez');

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    let retryTimer = null;

    const initMap = () => {
      if (!window.L || !mapContainerRef.current || mapInstanceRef.current) return false;

      const map = window.L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false
      }).setView([40.5700, 33.5250], 12);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      MAP_LOCATIONS.forEach((loc) => {
        const marker = window.L.marker(loc.coords)
          .addTo(map)
          .bindPopup(`<b>${loc.title}</b><br>${loc.subtitle}`);
        markersRef.current[loc.id] = marker;
      });

      mapInstanceRef.current = map;
      return true;
    };

    if (!initMap()) {
      retryTimer = setInterval(() => {
        if (initMap()) {
          clearInterval(retryTimer);
        }
      }, 300);
    }

    return () => {
      if (retryTimer) clearInterval(retryTimer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = {};
      }
    };
  }, []);

  const handleFocusLocation = (loc) => {
    setActiveLocId(loc.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(loc.coords, loc.zoom || 14, { duration: 0.8 });
      const marker = markersRef.current[loc.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const activeLocation =
    MAP_LOCATIONS.find((l) => l.id === activeLocId) || MAP_LOCATIONS[1];

  return (
    <section
      id="saha"
      tabIndex={-1}
      className="px-5 py-6 bg-sand border-y border-light-outline-variant/60 outline-none"
    >
      {/* Başlık */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="font-headline text-[24px] font-extrabold tracking-tight text-ink leading-tight">
            Saha ve Hava <br />
            <span className="text-muted font-normal">koşulları.</span>
          </h2>
        </div>
        <span className="font-mono-tech text-[10px] font-bold text-emerald-700 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          CANLI TELEMETRİ
        </span>
      </div>

      {/* Saha Görseli ve İklim Metrikleri Kartı */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-light-outline-variant/60 bg-white">
        <div className="relative h-[200px] w-full overflow-hidden">
          <img
            src="/images/yuruyus.jpg"
            alt="Eldivan Dağları Doğa Yürüyüşü"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 text-white font-mono-tech text-xs font-semibold">
            Çankırı / Eldivan Zirve Hattı
          </div>
        </div>

        {/* 3'lü İklim Metrikleri Izgarası */}
        <div className="p-3.5 grid grid-cols-3 gap-2 bg-white">
          {WEATHER_METRICS.map((item) => {
            const IconComp = WEATHER_ICON_MAP[item.icon] || Thermometer;
            return (
              <div
                key={item.id}
                className="bg-sand-dark/60 p-3 rounded-xl border border-black/5 flex flex-col items-center justify-center text-center"
              >
                <IconComp className="w-5 h-5 text-ink mb-1" />
                <div className="text-[9px] font-mono-tech uppercase font-bold text-muted tracking-wider">
                  {item.label}
                </div>
                <div className="font-mono-tech text-[18px] font-bold text-ink leading-tight mt-0.5">
                  {item.value}
                </div>
                <div className="text-[9px] text-muted font-medium mt-0.5">{item.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Canlı Saha Haritası (OpenStreetMap) */}
      <div className="mt-4 bg-white rounded-2xl p-4 border border-light-outline-variant/80 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 font-mono-tech text-[10px] font-bold text-forest uppercase tracking-wider mb-0.5">
              <Navigation className="w-3.5 h-3.5 text-accent" />
              <span>İNTERAKTİF SAHA HARİTASI</span>
            </div>
            <h3 className="font-headline font-bold text-ink text-[16px]">
              Eldivan Parkur &amp; Arazi Konumu
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-sand-dark text-[10px] font-mono-tech font-bold text-muted border border-black/5">
            OpenStreetMap
          </span>
        </div>

        {/* Harita Konteyneri */}
        <div className="rounded-xl overflow-hidden border border-light-outline-variant h-[250px] relative z-0">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Harita Hızlı Odak Butonları */}
        <div className="mt-3 flex items-center justify-between gap-1.5 font-mono-tech text-[11px]">
          <div className="flex items-center gap-1.5 overflow-x-auto snap-x snap-mandatory scrollbar-none">
            {MAP_LOCATIONS.map((loc) => {
              const isSelected = activeLocId === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleFocusLocation(loc)}
                  className={`snap-start px-2.5 py-1 rounded-lg font-semibold transition-all active:scale-95 flex-shrink-0 ${
                    isSelected
                      ? 'bg-ink text-white shadow-sm'
                      : 'bg-sand-dark hover:bg-ink hover:text-white text-ink'
                  }`}
                >
                  {loc.label}
                </button>
              );
            })}
          </div>

          <a
            href={CLUB_CONFIG.osmFullMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline font-bold text-[10px] flex items-center gap-0.5 flex-shrink-0"
          >
            <span>BÜYÜT</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Seçili Konum Koordinat & Yol Tarifi Alt Kartı */}
        <div className="mt-3 pt-3 border-t border-light-outline-variant/60 flex items-center justify-between font-mono-tech text-[11px]">
          <div>
            <span className="text-muted block text-[9px] uppercase">
              {activeLocation.title}
            </span>
            <span className="font-bold text-ink">
              {activeLocation.coords[0].toFixed(4)}° K, {activeLocation.coords[1].toFixed(4)}° D
            </span>
          </div>

          <a
            href={activeLocation.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-forest text-white font-bold text-[10px] hover:bg-forest-dark active:scale-95 transition-all"
          >
            <MapPin className="w-3 h-3 text-accent" />
            <span>Yol Tarifi Al</span>
          </a>
        </div>
      </div>
    </section>
  );
}
