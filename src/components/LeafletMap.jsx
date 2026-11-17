import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { MAP_LOCATIONS } from '../data/mockData';

// Leaflet + OpenStreetMap haritası (Leaflet index.html'den CDN ile yüklenir, window.L).
// Hem sayfadaki küçük önizleme hem de tam ekran harita bunu kullanır.
// ref.focus(id) ile bir konuma uçar.
const LeafletMap = forwardRef(function LeafletMap(
  { initialLocationId, showZoom = true, zoomPosition = 'topleft', openPopupOnLoad = false, className = '' },
  ref
) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    let retry = null;

    const init = () => {
      const L = window.L;
      if (!L || !containerRef.current || mapRef.current) return false;

      const initial = MAP_LOCATIONS.find((l) => l.id === initialLocationId);
      const map = L.map(containerRef.current, { zoomControl: false, scrollWheelZoom: true }).setView(
        initial ? initial.coords : [40.57, 33.525],
        initial ? initial.zoom || 14 : 12
      );
      if (showZoom) L.control.zoom({ position: zoomPosition }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
      }).addTo(map);

      MAP_LOCATIONS.forEach((loc) => {
        markersRef.current[loc.id] = L.marker(loc.coords)
          .addTo(map)
          .bindPopup(`<b>${loc.title}</b><br>${loc.subtitle}`);
      });
      if (initial && openPopupOnLoad) markersRef.current[initial.id]?.openPopup();

      mapRef.current = map;
      return true;
    };

    if (!init()) {
      retry = setInterval(() => {
        if (init()) clearInterval(retry);
      }, 300);
    }

    return () => {
      if (retry) clearInterval(retry);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = {};
      }
    };
    // Harita yalnızca ilk açılışta kurulur; konum değişiklikleri focus() ile yapılır
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    focus(id) {
      const loc = MAP_LOCATIONS.find((l) => l.id === id);
      const map = mapRef.current;
      if (!loc || !map) return;
      map.flyTo(loc.coords, loc.zoom || 14, { duration: 0.7 });
      markersRef.current[id]?.openPopup();
    },
    invalidate() {
      mapRef.current?.invalidateSize();
    }
  }));

  return <div ref={containerRef} className={`w-full h-full bg-sand-dark ${className}`} />;
});

export default LeafletMap;
