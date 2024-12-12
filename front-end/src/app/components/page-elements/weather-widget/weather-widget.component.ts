import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { WeatherService } from '../../../services/weather.service';
import {
  IEnvData,
  IWeatherCodes,
  IWeatherConfig,
  IWeatherUnits,
  ICurrentWeather,
  IDailyWeather,
  IDailyForecast,
  IHourlyWeather,
  IHourlyForecast,
  IHourlyDisplayEnum,
  IHourlyRanges,
  IHourlyRangeValues,
} from '../../../interfaces/weather.interface';
import { weatherConfig } from '../../../../assets/json/weather.data';
import moment from 'moment';
import {
  round,
  nextHighestIncrementOf10,
  nextLowestIncrementOf10,
} from '../../../utilities/shared.util';

@Component({
  selector: 'wbp-weather-widget',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, NgStyle],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
})
export class WeatherWidgetComponent implements OnInit {
  icons!: any;
  weatherConfig!: IWeatherConfig;
  codes!: IWeatherCodes;
  units!: IWeatherUnits;

  envData!: IEnvData;

  currWeather!: ICurrentWeather;
  currWeatherTime!: string;

  currentCode!: number;
  currentIconSrc!: string;

  currentTemp!: number;
  tempUnit: 'metric' | 'standard' = 'standard';
  tempUnits!: { metric: string; standard: string };

  windDirection!: string;

  dailyFC: IDailyForecast[] = [];
  forecastStart: number = 1;
  forecastOffset: number = 10;

  hourlyDisplay: string = 'Temperature';
  hourlyMaxTemp!: number;
  hourlyMinTemp!: number;
  hourlyRangeValues: IHourlyRangeValues = {
    cloudCover: 0,
    gusts: 0,
    humidity: 0,
    precipitation: 0,
    temp: 0,
    uvIndex: 0,
    visibility: 0,
    wind: 0,
  };
  hourlyData!: IHourlyForecast[];
  hourlyMinCloudCover!: number;
  hourlyMinGusts!: number;
  hourlyMinHumidity!: number;
  hourlyMinPrecipitation!: number;
  hourlyMinUvIndex!: number;
  hourlyMinVisibility!: number;
  hourlyMinWind!: number;

  hourlyFC: IHourlyForecast[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherConfig = weatherConfig as IWeatherConfig;
    console.log('weatherConfig: ', weatherConfig);

    this.codes = this.weatherConfig.weatherCodes;
    this.units = this.weatherConfig.weatherUnits;

    this.tempUnit = 'standard';
    this.tempUnits = {
      metric: this.units.temperature_2m_metric,
      standard: this.units.temperature_2m,
    };
    this.weatherService
      .getEnvironmentalData()
      .subscribe((envData: IEnvData) => {
        console.log('envData: ', envData);
        this.envData = envData;
        this.currWeather = this.envData.current;

        this.currentCode = this.envData.current.weather_code;
        this.currentIconSrc = `/assets/images/weather/${
          this.codes[this.currentCode].icon.day
        }`;
        if (
          this.envData.current.is_day !== 1 &&
          this.codes[this.currentCode].icon.night !== undefined
        ) {
          this.currentIconSrc = `/assets/images/weather/${
            this.codes[this.currentCode].icon.night
          }`;
        }

        const date = new Date(this.envData.current.time);
        date.setUTCHours(date.getUTCHours() + 6);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'short',
        });

        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short',
          timeZone: 'America/Chicago',
        });
        this.currWeatherTime = `${formattedDate} ${formattedTime}`;

        this.windDirection = this.getWindDirection(
          this.currWeather.wind_direction_10m
        );

        this.getForecastItems();

        this.getHourlyRange();
      });
  }

  getHourlyRange() {
    let ranges: IHourlyRanges = {
      cloudCover: [],
      gusts: [],
      humidity: [],
      precipitation: [],
      temp: [],
      uvIndex: [],
      visibility: [],
      wind: [],
    };

    let count: number = 0;
    let avgTemp: number = 0;
    let avgPrecipitation: number = 0;
    let avgPrecipitationProbability: number = 0;
    let avgWindSpeed: number = 0;
    let avgWindGusts: number = 0;
    let avgWindDirection: number = 0;
    let avgHumidity: number = 0;
    let avgVisibility: number = 0;
    this.envData.hourly.forEach((hour: IHourlyWeather) => {
      ranges.temp.push(hour.temperature_2m);
      ranges.precipitation.push(hour.precipitation);
      ranges.wind.push(hour.wind_speed_10m);
      ranges.gusts.push(hour.wind_gusts_10m);
      ranges.humidity.push(hour.relative_humidity_2m);
      ranges.uvIndex.push(hour.uv_index);
      ranges.visibility.push(hour.visibility / 5260);
      ranges.cloudCover.push(hour.cloud_cover);
      count++;
      avgTemp = avgTemp + hour.temperature_2m;
      avgPrecipitation = avgPrecipitation + hour.precipitation;
      avgPrecipitationProbability =
        avgPrecipitationProbability + hour.precipitation_probability;
      avgWindSpeed = avgWindSpeed + hour.wind_speed_10m;
      avgWindGusts = avgWindGusts + hour.wind_gusts_10m;
      avgWindDirection = avgWindDirection + hour.wind_direction_10m;
      avgHumidity = avgHumidity + hour.relative_humidity_2m;
      avgVisibility = avgVisibility + hour.visibility;
      const date = new Date(hour.time);
      date.setUTCHours(date.getUTCHours() + 6);
      if (count % 3 === 0) {
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          hour12: true,
          timeZoneName: undefined,
          timeZone: 'America/Chicago',
        });

        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          weekday: 'short',
        });
        this.hourlyFC.push({
          cloudCover: round(hour.cloud_cover, 0),
          day: formattedDate,
          direction: this.getWindDirection(round(avgWindDirection / 3, 0)),
          gusts: round(avgWindGusts / 3, 0),
          humidity: round(avgHumidity / 3, 0),
          precipitation_probability: round(avgPrecipitationProbability / 3, 0),
          precipitation: round(avgPrecipitation / 3, 2),
          temp: round(avgTemp / 3, 0),
          time: formattedTime,
          uvIndex: round(hour.uv_index, 0),
          visibility: round(hour.visibility / 5260, 0),
          wind: round(avgWindSpeed / 3, 0),
        });
        avgHumidity = 0;
        avgPrecipitation = 0;
        avgPrecipitationProbability = 0;
        avgTemp = 0;
        avgVisibility = 0;
        avgWindDirection = 0;
        avgWindGusts = 0;
        avgWindSpeed = 0;
        count = 0;
      }
    });
    let maxTemp = Math.max(...ranges.temp);
    this.hourlyMaxTemp = round(maxTemp, 0);
    this.hourlyMaxTemp = nextHighestIncrementOf10(this.hourlyMaxTemp);

    let min = Math.min(...ranges.temp);
    this.hourlyMinTemp = round(min, 0);
    this.hourlyMinTemp = nextLowestIncrementOf10(this.hourlyMinTemp);
    this.hourlyRangeValues['temp'] = this.hourlyMaxTemp - this.hourlyMinTemp;

    this.hourlyMinWind = nextLowestIncrementOf10(Math.min(...ranges.wind));
    this.hourlyRangeValues['wind'] = round(
      Math.max(...ranges.wind) - this.hourlyMinWind,
      0
    );

    this.hourlyMinGusts = nextLowestIncrementOf10(Math.min(...ranges.wind));
    this.hourlyRangeValues['gusts'] = round(
      Math.max(...ranges.wind) - this.hourlyMinGusts,
      0
    );

    this.hourlyMinHumidity = nextLowestIncrementOf10(
      Math.min(...ranges.humidity)
    );
    this.hourlyRangeValues['humidity'] = round(
      Math.max(...ranges.humidity) - this.hourlyMinHumidity,
      0
    );

    this.hourlyMinPrecipitation = nextLowestIncrementOf10(
      Math.min(...ranges.precipitation)
    );
    this.hourlyRangeValues['precipitation'] = round(
      Math.max(...ranges.precipitation) - this.hourlyMinPrecipitation,
      0
    );

    this.hourlyMinUvIndex = nextLowestIncrementOf10(
      Math.min(...ranges.uvIndex)
    );
    this.hourlyRangeValues['uvIndex'] = round(
      Math.max(...ranges.uvIndex) - this.hourlyMinUvIndex,
      0
    );

    this.hourlyMinVisibility = nextLowestIncrementOf10(
      Math.min(...ranges.visibility)
    );
    this.hourlyRangeValues['visibility'] = round(
      Math.max(...ranges.visibility) - this.hourlyMinVisibility,
      0
    );

    this.hourlyMinCloudCover = nextLowestIncrementOf10(
      Math.min(...ranges.cloudCover)
    );
    this.hourlyRangeValues['cloudCover'] = round(
      Math.max(...ranges.cloudCover) - this.hourlyMinCloudCover,
      0
    );

    console.log('ranges: ', this.hourlyMinWind, this.hourlyRangeValues['wind']);

    this.hourlyFC.forEach((hour: IHourlyForecast) => {
      hour.tempDisplay = Math.round(
        (hour.temp / (this.hourlyRangeValues['temp'] + this.hourlyMinTemp)) *
          100
      );
      hour.cloudCoverDisplay = Math.round(
        (hour.cloudCover / this.hourlyRangeValues['cloudCover']) * 100
      );
      hour.humidityDisplay = Math.round(
        (hour.humidity / this.hourlyRangeValues['humidity']) * 100
      );
      hour.precipitationDisplay = Math.round(
        (hour.precipitation / this.hourlyRangeValues['precipitation']) * 100
      );
      hour.uvIndexDisplay = Math.round(
        (hour.uvIndex / this.hourlyRangeValues['uvIndex']) * 100
      );
      hour.visibilityDisplay = Math.round(
        (hour.visibility / this.hourlyRangeValues['visibility']) * 100
      );
      hour.windDisplay = Math.round(
        (hour.wind / this.hourlyRangeValues['wind'] + this.hourlyMinWind) * 100
      );
      hour.gustsDisplay = Math.round(
        (hour.gusts / this.hourlyRangeValues['gusts'] + this.hourlyMinGusts) *
          100
      );
    });

    console.log('hourlyFC: ', this.hourlyFC);
  }

  changeHourlyDisplay(display: string): void {
    this.hourlyDisplay = display;
  }

  getForecastItems(): void {
    let count = 0;

    this.envData.daily.forEach((day: IDailyWeather) => {
      count++;
      if (
        count >= this.forecastStart &&
        count < this.forecastStart + this.forecastOffset
      ) {
        this.dailyFC.push({
          icon: `/assets/images/weather/${
            this.codes[day.weather_code].icon.day
          }`,
          description: this.codes[day.weather_code].description,
          date: moment(day.time).format('dddd'),
          maxTemp: `${day.temperature_2m_max}`,
          minTemp: `${day.temperature_2m_min}`,
          tempUnit: `${this.tempUnits[this.tempUnit]}`,
        });
      }
    });
    this.forecastStart = count;
  }

  getWindDirection(deg: number): string {
    const val = Math.floor(deg / 22.5 + 0.5);
    const arr = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    return arr[val % 16];
  }
}
