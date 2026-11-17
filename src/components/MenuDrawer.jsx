import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Map, Users, CloudSun, ShieldCheck, MessageCircle, X } from 'lucide-react';
import { useNavigate } from '../lib/router';
import { useAppUi } from '../context/AppUiContext';
import { CLUB_CONFIG } from '../data/mockData';
import { openUrl, openWhatsApp } from '../lib/links';

export default function MenuDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const { replaySplash } = useAppUi();
  const [expanded, setExpanded] = useState(0);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const toRoutes = (filter) => () => navigate({ pathname: '/rotalar', params: { filter } });

  const groups = [
    {
      title: 'Rotalar & Parkurlar',
      icon: Map,
      items: [
        ['Zirve & Tırmanış', toRoutes('zirve')],
        ['Enduro & Motosiklet', toRoutes('enduro')],
        ['Kamp & Karavan', toRoutes('kamp')],
        ['Dağ Bisikleti', toRoutes('bisiklet')],
        ['Off-Road 4x4', toRoutes('offroad')],
        ['Oryantiring', toRoutes('oryantiring')],
        ['Tüm Rotalar', toRoutes('all')]
      ]
    },
    {
      title: 'Kulüp & Etkinlikler',
      icon: Users,
      items: [
        ['Kulüp Programları', () => navigate('/etkinlikler')],
        ['Etkinlik Takvimi', () => navigate('/etkinlikler')]
      ]
    },
    {
      title: 'Harita & Hava Durumu',
      icon: CloudSun,
      items: [
        ['Hava Durumu', () => navigate('/harita')],
        ['Etkileşimli Harita', () => navigate('/harita')]
      ]
    },
    {
      title: 'Güvenlik',
      icon: ShieldCheck,
      items: [['Güvenlik & SOS', () => navigate('/guvenlik')]]
    },
    {
      title: 'İletişim',
      icon: MessageCircle,
      items: [
        ['WhatsApp İletişim Hattı', () => openWhatsApp('Merhaba, Eldivan Outdoor hakkında bilgi almak istiyorum.')],
        ['Telefonla Ara', () => openUrl(CLUB_CONFIG.phoneHref)],
        ['Buluşma Noktası (Yol Tarifi)', () => openUrl(CLUB_CONFIG.meetingPointMapsUrl)],
        ['Açılış Animasyonunu Oynat', () => replaySplash()]
      ]
    }
  ];

  const run = (action) => {
    onClose();
    setTimeout(action, 120);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center" role="dialog" aria-modal="true" aria-label="Menü">
      <div className="relative w-full max-w-[402px] h-full">
        <button
          type="button"
          aria-label="Menüyü kapat"
          onClick={onClose}
          className="absolute inset-0 bg-black/75 cursor-pointer"
        />
        <aside className="absolute right-0 top-0 h-full w-[84%] max-w-[330px] bg-[#0B0D0C] text-white border-l border-white/10 flex flex-col">
          <div className="flex items-center gap-3 px-4 pt-[max(20px,env(safe-area-inset-top))] pb-4 border-b border-white/10">
            <button
              type="button"
              onClick={() => run(() => navigate('/'))}
              className="flex items-center gap-3 flex-1 text-left cursor-pointer"
              aria-label="Ana sayfaya dön"
            >
              <span className="w-10 h-10 rounded-xl bg-[#234533] border border-white/15 flex items-center justify-center">
                <img src="/images/app-icon.png" alt="" className="w-7 h-7 rounded-md" />
              </span>
              <span>
                <span className="block font-extrabold text-[16px]">Eldivan Outdoor</span>
                <span className="block text-[12px] text-white/60">Doğa & Motor Sporları</span>
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Menüyü kapat"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4">
            <div className="px-2 pb-2 text-[11px] font-bold tracking-[0.14em] text-white/40">MENÜ</div>
            {groups.map((group, idx) => {
              const Icon = group.icon;
              const isOpen = expanded === idx;
              return (
                <div key={group.title}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-2 py-3 rounded-xl hover:bg-white/5 cursor-pointer"
                  >
                    <span className="flex items-center gap-3 font-bold text-[15px]">
                      <Icon className={`w-5 h-5 ${isOpen ? 'text-[#E8B07A]' : 'text-white/70'}`} />
                      {group.title}
                    </span>
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-white/45" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white/45" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="ml-5 pl-3 border-l border-white/15 mb-2">
                      {group.items.map(([label, action]) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => run(action)}
                          className="block w-full text-left px-2 py-2.5 text-[14px] text-white/80 hover:text-white cursor-pointer"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
