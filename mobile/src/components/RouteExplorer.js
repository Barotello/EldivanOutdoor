import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { ROUTES_DATA, CLUB_CONFIG } from '../data/mockData';

const FILTER_CHIPS = [
  { id: 'all', label: 'TÜMÜ' },
  { id: 'zirve', label: 'ZİRVE' },
  { id: 'enduro', label: 'ENDURO' },
  { id: 'kamp', label: 'KAMP' },
  { id: 'bisiklet', label: 'BİSİKLET' },
  { id: 'offroad', label: 'OFF-ROAD' }
];

export default function RouteExplorer({ activeFilter = 'all', onFilterChange }) {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const filter = activeFilter || 'all';

  const filteredRoutes =
    filter === 'all' ? ROUTES_DATA : ROUTES_DATA.filter((r) => r.category === filter);

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Rotalar & Parkurlar</Text>
        <View style={styles.countPill}>
          <Text style={styles.countText}>{filteredRoutes.length} PARKUR</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        Eldivan'ın keşfedilmiş resmi dağ, toprak ve doğa rotaları.
      </Text>

      {/* Filtre Çipleri */}
      <ScrollView
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
              onPress={() => onFilterChange?.(chip.id)}
              style={[styles.chip, isActive ? styles.chipActive : styles.chipIdle]}
            >
              <Text style={[styles.chipText, isActive ? styles.chipTextActive : styles.chipTextIdle]}>
                {chip.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Rota Kartları */}
      <View style={styles.list}>
        {filteredRoutes.map((route) => (
          <TouchableOpacity
            key={route.id}
            activeOpacity={0.92}
            onPress={() => setSelectedRoute(route)}
            style={styles.routeCard}
          >
            <Image source={route.image} style={styles.routeImg} resizeMode="cover" />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.92)']}
              style={styles.routeGradient}
            >
              <Text style={styles.routeTitle}>{route.title}</Text>
              <View style={styles.detailPill}>
                <Text style={styles.detailPillText}>DETAY</Text>
                <Ionicons name="arrow-up-outline" size={12} color={COLORS.white} style={{ transform: [{ rotate: '45deg' }] }} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Rota Detay Modalı */}
      <Modal
        visible={!!selectedRoute}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedRoute(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {/* Modal Üst Çubuk */}
            <View style={styles.modalHeader}>
              <View style={styles.modalBadges}>
                <View style={styles.catBadge}>
                  <Text style={styles.catBadgeText}>
                    {selectedRoute?.categoryName || selectedRoute?.category}
                  </Text>
                </View>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color={COLORS.accent} />
                  <Text style={styles.ratingText}>{selectedRoute?.rating}</Text>
                  <Text style={styles.diffText}>· {selectedRoute?.difficulty}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedRoute(null)}
                style={styles.closeBtn}
              >
                <Ionicons name="close" size={18} color={COLORS.ink} />
              </TouchableOpacity>
            </View>

            {/* Modal Gövde */}
            <ScrollView style={styles.modalBody} contentContainerStyle={{ paddingBottom: 16 }}>
              {selectedRoute?.image && (
                <View style={styles.modalHero}>
                  <Image source={selectedRoute.image} style={styles.modalImg} resizeMode="cover" />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.85)']}
                    style={styles.modalHeroGrad}
                  >
                    <Text style={styles.modalHeroTag}>ELDİVAN DOĞA & MOTOR PARKURU</Text>
                    <Text style={styles.modalHeroTitle}>{selectedRoute.title}</Text>
                  </LinearGradient>
                </View>
              )}

              <View style={styles.descBox}>
                <Text style={styles.descText}>{selectedRoute?.desc}</Text>
              </View>

              <View style={styles.metricsRow}>
                <View style={styles.metricBox}>
                  <View style={styles.metricLabelRow}>
                    <Ionicons name="time-outline" size={14} color={COLORS.accent} />
                    <Text style={styles.metricLabel}>MESAFE & SÜRE</Text>
                  </View>
                  <Text style={styles.metricValue}>{selectedRoute?.distance}</Text>
                  <Text style={styles.metricSub}>Tahmini: {selectedRoute?.duration}</Text>
                </View>

                <View style={styles.metricBox}>
                  <View style={styles.metricLabelRow}>
                    <Ionicons name="trending-up-outline" size={14} color={COLORS.accent} />
                    <Text style={styles.metricLabel}>İRTİFA & ZORLUK</Text>
                  </View>
                  <Text style={styles.metricValue}>{selectedRoute?.elevation}</Text>
                  <Text style={styles.metricSub}>Zorluk: {selectedRoute?.difficulty}</Text>
                </View>
              </View>

              <View style={styles.gpsNote}>
                <Ionicons name="compass-outline" size={16} color={COLORS.forest} />
                <Text style={styles.gpsNoteText}>
                  Çankırı Eldivan · GPS & Saha Koordinatları Onaylı
                </Text>
              </View>
            </ScrollView>

            {/* Modal Alt Butonları */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.mapsBtn}
                onPress={() =>
                  Linking.openURL(selectedRoute?.mapsUrl || CLUB_CONFIG.meetingPointMapsUrl)
                }
              >
                <Ionicons name="location-outline" size={16} color={COLORS.ink} />
                <Text style={styles.mapsBtnText}>Yol Tarifi Al</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.guideBtn}
                onPress={() =>
                  Linking.openURL(
                    `https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20${encodeURIComponent(
                      selectedRoute?.title || ''
                    )}%20rotasi%20hakkinda%20rehberlik%20ve%20detayli%20bilgi%20almak%20istiyorum.`
                  )
                }
              >
                <Ionicons name="chatbubble-outline" size={16} color={COLORS.white} />
                <Text style={styles.guideBtnText}>Rehber Talep Et</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingVertical: 22,
    backgroundColor: COLORS.sandLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline
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
    height: 205,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.outline,
    backgroundColor: COLORS.ink
  },
  routeImg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%'
  },
  routeGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 18,
    gap: 10
  },
  routeTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.white
  },
  detailPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)'
  },
  detailPillText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800'
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '88%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.sandLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outline
  },
  modalBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1
  },
  catBadge: {
    backgroundColor: COLORS.forest,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999
  },
  catBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800'
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.accent
  },
  diffText: {
    fontSize: 11,
    color: COLORS.muted
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.sandDark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBody: {
    padding: 16
  },
  modalHero: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14
  },
  modalImg: {
    width: '100%',
    height: '100%'
  },
  modalHeroGrad: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 14
  },
  modalHeroTag: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '800'
  },
  modalHeroTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 2
  },
  descBox: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.sandLight,
    borderWidth: 1,
    borderColor: COLORS.outline,
    marginBottom: 12
  },
  descText: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.inkMuted
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12
  },
  metricBox: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    backgroundColor: COLORS.sandLight,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  metricLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.ink,
    marginTop: 4
  },
  metricSub: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2
  },
  gpsNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(27, 59, 43, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(27, 59, 43, 0.16)'
  },
  gpsNoteText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.forest,
    flex: 1
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    backgroundColor: COLORS.sandLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline
  },
  mapsBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.sandDark,
    borderWidth: 1,
    borderColor: COLORS.outline,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  mapsBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.ink
  },
  guideBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.forest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  guideBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white
  }
});

