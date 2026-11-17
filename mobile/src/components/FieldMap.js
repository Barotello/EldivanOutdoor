import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { MAP_LOCATIONS, CLUB_CONFIG, IMAGES } from '../data/mockData';
import useWeather from '../hooks/useWeather';
import { openUrl } from '../utils/links';
import LeafletMap from './LeafletMap';


export default function FieldMap() {
  const mapRef = useRef(null);
  const weather = useWeather(CLUB_CONFIG.weatherCoords);
  const w = weather.data;
  const weatherMetrics = [
    {
      id: 'temp',
      label: 'SICAKLIK',
      value: w ? `${w.temperature}°C` : '—',
      sub: w ? `HİS: ${w.feelsLike}°C` : ' ',
      icon: 'thermometer-outline'
    },
    {
      id: 'wind',
      label: 'RÜZGAR',
      value: w ? `${w.wind} km/s` : '—',
      sub: w ? `NEM: %${w.humidity}` : ' ',
      icon: 'flag-outline'
    },
    {
      id: 'elevation',
      label: 'RAKIM',
      value: CLUB_CONFIG.elevation,
      sub: 'ZİRVE',
      icon: 'trail-sign-outline'
    }
  ];
  const [activeLocId, setActiveLocId] = useState('merkez');

  const activeLocation =
    MAP_LOCATIONS.find((l) => l.id === activeLocId) || MAP_LOCATIONS[1];

  const openFullMap = () => router.push({ pathname: '/harita-tam', params: { loc: activeLocId } });

  const handleFocusLocation = (loc) => {
    setActiveLocId(loc.id);
    mapRef.current?.focus(loc.id);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Harita ve Hava {'\n'}
        <Text style={styles.headingMuted}>koşulları.</Text>
      </Text>

      {/* Bölge Görseli ve İklim Metrikleri Kartı */}
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

        <View style={styles.weatherStatus}>
          {weather.status === 'loading' && !w ? (
            <>
              <ActivityIndicator size="small" color={COLORS.accent} />
              <Text style={styles.weatherStatusText}>Hava durumu yükleniyor…</Text>
            </>
          ) : weather.status === 'error' && !w ? (
            <>
              <Ionicons name="cloud-offline-outline" size={16} color={COLORS.accent} />
              <Text style={styles.weatherStatusText}>Hava verisi alınamadı.</Text>
              <TouchableOpacity onPress={weather.reload} accessibilityRole="button" hitSlop={8}>
                <Text style={styles.retryText}>Tekrar dene</Text>
              </TouchableOpacity>
            </>
          ) : w ? (
            <>
              <Ionicons name="partly-sunny-outline" size={16} color={COLORS.accent} />
              <Text style={styles.weatherStatusText}>
                {w.condition}
                {w.sunset ? ` · Gün batımı ${w.sunset}` : ''}
                {w.updatedAt ? ` · ${w.updatedAt} itibarıyla` : ''}
              </Text>
            </>
          ) : null}
        </View>

        <View style={styles.metricsGrid}>
          {weatherMetrics.map((item) => (
            <View key={item.id} style={styles.metricTile}>
              <Ionicons name={item.icon} size={20} color={COLORS.ink} />
              <Text style={styles.metricLabel}>{item.label}</Text>
              <Text style={styles.metricValue}>{item.value}</Text>
              <Text style={styles.metricSub}>{item.sub}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* İnteraktif Harita */}
      <View style={styles.mapCard}>
        <View style={styles.mapHeader}>
          <View style={styles.mapTagRow}>
            <Ionicons name="navigate-outline" size={14} color={COLORS.accent} />
            <Text style={styles.mapTagText}>İNTERAKTİF HARİTA</Text>
          </View>
          <Text style={styles.mapTitle}>Eldivan Parkur & Arazi Konumu</Text>
        </View>

        <View style={styles.mapFrame}>
          <LeafletMap
            ref={mapRef}
            initialLocationId={activeLocId}
            showZoom={false}
            style={styles.webview}
          />
          {/* Küçük harita önizleme: üstüne dokununca tam ekran harita açılır */}
          <TouchableOpacity
            style={styles.mapTapLayer}
            activeOpacity={0.85}
            onPress={openFullMap}
            accessibilityRole="button"
            accessibilityLabel="Haritayı tam ekran aç"
          >
            <View style={styles.mapTapHint}>
              <Ionicons name="expand-outline" size={14} color={COLORS.white} />
              <Text style={styles.mapTapHintText}>Dokun, tam ekran aç</Text>
            </View>
          </TouchableOpacity>
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
            onPress={openFullMap}
            style={styles.expandBtn}
            accessibilityRole="button"
            accessibilityLabel="Haritayı tam ekran aç"
            hitSlop={6}
          >
            <Ionicons name="expand-outline" size={13} color={COLORS.accent} />
            <Text style={styles.expandText}>TAM EKRAN</Text>
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
            onPress={() => openUrl(activeLocation.mapsUrl)}
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
  mapTapLayer: {
    ...StyleSheet.absoluteFillObject,
    // İpucu üstte: alttaki OpenStreetMap atfı görünür kalmalı
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10
  },
  mapTapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(20, 32, 26, 0.85)'
  },
  mapTapHintText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800'
  },
  weatherStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 12
  },
  weatherStatusText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.inkMuted,
    flex: 1
  },
  retryText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: COLORS.accent,
    textDecorationLine: 'underline'
  },
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

