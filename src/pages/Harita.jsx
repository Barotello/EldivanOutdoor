import React, { useRef, useState } from 'react';
import { Thermometer, Flag, Signpost, CloudSun, CloudOff, Navigation, Expand, MapPin, Loader2 } from 'lucide-react';
import { MAP_LOCATIONS, CLUB_CONFIG } from '../data/mockData';
import useWeather from '../hooks/useWeather';
import { openUrl } from '../lib/links';
import { useNavigate } from '../lib/router';
import LeafletMap from '../components/LeafletMap';

export default function Harita() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const weather = useWeather(CLUB_CONFIG.weatherCoords);
  const w = weather.data;
  const [activeLocId, setActiveLocId] = useState('merkez');
  const activeLocation = MAP_LOCATIONS.find((l) => l.id === activeLocId) || MAP_LOCATIONS[1];

  const metrics = [
    {
      id: 'temp',
      label: 'SICAKLIK',
      value: w ? `${w.temperature}°C` : '—',
      sub: w ? `HİS: ${w.feelsLike}°C` : ' ',
      icon: Thermometer
    },
    {
      id: 'wind',
      label: 'RÜZGAR',
      value: w ? `${w.wind} km/s` : '—',
      sub: w ? `NEM: %${w.humidity}` : ' ',
      icon: Flag
    },
    { id: 'elevation', label: 'RAKIM', value: CLUB_CONFIG.elevation, sub: 'ZİRVE', icon: Signpost }
  ];

  const focus = (loc) => {
    setActiveLocId(loc.id);
    mapRef.current?.focus(loc.id);
  };

  const openFullMap = () => navigate({ pathname: '/harita-tam', params: { loc: activeLocId } });

  return (
    <section className="px-[18px] pt-3 pb-6 bg-sand min-h-[70vh]">
      <h1 className="font-headline text-[24px] leading-7 font-black text-ink mb-3.5">
        Harita ve Hava <br />
        <span className="font-normal text-ink-muted">koşulları.</span>
      </h1>

      {/* Bölge görseli ve iklim metrikleri */}
      <div className="rounded-[20px] overflow-hidden bg-white border border-light-outline-variant mb-4">
        <div className="relative h-[140px]">
          <img src="/images/yuruyus.jpg" alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent flex items-end p-3">
            <span className="text-white text-[13px] font-bold">Çankırı / Eldivan Zirve Hattı</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 pt-3 text-[12.5px] font-bold text-ink-muted" aria-live="polite">
          {weather.status === 'loading' && !w ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
              <span>Hava durumu yükleniyor…</span>
            </>
          ) : weather.status === 'error' && !w ? (
            <>
              <CloudOff className="w-4 h-4 text-accent" />
              <span className="flex-1">Hava verisi alınamadı.</span>
              <button type="button" onClick={weather.reload} className="text-accent underline font-extrabold cursor-pointer">
                Tekrar dene
              </button>
            </>
          ) : w ? (
            <>
              <CloudSun className="w-4 h-4 text-accent" />
              <span className="flex-1">
                {w.condition}
                {w.sunset ? ` · Gün batımı ${w.sunset}` : ''}
                {w.updatedAt ? ` · ${w.updatedAt} itibarıyla` : ''}
              </span>
            </>
          ) : null}
        </div>

        <div className="grid grid-cols-3 gap-2 p-3">
          {metrics.map(({ id, label, value, sub, icon: Icon }) => (
            <div key={id} className="rounded-2xl bg-sand-dark/80 py-3 px-1 text-center">
              <Icon className="w-5 h-5 text-ink mx-auto" />
              <div className="text-[10px] font-mono-tech font-extrabold tracking-wider text-muted mt-1">{label}</div>
              <div className="text-[17px] font-black text-ink leading-tight mt-0.5">{value}</div>
              <div className="text-[10px] font-mono-tech text-muted">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Etkileşimli harita: küçük önizleme, dokununca tam ekran */}
      <div className="rounded-[20px] bg-white border border-light-outline-variant p-3.5">
        <div className="flex items-center gap-1.5 text-accent text-[11px] font-mono-tech font-extrabold tracking-wider">
          <Navigation className="w-3.5 h-3.5" />
          İNTERAKTİF HARİTA
        </div>
        <h2 className="font-headline text-[16px] font-black text-ink mt-0.5 mb-2.5">Eldivan Parkur &amp; Arazi Konumu</h2>

        <div className="relative h-[240px] rounded-[14px] overflow-hidden border border-light-outline-variant">
          <div className="absolute inset-0 isolate">
            <LeafletMap ref={mapRef} initialLocationId={activeLocId} showZoom={false} />
          </div>
          <button
            type="button"
            onClick={openFullMap}
            aria-label="Haritayı tam ekran aç"
            className="absolute inset-x-0 top-0 bottom-6 z-10 flex items-start justify-end p-2.5 cursor-pointer bg-transparent"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(20,32,26,0.85)] text-white text-[12px] font-extrabold">
              <Expand className="w-3.5 h-3.5" />
              Dokun, tam ekran aç
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 mt-3">
          <div className="flex gap-2 overflow-x-auto">
            {MAP_LOCATIONS.map((loc) => {
              const selected = loc.id === activeLocId;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => focus(loc)}
                  aria-pressed={selected}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-extrabold cursor-pointer whitespace-nowrap ${
                    selected ? 'bg-ink text-white' : 'bg-sand-dark border border-light-outline-variant text-ink-muted'
                  }`}
                >
                  {loc.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={openFullMap}
            aria-label="Haritayı tam ekran aç"
            className="flex items-center gap-1 text-accent text-[10px] font-extrabold flex-shrink-0 cursor-pointer"
          >
            <Expand className="w-[13px] h-[13px]" />
            TAM EKRAN
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-light-outline-variant">
          <div>
            <div className="text-[10px] font-mono-tech font-bold text-muted uppercase">{activeLocation.title}</div>
            <div className="text-[13px] font-black text-ink">
              {activeLocation.coords[0].toFixed(4)}° K, {activeLocation.coords[1].toFixed(4)}° D
            </div>
          </div>
          <button
            type="button"
            onClick={() => openUrl(activeLocation.mapsUrl)}
            className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-full bg-forest text-white text-[12px] font-extrabold cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            Yol Tarifi Al
          </button>
        </div>
      </div>
    </section>
  );
}
