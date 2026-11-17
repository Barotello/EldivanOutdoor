import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { PACKAGES_DATA, EVENTS_DATA } from '../data/mockData';
import { openUrl, openWhatsApp } from '../utils/links';

function getUpcomingEvents(now = new Date()) {
  return EVENTS_DATA.filter((e) => !e.startsAt || new Date(e.startsAt) >= now).sort(
    (a, b) => new Date(a.startsAt || 0) - new Date(b.startsAt || 0)
  );
}

export default function ClubEvents() {
  const upcomingEvents = useMemo(() => getUpcomingEvents(), []);
  const seasonLabel = `${new Date().getFullYear()} SEZONU`;

  return (
    <View style={styles.section}>
      {/* Üst Başlık: Kulüp Programları & Paketler */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>ÖNERİLEN DENEYİMLER</Text>
          <Text style={styles.heading}>Kulüp Programları</Text>
        </View>
        <View style={styles.seasonPill}>
          <Text style={styles.seasonText}>{seasonLabel}</Text>
        </View>
      </View>

      {/* Paket Kartları */}
      <View style={styles.list}>
        {PACKAGES_DATA.map((pkg) => (
          <View key={pkg.id} style={styles.card}>
            <Image source={pkg.image} style={styles.cardImg} resizeMode="cover" />
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.92)', '#FFFFFF']}
              style={styles.cardGrad}
            />
            <View style={styles.badgeTop}>
              <Text style={styles.badgeTopText}>{pkg.badge}</Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{pkg.title}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {pkg.desc}
              </Text>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.priceLabel}>{pkg.priceLabel}</Text>
                  <Text style={styles.priceVal}>{pkg.price}</Text>
                </View>

                <TouchableOpacity
                  style={styles.ctaBtn}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel={`${pkg.title} için rezervasyon yap`}
                  onPress={() =>
                    openWhatsApp(`Merhaba, ${pkg.title} programı için rezervasyon ve bilgi almak istiyorum.`)
                  }
                >
                  <Text style={styles.ctaBtnText}>REZERVASYON</Text>
                  <Ionicons
                    name="arrow-up-outline"
                    size={13}
                    color={COLORS.white}
                    style={{ transform: [{ rotate: '45deg' }] }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Yaklaşan Etkinlik Takvimi */}
      <View style={styles.calHeader}>
        <View style={styles.calTitleRow}>
          <Ionicons name="calendar-outline" size={17} color={COLORS.accent} />
          <Text style={styles.calHeading}>Yaklaşan Etkinlik Takvimi</Text>
        </View>
        <View style={styles.seasonPill}>
          <Text style={styles.seasonText}>RESMİ TAKVİM</Text>
        </View>
      </View>

      {upcomingEvents.length === 0 && (
        <View style={styles.emptyCard}>
          <Ionicons name="calendar-clear-outline" size={26} color={COLORS.accent} />
          <Text style={styles.emptyTitle}>Yeni etkinlikler yakında</Text>
          <Text style={styles.emptyDesc}>
            Takvim hazırlanıyor. Yeni tarihler açıldığında ilk sen haberdar olmak için bize yaz.
          </Text>
          <TouchableOpacity
            style={styles.ctaBtn}
            accessibilityRole="button"
            onPress={() => openWhatsApp('Merhaba, yeni etkinlik tarihlerinden haberdar olmak istiyorum.')}
          >
            <Text style={styles.ctaBtnText}>HABER VER</Text>
            <Ionicons name="logo-whatsapp" size={13} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.list}>
        {upcomingEvents.map((event) => (
          <View key={event.id} style={styles.card}>
            {event.image && (
              <Image source={event.image} style={styles.cardImg} resizeMode="cover" />
            )}
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.92)', '#FFFFFF']}
              style={styles.cardGrad}
            />

            <View style={[styles.badgeTop, { backgroundColor: COLORS.forest }]}>
              <Text style={styles.badgeTopText}>{event.badge}</Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{event.title}</Text>
              {event.desc && (
                <Text style={styles.cardDesc} numberOfLines={2}>
                  {event.desc}
                </Text>
              )}

              <View style={styles.metaList}>
                <View style={styles.metaRow}>
                  <Ionicons name="calendar-outline" size={14} color={COLORS.accent} />
                  <Text style={styles.metaDate}>
                    {event.date} · {event.time}
                  </Text>
                </View>
                <View style={styles.metaRow}>
                  <Ionicons name="location-outline" size={14} color={COLORS.inkMuted} />
                  <Text style={styles.metaLoc}>{event.location}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                {event.calendarUrl ? (
                  <TouchableOpacity
                    style={styles.calAddBtn}
                    onPress={() => openUrl(event.calendarUrl)}
                  >
                    <Ionicons name="add-circle-outline" size={14} color={COLORS.accent} />
                    <Text style={styles.calAddText}>Takvime Ekle</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.memberOnly}>Kulüp Üyelerine Özel</Text>
                )}

                <TouchableOpacity
                  style={styles.ctaBtn}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel={`${event.title} etkinliğine katıl`}
                  onPress={() => openWhatsApp(`Merhaba, ${event.title} etkinliğine katılmak istiyorum.`)}
                >
                  <Text style={styles.ctaBtnText}>KATIL / BİLGİ AL</Text>
                  <Ionicons
                    name="arrow-up-outline"
                    size={13}
                    color={COLORS.white}
                    style={{ transform: [{ rotate: '45deg' }] }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    alignItems: 'center',
    gap: 8,
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.outline,
    backgroundColor: COLORS.white
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.ink
  },
  emptyDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.inkMuted,
    textAlign: 'center',
    marginBottom: 6
  },
  section: {
    paddingHorizontal: 18,
    paddingVertical: 22,
    backgroundColor: COLORS.sandLight
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.8
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.ink,
    marginTop: 2
  },
  seasonPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(194, 94, 46, 0.12)'
  },
  seasonText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent
  },
  list: {
    gap: 14
  },
  card: {
    minHeight: 265,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.outline,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end'
  },
  cardImg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%'
  },
  cardGrad: {
    ...StyleSheet.absoluteFillObject
  },
  badgeTop: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: COLORS.ink,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 999
  },
  badgeTopText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6
  },
  cardContent: {
    padding: 18,
    paddingTop: 32
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.ink
  },
  cardDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2B2A25',
    lineHeight: 19,
    marginTop: 4
  },
  metaList: {
    marginTop: 10,
    gap: 4
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  metaDate: {
    fontSize: 11.5,
    fontWeight: '800',
    color: COLORS.ink
  },
  metaLoc: {
    fontSize: 11.5,
    fontWeight: '600',
    color: COLORS.inkMuted
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    gap: 8
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.inkMuted
  },
  priceVal: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.ink
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: COLORS.ink
  },
  ctaBtnText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800'
  },
  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingTop: 16,
    marginBottom: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline
  },
  calTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  calHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.ink
  },
  calAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: COLORS.sandDark
  },
  calAddText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: COLORS.ink
  },
  memberOnly: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.inkMuted
  }
});

