import React, { createContext, useContext } from 'react';

// Uygulama genelindeki küçük UI eylemleri (menüyü aç, açılış animasyonunu tekrar oynat).
export const AppUiContext = createContext({
  openMenu: () => {},
  replaySplash: () => {}
});

export function useAppUi() {
  return useContext(AppUiContext);
}
