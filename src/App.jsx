import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Header from './components/Header';
import CardDeck from './components/CardDeck';
import RouteExplorer from './components/RouteExplorer';
import FieldMap from './components/FieldMap';
import ClubEvents from './components/ClubEvents';
import ContactFooter from './components/ContactFooter';
import BottomDock from './components/BottomDock';
import DrawerMenu from './components/DrawerMenu';

export default function App() {
  const [activeTab, setActiveTab] = useState('kesif');
  const [selectedRouteFilter, setSelectedRouteFilter] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [splashReplayCount, setSplashReplayCount] = useState(0);

  const handleCardFilterSelect = (filter) => {
    setSelectedRouteFilter(filter);
    setActiveTab('rotalar');
  };

  useEffect(() => {
    const sectionIds = ['kesif', 'rotalar', 'etkinlikler'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              setActiveTab(id);
            }
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));

    const supportsScrollTargetGroup =
      typeof CSS !== 'undefined' && CSS.supports?.('scroll-target-group: auto');

    const syncAriaCurrent = () => {
      const currentLink = document.querySelector('.scrollspy-nav a:target-current');
      if (currentLink) {
        const href = currentLink.getAttribute('href');
        if (href?.startsWith('#')) {
          setActiveTab(href.slice(1));
        }
      }
    };

    if (supportsScrollTargetGroup) {
      document.addEventListener('scrollend', syncAriaCurrent);
    }

    return () => {
      observer.disconnect();
      if (supportsScrollTargetGroup) {
        document.removeEventListener('scrollend', syncAriaCurrent);
      }
    };
  }, []);

  return (
    <>
      {/* Açılış Animasyonu (Oturum başına 1 kez + Menüden Tekrar Oynatılabilir) */}
      <Splash replayTrigger={splashReplayCount} />

      {/* iPhone 17 Pro Uyumlu 402px Kapsayıcı */}
      <div className="w-full max-w-[402px] mx-auto min-h-screen bg-white flex flex-col relative pb-[calc(env(safe-area-inset-bottom,0px)+96px)] shadow-2xl">
        <Header />

        <main className="flex-1 flex flex-col">
          {/* Bölüm 1: Keşif & 3D Deste Kartları */}
          <CardDeck onSelectFilter={handleCardFilterSelect} />

          {/* Bölüm 2: Rotalar & Parkurlar */}
          <RouteExplorer
            activeFilter={selectedRouteFilter}
            onFilterChange={setSelectedRouteFilter}
          />

          {/* Bölüm 3: Saha, Hava Koşulları & Canlı Harita */}
          <FieldMap />

          {/* Bölüm 4: Kulüp Programları, Paketler & Takvim */}
          <ClubEvents />

          {/* Bölüm 5: İletişim, Hızlı Aksiyonlar & Atatürk Anma Footer */}
          <ContactFooter />
        </main>

        {/* 5'li Sabit Alt Dock */}
        <BottomDock
          activeTab={activeTab}
          onTabSelect={setActiveTab}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />

        {/* Mobil Yan Çekmece Menü */}
        <DrawerMenu
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onReplaySplash={() => setSplashReplayCount((c) => c + 1)}
        />
      </div>
    </>
  );
}
