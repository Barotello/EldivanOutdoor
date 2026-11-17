import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import NotFound from '../../components/NotFoundView';
import DetailLayout, { Section } from '../../components/DetailLayout';
import { CARDS_DATA, CLUB_CONFIG } from '../../data/mockData';
import { openWhatsApp } from '../../utils/links';

export default function AktiviteDetay() {
  const { id } = useLocalSearchParams();
  const card = CARDS_DATA.find((c) => c.id === id);
  if (!card) return <NotFound />;

  return (
    <DetailLayout
      image={card.image}
      tag={card.badge}
      title={card.detailTitle}
      badges={[{ label: card.dist, icon: 'flag-outline' }, { label: card.tag, icon: 'pricetag-outline' }]}
      actions={[
        {
          label: 'Rotaları Gör',
          icon: 'map-outline',
          onPress: () => router.navigate({ pathname: '/rotalar', params: { filter: card.filter } })
        },
        {
          label: 'Bilgi & Kayıt',
          icon: 'chatbubble-outline',
          onPress: () =>
            openWhatsApp(`Merhaba, ${card.detailTitle} etkinliği hakkında bilgi ve kayıt almak istiyorum.`)
        }
      ]}
    >
      <Section heading="YAPILACAK ETKİNLİK" icon="compass-outline">
        {card.activityDetails || card.desc}
      </Section>
      {card.equipment ? (
        <Section heading="GEREKLİ EKİPMAN & HAZIRLIK" icon="bag-check-outline">
          {card.equipment}
        </Section>
      ) : null}
      <Section heading="PARKUR BİLGİSİ" icon="information-circle-outline" tone="forest">
        {card.meta}
      </Section>
      <Section heading="BULUŞMA NOKTASI" icon="location-outline">
        {CLUB_CONFIG.address}
      </Section>
    </DetailLayout>
  );
}
