import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import LeafletMap from '../components/LeafletMap';
import { COLORS } from '../theme/colors';
import { MAP_LOCATIONS } from '../data/mockData';
import { openUrl } from '../utils/links';

function close() {
  if (router.canGoBack()) router.back();
  else router.replace('/harita');
}

// Uygulamadan çıkmadan, tüm ekranı kaplayan harita
export default function TamEkranHarita() {
  const { loc } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const mapRef = useRef(null);
  const initialId = MAP_LOCATIONS.some((l) => l.id === loc) ? loc : 'merkez';
  const [activeId, setActiveId] = useState(initialId);
  const active = MAP_LOCATIONS.find((l) => l.id === activeId) ?? MAP_LOCATIONS[0];

  const focus = (id) => {
    setActiveId(id);
    mapRef.current?.focus(id);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LeafletMap ref={mapRef} initialLocationId={initialId} zoomPosition="topright" openPopupOnLoad scrollEnabled />

      {/* Üst çubuk: kapat + başlık */}
      <View style={[styles.topBar, { top: insets.top + 10 }]} pointerEvents="box-none">
        <TouchableOpacity
          onPress={close}
          style={styles.roundBtn}
          accessibilityRole="button"
          accessibilityLabel="Haritayı kapat"
          hitSlop={8}
        >
          <Ionicons name="close" size={22} color={COLORS.ink} />
        </TouchableOpacity>
        <View style={styles.titlePill}>
          <Ionicons name="navigate" size={14} color={COLORS.accent} />
          <Text style={styles.titleText}>Eldivan Haritası</Text>
        </View>
      </View>

      {/* Alt kart: konum seçimi + yol tarifi */}
      <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 14) }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {MAP_LOCATIONS.map((l) => {
            const selected = l.id === activeId;
            return (
              <TouchableOpacity
                key={l.id}
                onPress={() => focus(l.id)}
                style={[styles.chip, selected ? styles.chipActive : styles.chipIdle]}
                accessibilityRole="button"
                accessibilityState={{ selected }}
              >
                <Text style={[styles.chipText, selected && styles.chipTextActive]}>{l.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.infoRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.locTitle} numberOfLines={1}>
              {active.title}
            </Text>
            <Text style={styles.locSub} numberOfLines={1}>
              {active.subtitle}
            </Text>
            <Text style={styles.coords}>
              {active.coords[0].toFixed(4)}° K, {active.coords[1].toFixed(4)}° D
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => openUrl(active.mapsUrl)}
            style={styles.dirBtn}
            accessibilityRole="button"
            accessibilityLabel={`${active.title} için yol tarifi al`}
          >
            <Ionicons name="navigate-outline" size={16} color={COLORS.white} />
            <Text style={styles.dirText}>Yol Tarifi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFECE2'
  },
  topBar: {
    position: 'absolute',
    left: 14,
    right: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  roundBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4
  },
  titlePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.96)',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  titleText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.ink
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 14,
    paddingHorizontal: 16,
    gap: 12,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12
  },
  chips: {
    gap: 8
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999
  },
  chipActive: {
    backgroundColor: COLORS.ink
  },
  chipIdle: {
    backgroundColor: COLORS.sand,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  chipText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.inkMuted
  },
  chipTextActive: {
    color: COLORS.white
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  locTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
    color: COLORS.ink
  },
  locSub: {
    fontSize: 12.5,
    lineHeight: 17,
    color: COLORS.inkMuted
  },
  coords: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.forest
  },
  dirBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: COLORS.forest
  },
  dirText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white
  }
});
