import React, { useState } from 'react';
import {
  SquareTerminal,
  Bot,
  BookOpen,
  SlidersHorizontal,
  ChevronRight,
  ChevronsUpDown,
  Phone,
  MessageCircle,
  MapPin,
  RotateCcw,
  Sparkles,
  ExternalLink,
  X
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { CLUB_CONFIG } from '../data/mockData';

export function AppSidebar({ onReplaySplash, ...props }) {
  const { setOpenMobile, setOpen } = useSidebar();
  const [showOsmanModal, setShowOsmanModal] = useState(false);

  const handleClose = () => {
    setOpenMobile(false);
    setOpen(false);
  };

  const handleScrollTo = (id) => {
    handleClose();
    setTimeout(() => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        elem.focus({ preventScroll: true });
      }
    }, 120);
  };

  const handleTriggerSplash = () => {
    handleClose();
    if (onReplaySplash) {
      onReplaySplash();
    } else {
      window.dispatchEvent(new CustomEvent('replay-splash'));
    }
  };

  // Platform Ana Menü Verileri (Büyük yazı ve ikon formatı)
  const navItems = [
    {
      title: 'Rotalar & Parkurlar',
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: 'Zirve & Tırmanış (Çaşnigir)', action: () => handleScrollTo('rotalar') },
        { title: 'Enduro & Motosiklet Parkuru', action: () => handleScrollTo('rotalar') },
        { title: 'Kanyon, Vadi & Kamp Yolu', action: () => handleScrollTo('rotalar') },
        { title: 'Tüm Rotaları İncele', action: () => handleScrollTo('rotalar') },
      ],
    },
    {
      title: 'Kulüp & Etkinlikler',
      icon: Bot,
      items: [
        { title: 'Haftalık Enduro Sürüşü', action: () => handleScrollTo('etkinlikler') },
        { title: 'Doğada Hayatta Kalma Kampı', action: () => handleScrollTo('etkinlikler') },
        { title: 'Zirve Foto Safari', action: () => handleScrollTo('etkinlikler') },
        { title: 'Tüm Program Takvimi', action: () => handleScrollTo('etkinlikler') },
      ],
    },
    {
      title: 'Saha & Canlı Durum',
      icon: BookOpen,
      items: [
        { title: 'Canlı Hava & Rüzgar (14°C)', action: () => handleScrollTo('saha') },
        { title: 'Zemin & Parkur Telemetrisi', action: () => handleScrollTo('saha') },
        { title: 'GPS Canlı Saha Haritası', action: () => handleScrollTo('saha') },
      ],
    },
    {
      title: 'Ayarlar & İletişim',
      icon: SlidersHorizontal,
      items: [
        {
          title: 'WhatsApp İletişim Hattı',
          action: () => {
            window.open(
              `https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20Eldivan%20Outdoor%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`,
              '_blank',
              'noopener,noreferrer'
            );
          },
        },
        { title: 'Buluşma Noktası & Konum', action: () => handleScrollTo('iletisim') },
        { title: 'Açılış Animasyonunu Oynat', action: handleTriggerSplash },
      ],
    },
  ];

  return (
    <>
      <Sidebar
        side="right"
        className="border-l border-white/10 bg-[#121513] text-[#F5F2EA] font-headline select-none"
        {...props}
      >
        {/* Üst Header: Logo, Marka Başlığı ve Çift Ok Tetikleyici */}
        <SidebarHeader className="border-b border-white/10 p-2.5">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                onClick={() => handleScrollTo('kesif')}
                className="hover:bg-white/5 active:bg-white/10 text-left transition-colors rounded-xl px-3 py-2.5 group cursor-pointer"
              >
                <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-[#234533] border border-white/15 text-white shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                  <img
                    src="/images/app-icon.png"
                    alt="Eldivan Outdoor"
                    className="size-6 rounded-md object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left leading-tight ml-3">
                  <span className="truncate font-headline font-bold text-white text-[16px] tracking-tight">
                    Eldivan Outdoor
                  </span>
                  <span className="truncate text-[12px] font-mono-tech text-white/60 font-normal mt-0.5">
                    Doğa &amp; Motor Sporları
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4.5 text-white/40 group-hover:text-white/70 transition-colors" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Ana İçerik: Platform Başlığı ve Açılır Menü Ağacı */}
        <SidebarContent className="px-2.5 py-3 space-y-2.5 overflow-y-auto">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="text-[12px] font-mono-tech text-white/45 font-semibold tracking-wider px-2.5 py-1.5 uppercase">
              Platform
            </SidebarGroupLabel>

            <SidebarMenu className="gap-1.5 mt-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className="w-full justify-between hover:bg-white/8 active:bg-white/12 text-white/95 hover:text-white px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <IconComponent className="size-5 text-white/75 group-hover/collapsible:text-[#E8B07A] transition-colors flex-shrink-0" />
                            <span className="text-[15px] font-headline font-semibold text-white truncate">
                              {item.title}
                            </span>
                          </div>
                          <ChevronRight className="ml-auto size-4.5 text-white/40 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-hover/collapsible:text-white/70" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub className="mx-4 my-1 flex min-w-0 flex-col gap-1 border-l-2 border-white/15 pl-3 py-1">
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                onClick={subItem.action}
                                className="h-8.5 text-[14px] font-body text-white/70 hover:text-white hover:bg-white/8 active:bg-white/12 rounded-lg px-2.5 transition-colors cursor-pointer flex items-center justify-between"
                              >
                                <button type="button" className="w-full text-left">
                                  <span className="truncate">{subItem.title}</span>
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Alt Footer: Kullanıcı Profili (Osman Ördek) & Detay Paneli */}
        <SidebarFooter className="border-t border-white/10 p-2.5 bg-[#0E1210]/70">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                onClick={() => setShowOsmanModal(true)}
                className="hover:bg-white/5 active:bg-white/10 text-left transition-colors rounded-xl px-3 py-2 group cursor-pointer"
              >
                <div className="relative size-9 rounded-full overflow-hidden border border-white/25 flex-shrink-0 shadow-xs">
                  <img
                    src="/images/osman.jpg"
                    alt="Osman Ördek"
                    className="size-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.src = '/images/app-icon.png';
                    }}
                  />
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-[#25D366] border-2 border-[#121513]" />
                </div>
                <div className="grid flex-1 text-left leading-tight ml-3">
                  <span className="truncate font-headline font-bold text-white text-[14.5px]">
                    Osman Ördek
                  </span>
                  <span className="truncate text-[11.5px] font-mono-tech text-white/50 mt-0.5">
                    Kurucu • WhatsApp Hattı
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4.5 text-white/40 group-hover:text-white/70 transition-colors" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Osman Ördek Profil & Hızlı İletişim Modal Kartı */}
      {showOsmanModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={() => setShowOsmanModal(false)}
        >
          <div
            className="w-full max-w-sm bg-[#16241D] border border-white/15 rounded-2xl p-5 shadow-2xl text-[#F5F2EA] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Üst Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#E8B07A]" />
                <span className="font-mono-tech text-xs font-bold uppercase tracking-wider text-[#E8B07A]">
                  Kulüp Koordinatörü
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowOsmanModal(false)}
                className="size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Profil Görseli & İsim */}
            <div className="flex items-center gap-3.5">
              <img
                src="/images/osman.jpg"
                alt="Osman Ördek"
                className="size-16 rounded-2xl object-cover object-top border-2 border-[#E8B07A]/40 shadow-md"
                onError={(e) => {
                  e.currentTarget.src = '/images/app-icon.png';
                }}
              />
              <div>
                <h3 className="font-headline font-bold text-lg text-white">
                  Osman Ördek
                </h3>
                <p className="text-xs font-mono-tech text-[#E8B07A] font-semibold mt-0.5">
                  Eldivan Outdoor Kurucusu &amp; Rehber
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 text-[12px] text-white/60">
                  <MapPin className="size-3.5 text-[#E8B07A]" />
                  <span>Çankırı / Eldivan</span>
                </div>
              </div>
            </div>

            <p className="text-[13px] text-white/85 leading-relaxed font-body">
              Eldivan dağları, orman parkurları ve enduro rotalarında rehberli keşifler ve topluluk sürüşleri organize ediyoruz.
            </p>

            {/* İletişim Butonları */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 font-headline">
              <a
                href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba%20Osman%20Bey,%20Eldivan%20Outdoor%20etkinlikleri%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-[#0F1C16] font-bold text-[13px] flex items-center justify-center gap-1.5 transition-all shadow-md no-underline"
              >
                <MessageCircle className="size-4.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${CLUB_CONFIG.whatsappNumber}`}
                className="h-11 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-[13px] flex items-center justify-center gap-1.5 transition-all border border-white/10 no-underline"
              >
                <Phone className="size-4.5" />
                <span>Hemen Ara</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppSidebar;
