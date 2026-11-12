import React, { useEffect, useState } from 'react';
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
import ProfileCard from './ProfileCard';
import { CLUB_CONFIG } from '../data/mockData';

export default function DrawerMenu({ isOpen, onClose, onReplaySplash }) {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' veya 'bizkimiz'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const navItems = [
    { id: 'kesif', label: 'Ana Sayfa (Keşfet)', icon: Compass, desc: 'Deste & Hızlı Keşif' },
    { id: 'rotalar', label: 'Rotalar & Parkurlar', icon: Route, desc: 'Dağ & Toprak Rotaları' },
    { id: 'saha', label: 'Saha & Hava Koşulları', icon: CloudSun, desc: 'Canlı Harita & Telemetri' },
    { id: 'etkinlikler', label: 'Kulüp Programları & Takvim', icon: Calendar, desc: 'Deneyimler & Turlar' },
    { id: 'iletisim', label: 'İletişim & Konum', icon: MapPin, desc: 'Buluşma Noktası & Hat' }
  ];

  const handleNavClick = (id) => {
    onClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      elem.focus({ preventScroll: true });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kulüp Menüsü ve Biz Kimiz"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 font-headline ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Lüks Karartılmış Arka Plan (Giriş Ekranı Derinliği) */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Ekranın Tam Ortasında Açılan Modal Kart (Giriş Ekranı Renk Tonu & Teması) */}
      <div
        className={`relative w-full max-w-[390px] max-h-[88vh] bg-[#1F3A2E] text-[#F5F2EA] rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-white/15 flex flex-col overflow-hidden z-10 transform transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-3 opacity-0'
        }`}
      >
        {/* Modal Üst Başlık Çubuğu */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/10 bg-[#162920]">
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
              <div className="text-[10px] font-mono-tech text-[#E8B07A] font-semibold uppercase tracking-wider">
                Doğa ve Motor Sporları
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F5F2EA] hover:bg-white/20 active:scale-95 transition-all border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Segment Kontrol Sekmeleri: Menü vs Biz Kimiz */}
        <div className="px-5 pt-3 pb-2 bg-[#14201A]/90 border-b border-white/10">
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

        {/* Modal İçerik Gövdesi */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {activeTab === 'menu' ? (
            /* ================= SEKME 1: MENÜ & GEZİNME ================= */
            <>
              {/* Sayfa İçi Rota & Bölüm Butonları */}
              <div className="space-y-2">
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className="w-full text-left flex items-center justify-between p-3 rounded-2xl bg-[#14201A]/60 hover:bg-[#2A4A39]/80 active:bg-[#2F5A3E] text-[#F5F2EA] border border-white/10 hover:border-[#E8B07A]/40 transition-all group shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#2A4A39] border border-white/10 flex items-center justify-center text-[#E8B07A] group-hover:bg-[#E8B07A] group-hover:text-[#14201A] transition-colors">
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
                    </button>
                  );
                })}
              </div>

              {/* Hızlı Aksiyonlar: WhatsApp & Animasyonu Tekrar Oynat */}
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
                    onClose();
                    onReplaySplash?.();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#14201A] border border-white/15 text-[#E8B07A] hover:bg-[#2A4A39] hover:text-white text-xs font-mono-tech active:scale-[0.98] transition-all"
                >
                  <PlayCircle className="w-4 h-4 text-[#E8B07A]" />
                  <span>Açılış Animasyonunu Oynat</span>
                </button>
              </div>
            </>
          ) : (
            /* ================= SEKME 2: BİZ KİMİZ ================= */
            <div className="space-y-4">
              {/* Osman Ördek - React Bits Profile Card */}
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

              {/* Resmi Tescil Kartı */}
              <div className="p-3.5 rounded-2xl bg-[#14201A]/85 border border-[#E8B07A]/40 text-white shadow-sm flex items-start gap-3">
                <Award className="w-5 h-5 text-[#E8B07A] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono-tech uppercase font-bold text-[#E8B07A] tracking-wider">
                    RESMİ SPOR KULÜBÜ
                  </div>
                  <div className="font-headline font-bold text-xs mt-0.5 leading-snug text-white">
                    Gençlik ve Spor Bakanlığı'na bağlı tescilli spor kulübü.
                  </div>
                  <div className="text-[10px] font-mono-tech text-[#d6e3d9] mt-1">
                    Sicil No: <span className="font-bold text-white">18-01-00109</span>
                  </div>
                </div>
              </div>

              {/* Kulüp Hikayesi */}
              <div className="p-3.5 rounded-2xl bg-[#14201A]/60 border border-white/10">
                <h4 className="font-headline font-extrabold text-[15px] text-[#E8B07A] mb-1.5">
                  Kulübümüzün Hikayesi
                </h4>
                <p className="text-[#d6e3d9] text-[12px] leading-relaxed">
                  Eldivan Doğa ve Motor Sporları Kulübü (EDMSK), doğaya ve adrenalin dolu aktivitelere tutkuyla bağlı gönüllüler tarafından kuruldu.
                </p>
                <p className="text-[#d6e3d9] text-[12px] leading-relaxed mt-1.5">
                  Amacımız; <strong className="text-white">dağ bisikleti, enduro motosiklet, off-road, kampçılık ve doğa yürüyüşü</strong> gibi farklı alanlarda buluşan insanları bir çatı altında toplayarak birlikte keşfetmek ve spor disiplinini aşılamaktır.
                </p>
              </div>

              {/* Temel Değerlerimiz */}
              <div>
                <h4 className="font-headline font-extrabold text-[15px] text-white mb-2">
                  Değerlerimiz
                </h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[#14201A]/70 border border-white/10 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#E8B07A] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-headline font-bold text-xs text-white">Güvenlik</div>
                      <div className="text-[#d6e3d9] text-[11px] leading-tight mt-0.5">
                        Tüm turlarımızda katılımcı güvenliği ve korumalı ekipman esastır.
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#14201A]/70 border border-white/10 flex items-start gap-2.5">
                    <Leaf className="w-4 h-4 text-[#E8B07A] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-headline font-bold text-xs text-white">Doğaya Saygı</div>
                      <div className="text-[#d6e3d9] text-[11px] leading-tight mt-0.5">
                        İz bırakmama prensibiyle çevreyi ve Eldivan florasını koruruz.
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#14201A]/70 border border-white/10 flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-[#E8B07A] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-headline font-bold text-xs text-white">Topluluk Ruhu</div>
                      <div className="text-[#d6e3d9] text-[11px] leading-tight mt-0.5">
                        Farklı yaş ve deneyim seviyelerindeki tüm doğaseverlere açığız.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logomuzun Anlamı */}
              <div className="p-3 rounded-2xl bg-[#14201A]/80 border border-white/10 text-[11px]">
                <div className="font-headline font-bold text-[#E8B07A] text-xs mb-1">
                  Logomuzun Anlamı
                </div>
                <p className="text-[#d6e3d9] leading-relaxed">
                  Logodaki <strong className="text-white">"E"</strong> harfi Eldivan ilçesini, üzerindeki dağ silüeti <strong className="text-white">İldivan Dağı</strong>'nı, dağın üzerindeki yol figürü ise zirveye ulaşmak için her zaman bir yol bulunduğunu ve mücadele azmini temsil eder.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sabit Alt Bilgi Çubuğu */}
        <div className="px-5 py-3 border-t border-white/10 bg-[#162920] flex items-center justify-between font-mono-tech text-[10px] text-[#d6e3d9]/80">
          <div>
            <span className="font-bold text-white">ELDİVAN / ÇANKIRI</span>
            <span className="block text-[9px] text-[#E8B07A]">{CLUB_CONFIG.coordinates}</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-white">EDMSK HOBİ KULÜBÜ</span>
            <span className="block text-[9px] text-[#d6e3d9]/70">v2.0 PWA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
