export interface WeatherDayNightIcons {
  day?: string;
  night?: string;
}

export interface Weather {
  apparentTemperature: number;
  cloudCover: number;
  precipitation: number;
  pressureMsl: number;
  rain: number;
  relativeHumidity2m: number;
  showers: number;
  surfacePressure: number;
  temperature2m: number;
  time: string;
  weatherCode: number;
  windDirection10m: number;
  windGusts10m: number;
  windSpeed10m: number;
}
