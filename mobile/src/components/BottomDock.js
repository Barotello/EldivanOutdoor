import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { openWhatsApp } from '../utils/links';

export default function BottomDock({ activeTab, onTabPress, onMenuPress }) {
  const insets = useSafeAreaInsets();
  const navItems = [
    { id: 'kesif', label: 'Keşif', icon: 'compass-outline', activeIcon: 'compass' },
    { id: 'rotalar', label: 'Rotalar', icon: 'map-outline', activeIcon: 'map' },
    { id: 'etkinlikler', label: 'Etkinlik', icon: 'calendar-outline', activeIcon: 'calendar' }
  ];

  return (
    <View style={[styles.wrapper, { bottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
      <View style={styles.dock}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => onTabPress?.(item.id)}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={item.label}
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
          onPress={() => openWhatsApp()}
          style={styles.tabBtn}
          accessibilityRole="button"
          accessibilityLabel="WhatsApp ile yaz"
        >
          <Ionicons name="logo-whatsapp" size={19} color={COLORS.whatsapp} />
          <Text style={[styles.tabLabel, styles.waLabel]}>WhatsApp</Text>
        </TouchableOpacity>

        {/* Menü */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onMenuPress}
          style={styles.tabBtn}
          accessibilityRole="button"
          accessibilityLabel="Menüyü aç"
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
    fontSize: 11,
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

