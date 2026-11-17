import { CLUB_CONFIG } from '../data/mockData';

export function whatsappUrl(message) {
  return `https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function openUrl(url) {
  if (typeof window === 'undefined') return;
  if (url.startsWith('tel:') || url.startsWith('mailto:')) {
    window.location.href = url;
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openWhatsApp(message = 'Merhaba, Eldivan Outdoor etkinliklerine katılmak istiyorum.') {
  openUrl(whatsappUrl(message));
}
