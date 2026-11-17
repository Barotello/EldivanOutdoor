import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { MAP_LOCATIONS } from '../data/mockData';
import { openUrl } from '../utils/links';

function buildHtml({ initialLocationId, zoomPosition, openPopupOnLoad, showZoom }) {
  const initial = MAP_LOCATIONS.find((l) => l.id === initialLocationId);
  const center = initial ? initial.coords : [40.57, 33.525];
  const zoom = initial ? initial.zoom || 14 : 12;

  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; background: #EFECE2; }
    .leaflet-popup-content-wrapper {
      background: #1F3A2E; color: #F5F2EA; border-radius: 14px; font-family: -apple-system, sans-serif;
    }
    .leaflet-popup-tip { background: #1F3A2E; }
    .leaflet-popup-content b { color: #E8B07A; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', { zoomControl: false }).setView(${JSON.stringify(center)}, ${zoom});
    ${showZoom ? `L.control.zoom({ position: ${JSON.stringify(zoomPosition)} }).addTo(map);` : ''}
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var locations = ${JSON.stringify(MAP_LOCATIONS)};
    var markers = {};
    locations.forEach(function(loc) {
      markers[loc.id] = L.marker(loc.coords).addTo(map).bindPopup('<b>' + loc.title + '</b><br>' + loc.subtitle);
    });
    window.focusLocation = function(id) {
      var loc = locations.find(function(l) { return l.id === id; });
      if (!loc) return;
      map.flyTo(loc.coords, loc.zoom || 14, { duration: 0.7 });
      if (markers[id]) markers[id].openPopup();
    };
    ${initial && openPopupOnLoad ? `if (markers[${JSON.stringify(initial.id)}]) markers[${JSON.stringify(initial.id)}].openPopup();` : ''}
  </script>
</body>
</html>`;
}

// Leaflet + OpenStreetMap haritası. Hem kartın içindeki küçük harita hem de
// tam ekran harita bunu kullanır. ref.focus(id) ile bir konuma uçar.
const LeafletMap = forwardRef(function LeafletMap(
  { initialLocationId, zoomPosition = 'topleft', openPopupOnLoad = false, showZoom = true, style, scrollEnabled = false },
  ref
) {
  const webRef = useRef(null);
  const iframeRef = useRef(null);
  // HTML yalnızca ilk açılışta üretilir; sonraki konum değişiklikleri focus() ile yapılır
  const html = useMemo(() => buildHtml({ initialLocationId, zoomPosition, openPopupOnLoad, showZoom }), []); // eslint-disable-line react-hooks/exhaustive-deps

  useImperativeHandle(ref, () => ({
    focus(id) {
      if (Platform.OS === 'web') {
        iframeRef.current?.contentWindow?.focusLocation?.(id);
      } else {
        webRef.current?.injectJavaScript(
          `window.focusLocation && window.focusLocation(${JSON.stringify(id)}); true;`
        );
      }
    }
  }));

  if (Platform.OS === 'web') {
    // Web önizlemesinde WebView yok; aynı HTML'i iframe ile göster
    return (
      <View style={[styles.fill, style]}>
        {React.createElement('iframe', {
          ref: iframeRef,
          srcDoc: html,
          title: 'Eldivan haritası',
          style: { border: 0, width: '100%', height: '100%' }
        })}
      </View>
    );
  }

  return (
    <WebView
      ref={webRef}
      originWhitelist={['*']}
      source={{ html }}
      style={[styles.fill, style]}
      scrollEnabled={scrollEnabled}
      nestedScrollEnabled
      setSupportMultipleWindows={false}
      // Harita içindeki bağlantılar (ör. OSM atfı) haritanın yerine açılmasın, tarayıcıda açılsın
      onShouldStartLoadWithRequest={(req) => {
        // Harita HTML'i "about:blank" üzerinden yüklenir; http(s) gezintisi ancak bir bağlantıya dokununca olur
        if (req.url.startsWith('http') && req.isTopFrame !== false) {
          openUrl(req.url);
          return false;
        }
        return true;
      }}
    />
  );
});

export default LeafletMap;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#EFECE2'
  }
});
