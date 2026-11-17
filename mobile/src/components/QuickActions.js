import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '../theme/colors';
import { openWhatsApp } from '../utils/links';

const ACTIONS = [
  { id: 'sos', label: 'Güvenlik & SOS', icon: 'shield-checkmark-outline', danger: true, onPress: () => router.push('/guvenlik') },
  { id: 'hava', label: 'Hava & Harita', icon: 'partly-sunny-outline', onPress: () => router.navigate('/harita') },
  { id: 'rota', label: 'Rotalar', icon: 'map-outline', onPress: () => router.navigate('/rotalar') },
  { id: 'wa', label: 'WhatsApp', icon: 'logo-whatsapp', onPress: () => openWhatsApp() }
];

export default function QuickActions() {
  return (
    <View style={styles.grid}>
      {ACTIONS.map((a) => (
        <TouchableOpacity
          key={a.id}
          style={[styles.tile, a.danger && styles.tileDanger]}
          onPress={a.onPress}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={a.label}
        >
          <Ionicons
            name={a.icon}
            size={22}
            color={a.danger ? '#B3261E' : a.id === 'wa' ? COLORS.whatsappDark : COLORS.forest}
          />
          <Text style={[styles.label, a.danger && styles.labelDanger]}>{a.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 18,
    paddingBottom: 22
  },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: COLORS.sand,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  tileDanger: {
    backgroundColor: '#FCEDEB',
    borderColor: '#F2C4BF'
  },
  label: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink
  },
  labelDanger: {
    color: '#8C1D18'
  }
});
