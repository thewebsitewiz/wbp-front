import { fetchWeatherData } from '@atombrenner/openmeteo'

// 17° 55' 0" N. 87° 57' 0" W.
const data = await fetchWeatherData({
  latitude: 17.55,
  longitude: -87.57,
  timezone: 'America/Belize',
  forecast_days: 5,
  hourly: ['temperature_2m', 'rain'],
  daily: ['temperature_2m_max', 'sunrise', 'sunset'],
  current: ['apparent_temperature'],
})

console.log(data)