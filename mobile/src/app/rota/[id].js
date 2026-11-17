import React from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import NotFound from '../../components/NotFoundView';
import DetailLayout, { Section, MetricRow } from '../../components/DetailLayout';
import { ROUTES_DATA, CLUB_CONFIG } from '../../data/mockData';
import { openUrl, openWhatsApp } from '../../utils/links';

export default function RotaDetay() {
  const { id } = useLocalSearchParams();
  const route = ROUTES_DATA.find((r) => String(r.id) === String(id));
  if (!route) return <NotFound />;

  return (
    <DetailLayout
      image={route.image}
      tag={route.categoryName}
      title={route.title}
      badges={[
        { label: route.difficulty, icon: 'speedometer-outline' },
        { label: 'Eldivan / Çankırı', icon: 'location-outline' }
      ]}
      actions={[
        {
          label: 'Yol Tarifi',
          icon: 'navigate-outline',
          onPress: () => openUrl(route.mapsUrl || CLUB_CONFIG.meetingPointMapsUrl)
        },
        {
          label: 'Rehber Talep Et',
          icon: 'chatbubble-outline',
          onPress: () =>
            openWhatsApp(`Merhaba, ${route.title} rotası hakkında rehberlik ve detaylı bilgi almak istiyorum.`)
        }
      ]}
    >
      <MetricRow
        items={[
          { label: 'Mesafe', value: route.distance, icon: 'resize-outline' },
          { label: 'Süre', value: route.duration, icon: 'time-outline' },
          { label: 'İrtifa', value: route.elevation, icon: 'trending-up-outline' }
        ]}
      />
      <Section heading="ROTA HAKKINDA" icon="trail-sign-outline">
        {route.desc}
      </Section>
      <Section heading="GÜVENLİK NOTU" icon="shield-checkmark-outline" tone="forest">
        <Text style={{ fontSize: 13.5, lineHeight: 20, color: '#1B1B18' }}>
          Süre ve zorluk tahminidir. Rotaya çıkmadan önce hava durumunu kontrol et, yanına su ve şarjlı
          telefon al, nereye gittiğini kulübe ya da bir yakınına haber ver.
        </Text>
      </Section>
    </DetailLayout>
  );
}
