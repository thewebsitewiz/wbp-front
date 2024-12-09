import { WeatherConfig } from '../../app/interfaces/weather.interface';

export const weatherConfig: WeatherConfig = {
  weatherCodes: {
    0: {
      description: 'Clear Sky',
      icon: { day: '-clear-day.svg', night: '-clear-night.svg' },
    },
    1: {
      description: 'Mainly Clear',
      icon: { day: '-mostly-clear-day.svg', night: '-mostly-clear-night.svg' },
    },
    2: {
      description: 'Partly Cloudy',
      icon: {
        day: '-partly-cloudy-day.svg',
        night: '-partly-cloudy-night.svg',
      },
    },
    3: {
      description: 'Overcast',
      icon: { day: '-overcast-day.svg', night: '-overcast-night.svg' },
    },
    45: {
      description: 'Fog',
      icon: {
        day: '-fog-day.svg',
        night: '-fog-night.svg',
      },
    },
    48: {
      description: 'Fog',
      icon: {
        day: '-fog-day.svg',
        night: '-fog-night.svg',
      },
    },
    51: {
      description: 'Light Drizzle',
      icon: {
        day: '-drizzle-day.svg',
        night: '-drizzle-night.svg',
      },
    },
    53: {
      description: 'Moderate Drizzle',
      icon: {
        day: '-moderate-drizzle-day.svg',
        night: '-moderate-drizzle-night.svg',
      },
    },
    55: {
      description: 'Dense Intensity Drizzle',
      icon: {
        day: '-extreme-drizzle-day.svg',
        night: '-extreme-drizzle-night.svg',
      },
    },
    56: {
      description: 'Light Freezing Drizzle',
      icon: {
        day: '-drizzle.svg',
        night: '-drizzle.svg',
      },
    },
    57: {
      description: 'Dense Intensity Freezing Drizzle',
      icon: {
        day: '-drizzle.svg',
        night: '-drizzle.svg',
      },
    },
    61: {
      description: 'Slight Rain',
      icon: { day: '-rain.svg', night: '-rain.svg' },
    },
    63: {
      description: 'Moderate Rain',
      icon: { day: '-rain.svg', night: '-rain.svg' },
    },
    65: {
      description: 'Heavy Intensity Rain',
      icon: { day: '-extreme-rain.svg', night: '-extreme-rain.svg' },
    },
    66: {
      description: 'Light Freezing Rain',
      icon: { day: '-extreme-rain.svg', night: '-extreme-rain.svg' },
    },
    67: {
      description: 'Heavy Intensity Freezing Rain',
      icon: { day: '-extreme-rain.svg', night: '-extreme-rain.svg' },
    },
    71: {
      description: 'Slight Snow Fall',
      icon: { day: '', night: '' },
    },
    73: { description: 'Moderate Snow Fall', icon: { day: '', night: '' } },
    75: {
      description: 'Heavy Intensity Snow Fall',
      icon: { day: '', night: '' },
    },
    77: { description: 'Snow Grains', icon: { day: '', night: '' } },
    80: {
      description: 'Slight Rain Showers',
      icon: { day: '-rain.svg', night: '-rain.svg' },
    },
    81: {
      description: 'Moderate Rain Showers',
      icon: { day: '-rain.svg', night: '-rain.svg' },
    },
    82: {
      description: 'Violent Rain Showers',
      icon: { day: '-rain.svg', night: '-rain.svg' },
    },
    85: { description: 'Slight Snow Showers', icon: { day: '', night: '' } },
    86: { description: 'Heavy Snow Showers', icon: { day: '', night: '' } },
    95: {
      description: 'Thunderstorms',
      icon: {
        day: '-thunderstorms-rain.svg',
        night: '-thunderstorms-rain.svg',
      },
    },
    96: {
      description: 'Thunderstorm with Slight Hail',
      icon: {
        day: '-thunderstorms-snow.svg',
        night: '-thunderstorms-snow.svg',
      },
    },
    99: {
      description: 'Thunderstorm with Heavy Hail',
      icon: {
        day: '-thunderstorms-snow.svg',
        night: '-thunderstorms-snow.svg',
      },
    },
  },
  weatherUnits: {
    apparent_temperature_max_metric: '°C',
    apparent_temperature_max: '°F',
    apparent_temperature_metric: '°C',
    apparent_temperature_min_metric: '°C',
    apparent_temperature_min: '°F',
    apparent_temperature: '°F',
    cloud_cover: '%',
    daylight_duration: 's',
    dew_point_2m: '°F',
    dew_point_2m_metric: '°F',
    interval: 'seconds',
    precipitation_hours: 'h',
    precipitation_metric: 'cm',
    precipitation_probability_max: '%',
    precipitation_probability: '%',
    precipitation_sum_metric: 'cm',
    precipitation_sum: 'inches',
    precipitation: 'inches',
    pressure_msl: 'hPa',
    rain_metric: 'cm',
    rain_sum_metric: 'cm',
    rain_sum: 'inches',
    rain: 'inches',
    relative_humidity_2m: '%',
    showers_metric: 'cm',
    showers_sum_metric: 'cm',
    showers_sum: 'inches',
    showers: 'inches',
    sunrise: 'iso8601',
    sunset: 'iso8601',
    sunshine_duration: 's',
    surface_pressure: 'hPa',
    temperature_2m_max_metric: '°C',
    temperature_2m_max: '°F',
    temperature_2m_metric: '°C',
    temperature_2m_min_metric: '°C',
    temperature_2m_min: '°F',
    temperature_2m: '°F',
    time: 'iso8601',
    visibility_metric: 'm',
    visibility: 'ft',
    weather_code: 'wmo code',
    wind_direction_10m_dominant: '°',
    wind_direction_10m: '°',
    wind_gusts_10m_max_metric: 'kp/h',
    wind_gusts_10m_max: 'mp/h',
    wind_gusts_10m_metric: 'kp/h',
    wind_gusts_10m: 'mp/h',
    wind_speed_10m_max_metric: 'kp/h',
    wind_speed_10m_max: 'mp/h',
    wind_speed_10m_metric: 'kp/h',
    wind_speed_10m: 'mp/h',
  },
};
