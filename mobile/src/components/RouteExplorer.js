import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '../theme/colors';
import { ROUTES_DATA } from '../data/mockData';

export const FILTER_CHIPS = [
  { id: 'all', label: 'TÜMÜ' },
  { id: 'zirve', label: 'ZİRVE' },
  { id: 'enduro', label: 'ENDURO' },
  { id: 'kamp', label: 'KAMP' },
  { id: 'bisiklet', label: 'BİSİKLET' },
  { id: 'offroad', label: 'OFF-ROAD' },
  { id: 'oryantiring', label: 'ORYANTİRİNG' }
];

export default function RouteExplorer({ activeFilter = 'all', onFilterChange }) {
  const filter = FILTER_CHIPS.some((c) => c.id === activeFilter) ? activeFilter : 'all';
  const chipsRef = useRef(null);
  const chipX = useRef({});

  const filteredRoutes =
    filter === 'all' ? ROUTES_DATA : ROUTES_DATA.filter((r) => r.category === filter);

  // Menüden gelen filtre ekran dışındaysa çipi görünür alana kaydır
  useEffect(() => {
    const x = chipX.current[filter];
    if (x != null) chipsRef.current?.scrollTo({ x: Math.max(0, x - 18), animated: true });
  }, [filter]);

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Rotalar & Parkurlar</Text>
        <View style={styles.countPill}>
          <Text style={styles.countText}>{filteredRoutes.length} PARKUR</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Eldivan'ın dağ, toprak ve doğa rotaları.</Text>

      <ScrollView
        ref={chipsRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
      >
        {FILTER_CHIPS.map((chip) => {
          const isActive = filter === chip.id;
          return (
            <TouchableOpacity
              key={chip.id}
              activeOpacity={0.8}
              onLayout={(e) => {
                chipX.current[chip.id] = e.nativeEvent.layout.x;
              }}
              onPress={() => onFilterChange?.(chip.id)}
              style={[styles.chip, isActive ? styles.chipActive : styles.chipIdle]}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.chipText, isActive ? styles.chipTextActive : styles.chipTextIdle]}>
                {chip.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.list}>
        {filteredRoutes.map((route) => (
          <TouchableOpacity
            key={route.id}
            activeOpacity={0.9}
            onPress={() => router.push(`/rota/${route.id}`)}
            style={styles.routeCard}
            accessibilityRole="button"
            accessibilityLabel={`${route.title}, ${route.distance}, ${route.difficulty}. Detayı aç`}
          >
            <View style={styles.imageWrap}>
              <Image source={route.image} style={styles.routeImg} resizeMode="cover" />
              <View style={styles.categoryChip}>
                <Text style={styles.categoryText} maxFontSizeMultiplier={1.3}>
                  {route.categoryName}
                </Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.routeTitle}>{route.title}</Text>
              <Text style={styles.routeDesc} numberOfLines={2}>
                {route.desc}
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Ionicons name="resize-outline" size={14} color={COLORS.accent} />
                  <Text style={styles.statText}>{route.distance}</Text>
                </View>
                <View style={styles.stat}>
                  <Ionicons name="time-outline" size={14} color={COLORS.accent} />
                  <Text style={styles.statText}>{route.duration}</Text>
                </View>
                <View style={styles.stat}>
                  <Ionicons name="speedometer-outline" size={14} color={COLORS.accent} />
                  <Text style={styles.statText}>{route.difficulty}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.detailLink}>Rotayı incele</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.accent} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingVertical: 22,
    backgroundColor: COLORS.sandLight
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.ink
  },
  countPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(194, 94, 46, 0.12)'
  },
  countText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent
  },
  subtitle: {
    fontSize: 12.5,
    color: COLORS.muted,
    marginBottom: 14
  },
  chipsScroll: {
    gap: 8,
    paddingBottom: 12
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999
  },
  chipActive: {
    backgroundColor: COLORS.ink
  },
  chipIdle: {
    backgroundColor: COLORS.sandDark,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  chipText: {
    fontSize: 11,
    fontWeight: '800'
  },
  chipTextActive: {
    color: COLORS.white
  },
  chipTextIdle: {
    color: COLORS.muted
  },
  list: {
    gap: 14
  },
  routeCard: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.outline,
    backgroundColor: COLORS.white
  },
  imageWrap: {
    height: 150,
    backgroundColor: COLORS.forest
  },
  routeImg: {
    width: '100%',
    height: '100%'
  },
  categoryChip: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(20, 32, 26, 0.85)'
  },
  categoryText: {
    color: COLORS.white,
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  cardBody: {
    padding: 14,
    gap: 8
  },
  routeTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
    color: COLORS.ink
  },
  routeDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.inkMuted
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: COLORS.sand
  },
  statText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.ink
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    paddingTop: 2
  },
  detailLink: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.accent
  }
});
