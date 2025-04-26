import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  environment as ENV,
  environment,
} from '../../environments/environment';
import { IEnvData, IWeatherConfig } from '../interfaces/weather.interface';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  private baseAPIUrl: string = environment.baseAPIUrl;

  getWeatherConfig(): Observable<IWeatherConfig> {
    return this.http.get<IWeatherConfig>(`/assets/weather.json`);
  }

  getEnvironmentalData(): Observable<IEnvData> {
    return this.http
      .get<IEnvData>(`${this.baseAPIUrl}/weather/getEnvironmentalData`)
      .pipe(
        catchError((error) => {
          console.error(`Error fetching getEnvironmentalData: ${error}`);
          return throwError(
            () => new Error('Error fetching getEnvironmentalData JSON data')
          );
        })
      );
  }

  getMarine(): Observable<any> {
    return this.http.get<any>(`${this.baseAPIUrl}/weather/marine`).pipe(
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }

  getAstro(): Observable<any> {
    return this.http.get<any>(`${this.baseAPIUrl}/weather/astro`).pipe(
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }

  getMoonPhase(): Observable<any> {
    return this.http.get<any>(`${this.baseAPIUrl}/weather/moon`).pipe(
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }
}
