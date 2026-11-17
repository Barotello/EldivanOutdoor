import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { useAppUi } from '../context/AppUiContext';

const TAB_ICONS = {
  index: { icon: 'compass-outline', activeIcon: 'compass' },
  rotalar: { icon: 'map-outline', activeIcon: 'map' },
  etkinlikler: { icon: 'calendar-outline', activeIcon: 'calendar' },
  harita: { icon: 'navigate-outline', activeIcon: 'navigate' }
};

// Expo Router Tabs için özel alt menü (tabBar).
// Not: Expo Router 58'de tabBar'a `navigation` değil `emitter` ve `navigateToTab` gelir.
export default function BottomDock({ state, descriptors, emitter, navigateToTab }) {
  const insets = useSafeAreaInsets();
  const { openMenu } = useAppUi();

  return (
    <View style={[styles.wrapper, { bottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
      <View style={styles.dock}>
        {state.routes.map((route, index) => {
          const isActive = state.index === index;
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const icons = TAB_ICONS[route.name] ?? TAB_ICONS.index;

          const onPress = () => {
            const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isActive && !event.defaultPrevented) navigateToTab(route.key);
          };

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.8}
              onPress={onPress}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={label}
            >
              <Ionicons
                name={isActive ? icons.activeIcon : icons.icon}
                size={20}
                color={isActive ? COLORS.ink : COLORS.muted}
              />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]} numberOfLines={1} maxFontSizeMultiplier={1.2}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openMenu}
          style={styles.tabBtn}
          accessibilityRole="button"
          accessibilityLabel="Menüyü aç"
        >
          <Ionicons name="menu-outline" size={21} color={COLORS.muted} />
          <Text style={styles.tabLabel} numberOfLines={1} maxFontSizeMultiplier={1.2}>
            Menü
          </Text>
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

