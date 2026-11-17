import React from 'react';
import Screen from '../../components/Screen';
import CardDeck from '../../components/CardDeck';
import QuickActions from '../../components/QuickActions';
import NextEventCard from '../../components/NextEventCard';
import ContactFooter from '../../components/ContactFooter';

export default function KesifScreen() {
  return (
    <Screen>
      <CardDeck />
      <NextEventCard />
      <QuickActions />
      <ContactFooter />
    </Screen>
  );
}
