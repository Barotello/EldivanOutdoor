import React from 'react';
import Screen from '../../components/Screen';
import ClubEvents from '../../components/ClubEvents';
import { COLORS } from '../../theme/colors';

export default function EtkinliklerScreen() {
  return (
    <Screen background={COLORS.sandLight}>
      <ClubEvents />
    </Screen>
  );
}
