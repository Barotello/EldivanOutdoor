import React from 'react';
import { ShieldCheck, CloudSun, Map, MessageCircle } from 'lucide-react';
import { useNavigate } from '../lib/router';
import { openWhatsApp } from '../lib/links';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { id: 'sos', label: 'Güvenlik & SOS', icon: ShieldCheck, danger: true, onClick: () => navigate('/guvenlik') },
    { id: 'hava', label: 'Hava & Harita', icon: CloudSun, onClick: () => navigate('/harita') },
    { id: 'rota', label: 'Rotalar', icon: Map, onClick: () => navigate('/rotalar') },
    { id: 'wa', label: 'WhatsApp', icon: MessageCircle, whatsapp: true, onClick: () => openWhatsApp() }
  ];

  return (
    <section className="grid grid-cols-2 gap-2.5 px-3.5 pb-5">
      {actions.map(({ id, label, icon: Icon, danger, whatsapp, onClick }) => (
        <button
          key={id}
          type="button"
          onClick={onClick}
          className={`flex items-center gap-2.5 px-3.5 py-3.5 rounded-2xl border text-left cursor-pointer active:scale-[0.98] transition ${
            danger ? 'bg-[#FCEDEB] border-[#F2C4BF]' : 'bg-sand border-light-outline-variant'
          }`}
        >
          <Icon
            className={`w-[22px] h-[22px] flex-shrink-0 ${
              danger ? 'text-[#B3261E]' : whatsapp ? 'text-[#1F7A42]' : 'text-forest'
            }`}
          />
          <span className={`font-headline font-extrabold text-[13px] ${danger ? 'text-[#8C1D18]' : 'text-ink'}`}>
            {label}
          </span>
        </button>
      ))}
    </section>
  );
}
