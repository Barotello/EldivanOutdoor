import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS } from '../theme/colors';

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}

// Rota ve aktivite detayları için tam ekran şablon:
// büyük görsel + geri butonu + içerik + altta sabit aksiyon butonları.
export default function DetailLayout({ image, tag, title, badges = [], children, actions = [] }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 + insets.bottom }} bounces={false}>
        <View style={styles.hero}>
          {image && <Image source={image} style={styles.heroImg} resizeMode="cover" />}
          <LinearGradient
            colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.88)']}
            locations={[0, 0.35, 1]}
            style={styles.heroGrad}
          >
            {tag ? <Text style={styles.heroTag}>{tag}</Text> : null}
            <Text style={styles.heroTitle}>{title}</Text>
          </LinearGradient>
          <TouchableOpacity
            onPress={goBack}
            style={[styles.backBtn, { top: insets.top + 10 }]}
            accessibilityRole="button"
            accessibilityLabel="Geri"
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={22} color={COLORS.ink} />
          </TouchableOpacity>
        </View>

        {badges.length > 0 && (
          <View style={styles.badgeRow}>
            {badges.map((b) => (
              <View key={b.label} style={styles.badge}>
                {b.icon && <Ionicons name={b.icon} size={13} color={COLORS.accent} />}
                <Text style={styles.badgeText}>{b.label}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.body}>{children}</View>
      </ScrollView>

      {actions.length > 0 && (
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 14) }]}>
          {actions.map((a, i) => (
            <TouchableOpacity
              key={a.label}
              onPress={a.onPress}
              style={[styles.actionBtn, i === actions.length - 1 ? styles.primary : styles.secondary]}
              accessibilityRole="button"
            >
              <Ionicons
                name={a.icon}
                size={16}
                color={i === actions.length - 1 ? COLORS.white : COLORS.ink}
              />
              <Text
                style={[styles.actionText, i === actions.length - 1 && { color: COLORS.white }]}
              >
                {a.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export function Section({ heading, icon, children, tone = 'sand' }) {
  return (
    <View style={[styles.section, tone === 'forest' && styles.sectionForest]}>
      {heading ? (
        <View style={styles.sectionHeadRow}>
          {icon && <Ionicons name={icon} size={15} color={COLORS.accent} />}
          <Text style={styles.sectionHeading}>{heading}</Text>
        </View>
      ) : null}
      {typeof children === 'string' ? <Text style={styles.sectionText}>{children}</Text> : children}
    </View>
  );
}

// Uzun değerler ("Sabit İstasyon", "24+ Saat") taşmasın diye satır düzeni:
// solda ikon + etiket, sağda değer; değer gerekirse alt satıra geçer.
export function MetricRow({ items }) {
  return (
    <View style={styles.metricList}>
      {items.map((m, i) => (
        <View key={m.label} style={[styles.metricItem, i > 0 && styles.metricDivider]}>
          <View style={styles.metricLeft}>
            <Ionicons name={m.icon} size={17} color={COLORS.accent} />
            <Text style={styles.metricLabel}>{m.label}</Text>
          </View>
          <Text style={styles.metricValue}>{m.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  hero: {
    height: 320,
    backgroundColor: COLORS.forest
  },
  heroImg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%'
  },
  heroGrad: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20
  },
  heroTag: {
    color: COLORS.gold,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
    letterSpacing: 0.6
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
    marginTop: 4
  },
  backBtn: {
    position: 'absolute',
    left: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 18,
    paddingTop: 16
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.sand,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  badgeText: {
    flexShrink: 1,
    fontSize: 11.5,
    lineHeight: 15,
    fontWeight: '800',
    color: COLORS.ink
  },
  body: {
    padding: 18,
    gap: 12
  },
  section: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.sandLight,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  sectionForest: {
    backgroundColor: 'rgba(27, 59, 43, 0.06)',
    borderColor: 'rgba(27, 59, 43, 0.16)'
  },
  sectionHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6
  },
  sectionHeading: {
    flexShrink: 1,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.6
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.ink
  },
  metricList: {
    borderRadius: 16,
    backgroundColor: COLORS.sand,
    borderWidth: 1,
    borderColor: COLORS.outline,
    paddingHorizontal: 14
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 12
  },
  metricDivider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.outline
  },
  metricLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  metricLabel: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700',
    color: COLORS.inkMuted
  },
  metricValue: {
    flexShrink: 1,
    textAlign: 'right',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '900',
    color: COLORS.ink
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderTopWidth: 1,
    borderTopColor: COLORS.outline
  },
  actionBtn: {
    flex: 1,
    minHeight: 48,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  primary: {
    backgroundColor: COLORS.forest
  },
  secondary: {
    backgroundColor: COLORS.sandDark,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  actionText: {
    flexShrink: 1,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '800',
    color: COLORS.ink
  }
});
