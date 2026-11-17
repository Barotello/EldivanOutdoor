import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from '../components/Splash';
import SidebarDrawer from '../components/SidebarDrawer';
import { AppUiContext } from '../context/AppUiContext';
import { COLORS } from '../theme/colors';

export default function RootLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [splashReplayCount, setSplashReplayCount] = useState(0);

  const ui = useMemo(
    () => ({
      openMenu: () => setDrawerOpen(true),
      replaySplash: () => setSplashReplayCount((c) => c + 1)
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <AppUiContext.Provider value={ui}>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: COLORS.white }
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="rota/[id]" />
            <Stack.Screen name="aktivite/[id]" />
            <Stack.Screen name="guvenlik" options={{ presentation: 'modal' }} />
            <Stack.Screen
              name="harita-tam"
              options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom', gestureEnabled: false }}
            />
          </Stack>

          <SidebarDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
          <Splash replayTrigger={splashReplayCount} />
        </View>
      </AppUiContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  }
});
