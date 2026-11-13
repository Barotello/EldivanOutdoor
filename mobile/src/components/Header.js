import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { IMAGES } from '../data/mockData';

export default function Header({ onLogoPress }) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onLogoPress}
        style={styles.pill}
      >
        <Image source={IMAGES.appIcon} style={styles.icon} />
        <View style={styles.brandRow}>
          <Text style={styles.brandText}>ELDIVAN</Text>
          <Text style={styles.brandText}>OUTDOOR</Text>
          <Text style={styles.dot}>.</Text>
        </View>
      </TouchableOpacity>
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
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
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

