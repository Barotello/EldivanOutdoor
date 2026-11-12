import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function FieldMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Zaten yüklü

    // Leaflet global nesnesi window.L üzerinden yüklenir
    if (window.L) {
      const map = window.L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false
      }).setView([40.5700, 33.5250], 12);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      // Zirve Pin
      window.L.marker([40.6034, 33.5140])
        .addTo(map)
        .bindPopup('<b>Eldivan Zirve</b><br>1.420m Rakım · Tırmanış Noktası');

      // Merkez Pin
      window.L.marker([40.5700, 33.5250])
        .addTo(map)
        .bindPopup('<b>Eldivan Kulüp Merkezi</b><br>Toplanma & Brifing İstasyonu');

      // Baraj Pin
      window.L.marker([40.5420, 33.5510])
        .addTo(map)
        .bindPopup('<b>Koyunbaba Barajı</b><br>Enduro & Kamp Alanı');

      mapInstanceRef.current = map;
    }
  }, []);

  return (
    <section id="saha" className="px-5 py-6 bg-white border-t border-light-outline-variant/60">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-headline text-[22px] font-black text-ink tracking-tight flex items-center gap-1.5">
          <Navigation className="w-5 h-5 text-accent" />
          <span>Saha &amp; Canlı Harita</span>
        </h2>
        <span className="font-mono-tech text-[10px] font-bold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          CANLI GPS
        </span>
      </div>
      <p className="text-[12px] text-muted mb-4">
        OpenStreetMap destekli Eldivan topoğrafik arazi ve parkur sınırları.
      </p>

      {/* Harita Konteyneri */}
      <div className="rounded-2xl overflow-hidden border border-light-outline-variant/80 shadow-inner h-[260px] relative z-0">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Koordinat Bilgi Kartı */}
      <div className="mt-3 p-3 rounded-xl bg-sand-light border border-light-outline-variant/60 flex items-center justify-between font-mono-tech text-[11px]">
        <div>
          <span className="text-muted block text-[9px]">MERKEZ KOORDİNAT</span>
          <span className="font-bold text-ink">40.5700° K, 33.5250° D</span>
        </div>
        <div className="text-right">
          <span className="text-muted block text-[9px]">BÖLGE</span>
          <span className="font-bold text-accent">ÇANKIRI / ELDİVAN</span>
        </div>
      </div>
    </section>
  );
}
