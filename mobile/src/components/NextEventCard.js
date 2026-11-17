import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '../theme/colors';
import { getUpcomingEvents } from '../utils/events';

// Ana ekranda "Sıradaki etkinlik" kartı: dönüşümün asıl noktası en üste yakın dursun.
export default function NextEventCard() {
  const next = useMemo(() => getUpcomingEvents()[0], []);

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>SIRADAKİ ETKİNLİK</Text>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.navigate('/etkinlikler')}
        accessibilityRole="button"
        accessibilityLabel={next ? `${next.title}, etkinlik takvimini aç` : 'Etkinlik takvimini aç'}
      >
        {next?.image ? (
          <Image source={next.image} style={styles.thumb} resizeMode="cover" />
        ) : (
          <View style={[styles.thumb, styles.thumbEmpty]}>
            <Ionicons name="calendar-clear-outline" size={24} color={COLORS.gold} />
          </View>
        )}
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={2}>
            {next ? next.title : 'Yeni etkinlikler yakında'}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {next ? `${next.date} · ${next.time}` : 'Takvimi ve kulüp programlarını incele'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 14
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.8,
    marginBottom: 8
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  thumb: {
    width: 58,
    height: 58,
    borderRadius: 14
  },
  thumbEmpty: {
    backgroundColor: COLORS.forest,
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 1,
    gap: 3
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.ink
  },
  meta: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.inkMuted
  }
});
