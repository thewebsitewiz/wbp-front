import { Component, Inject, OnInit } from '@angular/core';
import { WeatherService } from '../../../adapters/weather.service';

@Component({
  selector: 'wbp-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  constructor(
    @Inject('WeatherService')
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.weatherService.getWeather('London').then((data) => {
      console.log(data);
    });
  }
}
