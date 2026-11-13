import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { CLUB_CONFIG } from '../data/mockData';

export default function BottomDock({ activeTab, onTabPress, onMenuPress }) {
  const navItems = [
    { id: 'kesif', label: 'Keşif', icon: 'compass-outline', activeIcon: 'compass' },
    { id: 'rotalar', label: 'Rotalar', icon: 'map-outline', activeIcon: 'map' },
    { id: 'etkinlikler', label: 'Etkinlik', icon: 'calendar-outline', activeIcon: 'calendar' }
  ];

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.dock}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => onTabPress?.(item.id)}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
            >
              <Ionicons
                name={isActive ? item.activeIcon : item.icon}
                size={20}
                color={isActive ? COLORS.ink : COLORS.muted}
              />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* WhatsApp */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            Linking.openURL(
              `https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20Eldivan%20Outdoor%20etkinliklerine%20kat%C4%B1lmak%20istiyorum.`
            )
          }
          style={styles.tabBtn}
        >
          <Ionicons name="logo-whatsapp" size={19} color={COLORS.whatsapp} />
          <Text style={[styles.tabLabel, styles.waLabel]}>WhatsApp</Text>
        </TouchableOpacity>

        {/* Menü */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onMenuPress}
          style={styles.tabBtn}
        >
          <Ionicons name="menu-outline" size={21} color={COLORS.muted} />
          <Text style={styles.tabLabel}>Menü</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    zIndex: 50
  },
  dock: {
    width: '100%',
    maxWidth: 400,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.outline,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 10
  },
  tabBtn: {
    flex: 1,
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  },
  tabBtnActive: {
    backgroundColor: COLORS.sandDark
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.muted
  },
  tabLabelActive: {
    color: COLORS.ink,
    fontWeight: '800'
  },
  waLabel: {
    color: COLORS.whatsappDark,
    fontWeight: '800'
  }
});

