import { useCallback, useEffect, useState } from 'react';

// Open-Meteo: ücretsiz, API anahtarı gerektirmez. https://open-meteo.com
const WEATHER_CODES = {
  0: 'Açık',
  1: 'Az bulutlu',
  2: 'Parçalı bulutlu',
  3: 'Kapalı',
  45: 'Sisli',
  48: 'Kırağılı sis',
  51: 'Hafif çisenti',
  53: 'Çisenti',
  55: 'Yoğun çisenti',
  61: 'Hafif yağmur',
  63: 'Yağmurlu',
  65: 'Kuvvetli yağmur',
  71: 'Hafif kar',
  73: 'Karlı',
  75: 'Yoğun kar',
  80: 'Sağanak',
  81: 'Kuvvetli sağanak',
  82: 'Şiddetli sağanak',
  95: 'Gök gürültülü',
  96: 'Dolu riski',
  99: 'Şiddetli dolu'
};

export function describeWeatherCode(code) {
  return WEATHER_CODES[code] ?? 'Bilinmiyor';
}

export default function useWeather({ latitude, longitude }) {
  const [state, setState] = useState({ status: 'loading', data: null });

  const load = useCallback(async () => {
    setState((prev) => ({ status: 'loading', data: prev.data }));
    try {
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code' +
        '&daily=sunrise,sunset&timezone=Europe%2FIstanbul&forecast_days=1';
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const c = json.current;
      setState({
        status: 'ready',
        data: {
          temperature: Math.round(c.temperature_2m),
          feelsLike: Math.round(c.apparent_temperature),
          humidity: Math.round(c.relative_humidity_2m),
          wind: Math.round(c.wind_speed_10m),
          condition: describeWeatherCode(c.weather_code),
          sunset: json.daily?.sunset?.[0]?.slice(11, 16) ?? null,
          updatedAt: c.time?.slice(11, 16) ?? null
        }
      });
    } catch {
      setState((prev) => ({ status: 'error', data: prev.data }));
    }
  }, [latitude, longitude]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
