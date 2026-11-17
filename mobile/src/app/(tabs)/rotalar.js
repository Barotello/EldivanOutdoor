import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../../components/Screen';
import RouteExplorer from '../../components/RouteExplorer';
import { COLORS } from '../../theme/colors';

export default function RotalarScreen() {
  const { filter } = useLocalSearchParams();
  const activeFilter = typeof filter === 'string' ? filter : 'all';

  return (
    <Screen background={COLORS.sandLight}>
      <RouteExplorer
        activeFilter={activeFilter}
        onFilterChange={(next) => router.setParams({ filter: next })}
      />
    </Screen>
  );
}
