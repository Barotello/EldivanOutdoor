import React from 'react';
import { Flag, Tag, Compass, Backpack, Info, MapPin, Map, MessageCircle } from 'lucide-react';
import DetailLayout, { Section } from '../components/DetailLayout';
import NotFound from '../components/NotFoundView';
import { CARDS_DATA, CLUB_CONFIG } from '../data/mockData';
import { openWhatsApp } from '../lib/links';
import { useNavigate } from '../lib/router';

export default function AktiviteDetay({ id }) {
  const navigate = useNavigate();
  const card = CARDS_DATA.find((c) => c.id === id);
  if (!card) return <NotFound />;

  return (
    <DetailLayout
      image={card.image}
      tag={card.badge}
      title={card.detailTitle}
      badges={[
        { label: card.dist, icon: Flag },
        { label: card.tag, icon: Tag }
      ]}
      actions={[
        {
          label: 'Rotaları Gör',
          icon: Map,
          onClick: () => navigate({ pathname: '/rotalar', params: { filter: card.filter } })
        },
        {
          label: 'Bilgi & Kayıt',
          icon: MessageCircle,
          onClick: () =>
            openWhatsApp(`Merhaba, ${card.detailTitle} etkinliği hakkında bilgi ve kayıt almak istiyorum.`)
        }
      ]}
    >
      <Section heading="YAPILACAK ETKİNLİK" icon={Compass}>
        {card.activityDetails || card.desc}
      </Section>
      {card.equipment ? (
        <Section heading="GEREKLİ EKİPMAN & HAZIRLIK" icon={Backpack}>
          {card.equipment}
        </Section>
      ) : null}
      <Section heading="PARKUR BİLGİSİ" icon={Info} tone="forest">
        {card.meta}
      </Section>
      <Section heading="BULUŞMA NOKTASI" icon={MapPin}>
        {CLUB_CONFIG.address}
      </Section>
    </DetailLayout>
  );
}
