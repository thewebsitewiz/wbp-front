import { Component, Inject, OnInit } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'wbp-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getWeather().subscribe((weather: any) => {
      console.log(weather);
    });
    this.weatherService.getMarine().subscribe((marineData: any) => {
      console.log(marineData);
    });
    this.weatherService.getAstro().subscribe((astroData: any) => {
      console.log(astroData);
    });
    this.weatherService.getMoonPhase().subscribe((moonPhaseData: any) => {
      console.log(moonPhaseData);
    });
  }
}
