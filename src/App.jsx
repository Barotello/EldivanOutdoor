import React, { useState } from 'react';
import Splash from './components/Splash';
import Header from './components/Header';
import CardDeck from './components/CardDeck';
import RouteExplorer from './components/RouteExplorer';
import FieldMap from './components/FieldMap';
import ClubEvents from './components/ClubEvents';
import BottomDock from './components/BottomDock';
import DrawerMenu from './components/DrawerMenu';

export default function App() {
  const [activeTab, setActiveTab] = useState('kesif');
  const [selectedRouteFilter, setSelectedRouteFilter] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCardFilterSelect = (filter) => {
    setSelectedRouteFilter(filter);
    setActiveTab('rotalar');
  };

  return (
    <>
      {/* Açılış Animasyonu (Oturum başına 1 kez) */}
      <Splash />

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

          {/* Bölüm 3: Saha & Canlı Harita (OpenStreetMap) */}
          <FieldMap />

          {/* Bölüm 4: Kulüp Programları & Takvim */}
          <ClubEvents />
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
        />
      </div>
    </>
  );
}
