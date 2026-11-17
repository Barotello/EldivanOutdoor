import { Linking, Alert } from 'react-native';
import { CLUB_CONFIG } from '../data/mockData';

export function whatsappUrl(message) {
  return `https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export async function openUrl(url) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('Bağlantı açılamadı', 'Lütfen daha sonra tekrar deneyin.');
  }
}

export function openWhatsApp(message = 'Merhaba, Eldivan Outdoor etkinliklerine katılmak istiyorum.') {
  return openUrl(whatsappUrl(message));
}
