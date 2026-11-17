import React, { useRef, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Splash from './src/components/Splash';
import Header from './src/components/Header';
import CardDeck from './src/components/CardDeck';
import RouteExplorer from './src/components/RouteExplorer';
import FieldMap from './src/components/FieldMap';
import ClubEvents from './src/components/ClubEvents';
import ContactFooter from './src/components/ContactFooter';
import BottomDock from './src/components/BottomDock';
import SidebarDrawer from './src/components/SidebarDrawer';
import { COLORS } from './src/theme/colors';

const TAB_SECTIONS = ['kesif', 'rotalar', 'etkinlikler'];

export default function App() {
  const scrollRef = useRef(null);
  const sectionYRef = useRef({});
  const [activeTab, setActiveTab] = useState('kesif');
  const [selectedRouteFilter, setSelectedRouteFilter] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [splashReplayCount, setSplashReplayCount] = useState(0);

  const registerSection = (id) => (event) => {
    sectionYRef.current[id] = event.nativeEvent.layout.y;
  };

  const scrollToSection = (id, options = {}) => {
    if (options.filter) setSelectedRouteFilter(options.filter);
    if (TAB_SECTIONS.includes(id)) setActiveTab(id);
    const y = sectionYRef.current[id] ?? 0;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 6), animated: true });
  };

  // Kaydırırken alt menüde aktif sekmeyi güncelle
  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y + 120;
    const sections = sectionYRef.current;
    let current = 'kesif';
    TAB_SECTIONS.forEach((id) => {
      if (sections[id] != null && y >= sections[id]) current = id;
    });
    if (current !== activeTab) setActiveTab(current);
  };

  const handleCardFilterSelect = (filter) => {
    setSelectedRouteFilter(filter);
    scrollToSection('rotalar');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <Header onLogoPress={() => scrollToSection('kesif')} />

          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={100}
          >
            <View onLayout={registerSection('kesif')}>
              <CardDeck onSelectFilter={handleCardFilterSelect} />
            </View>

            <View onLayout={registerSection('rotalar')}>
              <RouteExplorer
                activeFilter={selectedRouteFilter}
                onFilterChange={setSelectedRouteFilter}
              />
            </View>

            <View onLayout={registerSection('saha')}>
              <FieldMap />
            </View>

            <View onLayout={registerSection('etkinlikler')}>
              <ClubEvents />
            </View>

            <View onLayout={registerSection('iletisim')}>
              <ContactFooter />
            </View>
          </ScrollView>

          <BottomDock
            activeTab={activeTab}
            onTabPress={scrollToSection}
            onMenuPress={() => setDrawerOpen(true)}
          />

          <SidebarDrawer
            visible={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onNavigate={scrollToSection}
            onReplaySplash={() => setSplashReplayCount((c) => c + 1)}
          />

          <Splash replayTrigger={splashReplayCount} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 110
  }
});
