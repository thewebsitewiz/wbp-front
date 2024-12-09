export interface WeatherDayNightIcons {
  day?: string;
  night?: string;
}

export interface DailyWeather {
  __v: number;
  _id: string;
  apparent_temperature_max_metric: number;
  apparent_temperature_max: number;
  apparent_temperature_min_metric: number;
  apparent_temperature_min: number;
  createdAt: string;
  daylight_duration: number;
  id: string;
  precipitation_hours: number;
  precipitation_probability_max: number;
  precipitation_sum_metric: number;
  precipitation_sum: number;
  rain_sum_metric: number;
  rain_sum: number;
  showers_sum_metric: number;
  showers_sum: number;
  sunrise: string;
  sunset: string;
  sunshine_duration: number;
  temperature_2m_max_metric: number;
  temperature_2m_max: number;
  temperature_2m_min_metric: number;
  temperature_2m_min: number;
  time: string;
  updatedAt: string;
  uv_index_clear_sky_max: number;
  uv_index_max: number;
  weather_code: number;
  wind_direction_10m_dominant: number;
  wind_gusts_10m_max: number;
  wind_gusts_10m_max_metric: number;
  wind_speed_10m_max: number;
  wind_speed_10m_max_metric: number;
}

export interface DailyWeathers extends Array<DailyWeather> {}

export interface HourlyWeather {
  apparent_temperature: number;
  apparent_temperature_metric: number;
  cloud_cover: number;
  createdAt: string;
  dew_point_2m: number;
  id: string;
  is_day: number;
  precipitation: number;
  precipitation_metric: number;
  precipitation_probability: number;
  rain: number;
  rain_metric: number;
  relative_humidity_2m: number;
  showers: number;
  showers_metric: number;
  sunshine_duration: number;
  surface_pressure: number;
  temperature_2m: number;
  temperature_2m_metric: number;
  time: string;
  updatedAt: string;
  uv_index: number;
  uv_index_clear_sky: number;
  visibility: number;
  visibility_metric: number;
  weather_code: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  wind_gusts_10m_metric: number;
  wind_speed_10m: number;
  wind_speed_10m_metric: number;
  __v: number;
  _id: string;
}

export interface HourlyWeathers extends Array<HourlyWeather> {}

export interface CurrentWeather {
  __v: number;
  _id: string;
  apparent_temperature_metric: number;
  apparent_temperature: number;
  cloud_cover: number;
  createdAt: string;
  id: string;
  interval: number;
  is_day: number;
  precipitation_metric: number;
  precipitation: number;
  pressure_msl: number;
  rain_metric: number;
  rain: number;
  relative_humidity_2m: number;
  showers_metric: number;
  showers: number;
  sunshine_duration: number;
  surface_pressure: number;
  temperature_2m_metric: number;
  temperature_2m: number;
  time: string;
  updatedAt: string;
  uv_index_clear_sky: number;
  uv_index: number;
  visibility_metric: number;
  visibility: number;
  weather_code: number;
  wind_direction_10m: number;
  wind_gusts_10m_metric: 21.57;
  wind_gusts_10m: number;
  wind_speed_10m_metric: number;
  wind_speed_10m: 10;
}

export interface MoonPhase {
  Age: number;
  AngularDiameter: number;
  Distance: number;
  DistanceToSun: number;
  Error: number;
  ErrorMsg: string;
  Illumination: number;
  Index: number;
  Moon?: string[];
  Phase: string;
  SunAngularDiameter: number;
  TargetDate: string;
}

export interface EnvData {
  current: CurrentWeather;
  daily: DailyWeathers;
  hourly: HourlyWeathers;
  moon: MoonPhase;
}

export interface WeatherUnits {
  apparent_temperature_max_metric: string;
  apparent_temperature_max: string;
  apparent_temperature_metric: string;
  apparent_temperature_min_metric: string;
  apparent_temperature_min: string;
  apparent_temperature: string;
  cloud_cover: string;
  daylight_duration: string;
  dew_point_2m: string;
  dew_point_2m_metric: string;
  interval: string;
  precipitation_hours: string;
  precipitation_metric: string;
  precipitation_probability_max: string;
  precipitation_probability: string;
  precipitation_sum_metric: string;
  precipitation_sum: string;
  precipitation: string;
  pressure_msl: string;
  rain_metric: string;
  rain_sum_metric: string;
  rain_sum: string;
  rain: string;
  relative_humidity_2m: string;
  showers_metric: string;
  showers_sum_metric: string;
  showers_sum: string;
  showers: string;
  sunrise: string;
  sunset: string;
  sunshine_duration: string;
  surface_pressure: string;
  temperature_2m_max_metric: string;
  temperature_2m_max: string;
  temperature_2m_metric: string;
  temperature_2m_min_metric: string;
  temperature_2m_min: string;
  temperature_2m: string;
  time: string;
  visibility_metric: string;
  visibility: string;
  weather_code: string;
  wind_direction_10m_dominant: string;
  wind_direction_10m: string;
  wind_gusts_10m_max_metric: string;
  wind_gusts_10m_max: string;
  wind_gusts_10m_metric: string;
  wind_gusts_10m: string;
  wind_speed_10m_max_metric: string;
  wind_speed_10m_max: string;
  wind_speed_10m_metric: string;
  wind_speed_10m: string;
}

export interface WeatherCodes {
  [key: string]: {
    description: string;
    icon: { day: string; night: string };
  };
}

export interface WeatherConfig {
  weatherCodes: WeatherCodes;
  weatherUnits: WeatherUnits;
}

export interface DailyForecast {
  date: string;
  description: string;
  icon: string;
  maxTemp: string;
  minTemp: string;
  tempUnit: string;
}

export interface HourlyForecast {
  day: string;
  direction: string;
  gusts: number;
  humidity: number;
  precipitation_probability: number;
  precipitation: number;
  temp: number;
  time: string;
  uvIndex: number;
  visibility: number;
  wind: number;
  cloudCover: number;
  cloudCoverDisplay?: number;
  gustsDisplay?: number;
  humidityDisplay?: number;
  precipitationDisplay?: number;
  tempDisplay?: number;
  uvIndexDisplay?: number;
  visibilityDisplay?: number;
  windDisplay?: number;
}
export interface HourlyRanges {
  gusts: any;
  temp: number[];
  wind: number[];
  humidity: number[];
  precipitation: number[];
  uvIndex: number[];
  visibility: number[];
  cloudCover: number[];
}

export interface HourlyRangeValues {
  cloudCover: number;
  gusts: number;
  humidity: number;
  precipitation: number;
  temp: number;
  uvIndex: number;
  visibility: number;
  wind: number;
}

export enum HourlyDisplayEnum {
  'Temperature' = 'Temperature',
  'Wind' = 'Wind',
  'Humidity' = 'Humidity',
  'Precipitation' = 'Precipitation',
  'UV Index' = 'UV Index',
  'Visibility' = 'Visibility',
  'Cloud Cover' = 'Cloud Cover',
}
