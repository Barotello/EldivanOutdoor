import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Splash from './components/Splash';
import Header from './components/Header';
import BottomDock from './components/BottomDock';
import MenuDrawer from './components/MenuDrawer';
import NotFoundView from './components/NotFoundView';
import Kesif from './pages/Kesif';
import Rotalar from './pages/Rotalar';
import Etkinlikler from './pages/Etkinlikler';
import Harita from './pages/Harita';
import RotaDetay from './pages/RotaDetay';
import AktiviteDetay from './pages/AktiviteDetay';
import Guvenlik from './pages/Guvenlik';
import HaritaTam from './pages/HaritaTam';
import { RouterProvider, useLocation, matchPath } from './lib/router';
import { AppUiContext } from './context/AppUiContext';

// Mobil uygulamadaki rota yapısıyla aynı: 4 sekme + detay / güvenlik / tam ekran harita ekranları.
const ROUTES = [
  { path: '/', tab: true, render: () => <Kesif /> },
  { path: '/rotalar', tab: true, render: () => <Rotalar /> },
  { path: '/etkinlikler', tab: true, render: () => <Etkinlikler /> },
  { path: '/harita', tab: true, render: () => <Harita /> },
  { path: '/rota/:id', render: (p) => <RotaDetay id={p.id} /> },
  { path: '/aktivite/:id', render: (p) => <AktiviteDetay id={p.id} /> },
  { path: '/guvenlik', render: () => <Guvenlik /> },
  { path: '/harita-tam', render: () => <HaritaTam /> }
];

function resolve(pathname) {
  for (const route of ROUTES) {
    const params = matchPath(route.path, pathname);
    if (params) return { route, params };
  }
  return null;
}

function Screens() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [splashReplayCount, setSplashReplayCount] = useState(0);
  const matched = resolve(pathname);

  const ui = useMemo(
    () => ({
      openMenu: () => setMenuOpen(true),
      replaySplash: () => setSplashReplayCount((c) => c + 1)
    }),
    []
  );
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Yeni ekrana geçince en üste dön
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isTab = !!matched?.route.tab;
  const activePath = pathname.replace(/\/+$/, '') || '/';

  return (
    <AppUiContext.Provider value={ui}>
      <Splash replayTrigger={splashReplayCount} />

      <div
        className={`w-full max-w-[402px] mx-auto min-h-screen bg-white flex flex-col relative shadow-2xl ${
          isTab ? 'pb-[calc(env(safe-area-inset-bottom,0px)+88px)]' : ''
        }`}
      >
        {isTab && <Header />}
        <main className="flex-1 flex flex-col">
          {matched ? matched.route.render(matched.params) : <NotFoundView />}
        </main>
        {isTab && <BottomDock activePath={activePath} />}
      </div>

      <MenuDrawer open={menuOpen} onClose={closeMenu} />
    </AppUiContext.Provider>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <Screens />
    </RouterProvider>
  );
}
