import React, { useState } from 'react';
import {
  X,
  Compass,
  Route,
  Calendar,
  CloudSun,
  MapPin,
  PlayCircle,
  ShieldCheck,
  Leaf,
  Users,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';
import ProfileCard from './ProfileCard';
import { CLUB_CONFIG } from '../data/mockData';

export default function AppSidebar({ onReplaySplash }) {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'bizkimiz'
  const { setOpenMobile, setOpen } = useSidebar();

  const handleClose = () => {
    setOpenMobile(false);
    setOpen(false);
  };

  const navItems = [
    { id: 'kesif', label: 'Ana Sayfa (Keşfet)', icon: Compass, desc: 'Deste & Hızlı Keşif' },
    { id: 'rotalar', label: 'Rotalar & Parkurlar', icon: Route, desc: 'Dağ & Toprak Rotaları' },
    { id: 'saha', label: 'Saha & Hava Koşulları', icon: CloudSun, desc: 'Canlı Harita & Telemetri' },
    { id: 'etkinlikler', label: 'Kulüp Programları & Takvim', icon: Calendar, desc: 'Deneyimler & Turlar' },
    { id: 'iletisim', label: 'İletişim & Konum', icon: MapPin, desc: 'Buluşma Noktası & Hat' }
  ];

  const handleNavClick = (id) => {
    handleClose();
    setTimeout(() => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        elem.focus({ preventScroll: true });
      }
    }, 150);
  };

  return (
    <Sidebar side="left" className="border-r border-white/10 font-headline bg-[#1F3A2E] text-[#F5F2EA]">
      {/* Üst Başlık Çubuğu */}
      <SidebarHeader className="px-5 pt-4 pb-3 border-b border-white/10 bg-[#162920] flex flex-row items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/images/app-icon.png"
            alt="Eldivan Outdoor"
            className="w-8 h-8 rounded-full shadow-md border border-white/20 object-cover"
          />
          <div>
            <div className="font-headline font-black text-[17px] text-white leading-tight">
              ELDIVAN OUTDOOR<span className="text-[#E8B07A]">.</span>
            </div>
            <div className="text-[10px] font-mono-tech text-[#E8B07A] font-semibold uppercase tracking-wider mt-0.5">
              Doğa ve Motor Sporları
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Menüyü Kapat"
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F5F2EA] hover:bg-white/20 active:scale-95 transition-all border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </SidebarHeader>

      {/* Segment Kontrolleri: Menü vs Biz Kimiz */}
      <div className="px-5 pt-3 pb-2 bg-[#14201A]/95 border-b border-white/10">
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#1F3A2E] border border-white/10 font-mono-tech text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('menu')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'menu'
                ? 'bg-[#2F5A3E] text-white shadow-sm border border-white/15'
                : 'text-[#d6e3d9]/70 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#E8B07A]" />
            <span>Gezinme &amp; Menü</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bizkimiz')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'bizkimiz'
                ? 'bg-[#2F5A3E] text-white shadow-sm border border-white/15'
                : 'text-[#d6e3d9]/70 hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-[#E8B07A]" />
            <span>Biz Kimiz?</span>
          </button>
        </div>
      </div>

      {/* Ana Gövde */}
      <SidebarContent className="px-5 py-4 space-y-4 overflow-y-auto">
        {activeTab === 'menu' ? (
          <div className="space-y-4">
            <SidebarGroup className="p-0">
              <SidebarGroupLabel className="text-[10px] font-mono-tech text-[#E8B07A] font-bold uppercase tracking-wider px-0 mb-1">
                PARKURLAR &amp; SAYFA BÖLÜMLERİ
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                  {navItems.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          asChild
                          className="w-full text-left flex items-center justify-between p-3 h-auto rounded-2xl bg-[#14201A]/60 hover:bg-[#2A4A39]/80 active:bg-[#2F5A3E] text-[#F5F2EA] border border-white/10 hover:border-[#E8B07A]/40 transition-all group shadow-sm cursor-pointer"
                          onClick={() => handleNavClick(item.id)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-[#2A4A39] border border-white/10 flex items-center justify-center text-[#E8B07A] group-hover:bg-[#E8B07A] group-hover:text-[#14201A] transition-colors flex-shrink-0">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="font-headline font-bold text-sm text-white leading-tight">
                                  {item.label}
                                </div>
                                <div className="text-[11px] font-mono-tech text-[#d6e3d9]/80 mt-0.5">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#d6e3d9]/60 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="pt-2 space-y-2 border-t border-white/10">
              <a
                href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20Eldivan%20Outdoor%20etkinliklerine%20kat%C4%B1lmak%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-mono-tech text-xs font-bold hover:bg-[#1fbb59] active:scale-[0.98] transition-all shadow-md"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp ile Hızlı Mesaj</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onReplaySplash?.();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#14201A] border border-white/15 text-[#E8B07A] hover:bg-[#2A4A39] hover:text-white text-xs font-mono-tech active:scale-[0.98] transition-all"
              >
                <PlayCircle className="w-4 h-4 text-[#E8B07A]" />
                <span>Açılış Animasyonunu Oynat</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center pt-1 pb-1">
              <ProfileCard
                avatarUrl="/images/osman.jpg"
                miniAvatarUrl="/images/app-icon.png"
                iconUrl="/images/app-icon.png"
                name="Osman Ördek"
                title="Eldivan Outdoor Kulüp Lideri"
                handle="eldivanoutdoor"
                status="Saha & Doğa Rehberi"
                statusColor="#22c55e"
                contactText="WhatsApp"
                theme="dark"
                backdropColor="#14201A"
                enableTilt={true}
                enableMobileTilt={true}
                tiltStrength={10}
                radius={18}
                onContactClick={() => {
                  window.open(
                    `https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba%20Osman%20Bey,%20Eldivan%20Outdoor%20etkinlikleri%20hakkinda%20bilgi%20almak%20istiyorum.`,
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#14201A]/85 border border-[#E8B07A]/40 text-white shadow-sm flex items-start gap-3">
              <Award className="w-5 h-5 text-[#E8B07A] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-mono-tech uppercase font-bold text-[#E8B07A] tracking-wider">
                  RESMİ SPOR KULÜBÜ
                </div>
                <div className="font-headline font-bold text-xs mt-0.5 leading-snug text-white">
                  Gençlik ve Spor Bakanlığı'na bağlı tescilli spor kulübü.
                </div>
                <div className="text-[11px] font-mono-tech text-[#d6e3d9]/80 mt-1">
                  Kulüp Kütük No: <strong className="text-white">18-01-00109</strong>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#14201A]/70 border border-white/10 text-white space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-[#E8B07A] font-bold font-mono-tech text-[11px]">
                <Leaf className="w-4 h-4" />
                <span>DOĞA, SPOR &amp; ELDİVAN SEVDASI</span>
              </div>
              <p className="text-[#d6e3d9] leading-relaxed">
                Eldivan Outdoor; Çankırı'nın eşsiz doğasını, yaylalarını, dağlarını ve zorlu toprak yollarını keşfetmek amacıyla kurulmuş resmi doğa ve motor sporları kulübüdür.
              </p>
              <p className="text-[#d6e3d9] leading-relaxed">
                Enduro motosiklet turlarından yayla kamplarına, dağ bisikletinden aile doğa yürüyüşlerine kadar her yaştan doğasevere güvenli outdoor deneyimleri sunuyoruz.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-tech">
              <div className="p-2.5 rounded-xl bg-[#14201A]/80 border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E8B07A]" />
                <span>Güvenlik &amp; Disiplin</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#14201A]/80 border border-white/10 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#22c55e]" />
                <span>Sıfır Atık / Doğa</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#14201A]/80 border border-white/10 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#E8B07A]" />
                <span>Takım Ruhu</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#14201A]/80 border border-white/10 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#38bdf8]" />
                <span>Keşif &amp; Rota</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#162920] border border-white/10 text-[11px] text-[#d6e3d9]/90 italic leading-relaxed text-center">
              "Ben sporcunun zeki, çevik ve aynı zamanda ahlaklısını severim."
              <div className="text-[10px] text-[#E8B07A] not-italic font-bold font-mono-tech mt-1">
                — Mustafa Kemal Atatürk
              </div>
            </div>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="px-5 py-3 border-t border-white/10 bg-[#162920] text-center text-[10px] font-mono-tech text-[#d6e3d9]/70">
        <div>Eldivan, Çankırı · 40.5700° N, 33.5250° E</div>
        <div className="mt-0.5 text-white/50">Tescilli Spor Kulübü © 2026</div>
      </SidebarFooter>
    </Sidebar>
  );
}
