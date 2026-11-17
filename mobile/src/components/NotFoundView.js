import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function NotFoundView() {
  return (
    <View style={styles.container}>
      <Ionicons name="trail-sign-outline" size={42} color={COLORS.accent} />
      <Text style={styles.title}>Bu patika bulunamadı</Text>
      <Text style={styles.desc}>Aradığın sayfa kaldırılmış ya da adresi değişmiş olabilir.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/')} accessibilityRole="button">
        <Text style={styles.btnText}>Ana sayfaya dön</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 10, backgroundColor: COLORS.sandLight },
  title: { fontSize: 20, fontWeight: '900', color: COLORS.ink },
  desc: { fontSize: 14, color: COLORS.inkMuted, textAlign: 'center' },
  btn: { marginTop: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999, backgroundColor: COLORS.forest },
  btnText: { color: COLORS.white, fontWeight: '800' }
});
