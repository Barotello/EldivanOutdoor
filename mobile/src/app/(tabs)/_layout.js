import React from 'react';
import { Tabs } from 'expo-router/js-tabs';
import BottomDock from '../../components/BottomDock';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <BottomDock {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Keşif' }} />
      <Tabs.Screen name="rotalar" options={{ title: 'Rotalar' }} />
      <Tabs.Screen name="etkinlikler" options={{ title: 'Etkinlik' }} />
      <Tabs.Screen name="harita" options={{ title: 'Harita' }} />
    </Tabs>
  );
}
