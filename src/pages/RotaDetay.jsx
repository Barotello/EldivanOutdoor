import React from 'react';
import { Gauge, MapPin, Ruler, Clock, TrendingUp, Signpost, ShieldCheck, Navigation, MessageCircle } from 'lucide-react';
import DetailLayout, { Section, MetricRow } from '../components/DetailLayout';
import NotFound from '../components/NotFoundView';
import { ROUTES_DATA, CLUB_CONFIG } from '../data/mockData';
import { openUrl, openWhatsApp } from '../lib/links';

export default function RotaDetay({ id }) {
  const route = ROUTES_DATA.find((r) => String(r.id) === String(id));
  if (!route) return <NotFound />;

  return (
    <DetailLayout
      image={route.image}
      tag={route.categoryName}
      title={route.title}
      badges={[
        { label: route.difficulty, icon: Gauge },
        { label: 'Eldivan / Çankırı', icon: MapPin }
      ]}
      actions={[
        {
          label: 'Yol Tarifi',
          icon: Navigation,
          onClick: () => openUrl(route.mapsUrl || CLUB_CONFIG.meetingPointMapsUrl)
        },
        {
          label: 'Rehber Talep Et',
          icon: MessageCircle,
          onClick: () =>
            openWhatsApp(`Merhaba, ${route.title} rotası hakkında rehberlik ve detaylı bilgi almak istiyorum.`)
        }
      ]}
    >
      <MetricRow
        items={[
          { label: 'Mesafe', value: route.distance, icon: Ruler },
          { label: 'Süre', value: route.duration, icon: Clock },
          { label: 'İrtifa', value: route.elevation, icon: TrendingUp }
        ]}
      />
      <Section heading="ROTA HAKKINDA" icon={Signpost}>
        {route.desc}
      </Section>
      <Section heading="GÜVENLİK NOTU" icon={ShieldCheck} tone="forest">
        Süre ve zorluk tahminidir. Rotaya çıkmadan önce hava durumunu kontrol et, yanına su ve şarjlı telefon al,
        nereye gittiğini kulübe ya da bir yakınına haber ver.
      </Section>
    </DetailLayout>
  );
}
