import React from 'react';
import Screen from '../../components/Screen';
import FieldMap from '../../components/FieldMap';
import { COLORS } from '../../theme/colors';

export default function HaritaScreen() {
  return (
    <Screen background={COLORS.sand}>
      <FieldMap />
    </Screen>
  );
}
