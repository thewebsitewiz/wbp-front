import { Component, Inject, OnInit } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
import { WeatherDayNightIcons } from '../../../interfaces/weather.interface';

@Component({
  selector: 'wbp-weather-widget',
  standalone: true,
  imports: [],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
})
export class WeatherWidgetComponent implements OnInit {
  currentWeatherIcons!: WeatherDayNightIcons;
  currentWeatherDescription!: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getEnvironmentalData().subscribe((envData: any) => {
      console.log('envData: ', envData);
      //const weatherCode = envData.weather.weatherCode.current.weatherCode;

      // this.currentWeatherIcons = envData.weatherCodes[weatherCode].icon;
      // this.currentWeatherDescription = envData.weatherCodes[weatherCode].description;});
    });
  }
}
