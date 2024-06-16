import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor() {}

  getWeather(city: string) {
    return fetch(`http://localhost:3000/weather`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
}
