import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '../theme/colors';
import { IMAGES } from '../data/mockData';
import { openWhatsApp } from '../utils/links';

export default function Header() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.pill}>
        <TouchableOpacity
          onPress={() => router.push('/guvenlik')}
          style={styles.sideBtn}
          accessibilityRole="button"
          accessibilityLabel="Güvenlik ve SOS"
          hitSlop={6}
        >
          <Ionicons name="shield-checkmark-outline" size={20} color="#B3261E" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.navigate('/')}
          style={styles.brand}
          accessibilityRole="button"
          accessibilityLabel="Eldivan Outdoor ana sayfa"
        >
          <Image source={IMAGES.appIcon} style={styles.icon} />
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>ELDIVAN</Text>
            <Text style={styles.brandText}>OUTDOOR</Text>
            <Text style={styles.dot}>.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openWhatsApp()}
          style={styles.sideBtn}
          accessibilityRole="button"
          accessibilityLabel="WhatsApp ile yaz"
          hitSlop={6}
        >
          <Ionicons name="logo-whatsapp" size={21} color={COLORS.whatsapp} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 6,
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  pill: {
    width: '100%',
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.outline,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sideBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  brandText: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.4,
    color: COLORS.ink
  },
  dot: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 20,
    color: COLORS.accent
  }
});

