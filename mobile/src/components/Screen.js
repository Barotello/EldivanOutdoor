import React, { useRef } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScrollToTop } from 'expo-router';
import Header from './Header';
import { COLORS } from '../theme/colors';

// Sekme ekranları için ortak iskelet: üst marka çubuğu + kaydırılabilir içerik.
// Alt menü (BottomDock) mutlak konumlu olduğu için içerik altına boşluk bırakılır.
export const DOCK_SPACE = 110;

export default function Screen({ children, scroll = true, background = COLORS.white }) {
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: background }]} edges={['top']}>
      <Header />
      {scroll ? (
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={{ paddingBottom: DOCK_SPACE }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, { paddingBottom: DOCK_SPACE }]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  flex: {
    flex: 1
  }
});
