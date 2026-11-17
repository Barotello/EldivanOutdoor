import React from 'react';
import CardDeck from '../components/CardDeck';
import NextEventCard from '../components/NextEventCard';
import QuickActions from '../components/QuickActions';
import ContactFooter from '../components/ContactFooter';

export default function Kesif() {
  return (
    <>
      <CardDeck />
      <NextEventCard />
      <QuickActions />
      <ContactFooter />
    </>
  );
}
