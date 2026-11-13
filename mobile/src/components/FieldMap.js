import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { WEATHER_METRICS, MAP_LOCATIONS, CLUB_CONFIG, IMAGES } from '../data/mockData';

const LEAFLET_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; background: #EFECE2; }
    .leaflet-popup-content-wrapper {
      background: #1F3A2E; color: #F5F2EA; border-radius: 14px; font-family: sans-serif;
    }
    .leaflet-popup-tip { background: #1F3A2E; }
    .leaflet-popup-content b { color: #E8B07A; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', { zoomControl: true }).setView([40.5700, 33.5250], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
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
  </script>
</body>
</html>`;

export default function FieldMap() {
  const webViewRef = useRef(null);
  const [activeLocId, setActiveLocId] = useState('merkez');

  const activeLocation =
    MAP_LOCATIONS.find((l) => l.id === activeLocId) || MAP_LOCATIONS[1];

  const handleFocusLocation = (loc) => {
    setActiveLocId(loc.id);
    webViewRef.current?.injectJavaScript(
      `window.focusLocation && window.focusLocation('${loc.id}'); true;`
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Saha ve Hava {'\n'}
        <Text style={styles.headingMuted}>koşulları.</Text>
      </Text>

      {/* Saha Görseli ve İklim Metrikleri Kartı */}
      <View style={styles.weatherCard}>
        <View style={styles.heroWrap}>
          <Image source={IMAGES.yuruyus} style={styles.heroImg} resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.65)']}
            style={styles.heroGrad}
          >
            <Text style={styles.heroCaption}>Çankırı / Eldivan Zirve Hattı</Text>
          </LinearGradient>
        </View>

        <View style={styles.metricsGrid}>
          {WEATHER_METRICS.map((item) => (
            <View key={item.id} style={styles.metricTile}>
              <Ionicons name={item.icon} size={20} color={COLORS.ink} />
              <Text style={styles.metricLabel}>{item.label}</Text>
              <Text style={styles.metricValue}>{item.value}</Text>
              <Text style={styles.metricSub}>{item.sub}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* İnteraktif Saha Haritası */}
      <View style={styles.mapCard}>
        <View style={styles.mapHeader}>
          <View style={styles.mapTagRow}>
            <Ionicons name="navigate-outline" size={14} color={COLORS.accent} />
            <Text style={styles.mapTagText}>İNTERAKTİF SAHA HARİTASI</Text>
          </View>
          <Text style={styles.mapTitle}>Eldivan Parkur & Arazi Konumu</Text>
        </View>

        <View style={styles.mapFrame}>
          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ html: LEAFLET_HTML }}
            style={styles.webview}
            scrollEnabled={false}
            nestedScrollEnabled
          />
        </View>

        {/* Hızlı Odak Butonları */}
        <View style={styles.controlsRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.locButtons}
          >
            {MAP_LOCATIONS.map((loc) => {
              const isSelected = activeLocId === loc.id;
              return (
                <TouchableOpacity
                  key={loc.id}
                  activeOpacity={0.85}
                  onPress={() => handleFocusLocation(loc)}
                  style={[
                    styles.locBtn,
                    isSelected ? styles.locBtnActive : styles.locBtnIdle
                  ]}
                >
                  <Text
                    style={[
                      styles.locBtnText,
                      isSelected ? styles.locBtnTextActive : styles.locBtnTextIdle
                    ]}
                  >
                    {loc.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            onPress={() => Linking.openURL(CLUB_CONFIG.osmFullMapUrl)}
            style={styles.expandBtn}
          >
            <Text style={styles.expandText}>BÜYÜT</Text>
            <Ionicons name="open-outline" size={12} color={COLORS.accent} />
          </TouchableOpacity>
        </View>

        {/* Seçili Konum Alt Kartı */}
        <View style={styles.coordFooter}>
          <View>
            <Text style={styles.coordTitle}>{activeLocation.title}</Text>
            <Text style={styles.coordValue}>
              {activeLocation.coords[0].toFixed(4)}° K, {activeLocation.coords[1].toFixed(4)}° D
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => Linking.openURL(activeLocation.mapsUrl)}
            style={styles.dirBtn}
          >
            <Ionicons name="location-outline" size={13} color={COLORS.accent} />
            <Text style={styles.dirBtnText}>Yol Tarifi Al</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingVertical: 22,
    backgroundColor: COLORS.sand,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.outline
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.ink,
    lineHeight: 28,
    marginBottom: 14
  },
  headingMuted: {
    fontWeight: '400',
    color: COLORS.muted
  },
  weatherCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  heroWrap: {
    height: 190,
    width: '100%'
  },
  heroImg: {
    width: '100%',
    height: '100%'
  },
  heroGrad: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 14
  },
  heroCaption: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700'
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 8,
    padding: 12
  },
  metricTile: {
    flex: 1,
    backgroundColor: COLORS.sandDark,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center'
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.muted,
    marginTop: 4
  },
  metricValue: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.ink,
    marginTop: 2
  },
  metricSub: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.muted,
    marginTop: 2
  },
  mapCard: {
    marginTop: 14,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  mapHeader: {
    marginBottom: 10
  },
  mapTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2
  },
  mapTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.forest,
    letterSpacing: 0.6
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink
  },
  mapFrame: {
    height: 240,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  webview: {
    flex: 1,
    backgroundColor: COLORS.sandDark
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8
  },
  locButtons: {
    gap: 6
  },
  locBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  locBtnActive: {
    backgroundColor: COLORS.ink
  },
  locBtnIdle: {
    backgroundColor: COLORS.sandDark
  },
  locBtnText: {
    fontSize: 11,
    fontWeight: '700'
  },
  locBtnTextActive: {
    color: COLORS.white
  },
  locBtnTextIdle: {
    color: COLORS.ink
  },
  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  expandText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent
  },
  coordFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  coordTitle: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.muted,
    textTransform: 'uppercase'
  },
  coordValue: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.ink,
    marginTop: 2
  },
  dirBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: COLORS.forest
  },
  dirBtnText: {
    color: COLORS.white,
    fontSize: 10.5,
    fontWeight: '800'
  }
});

