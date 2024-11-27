import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment as ENV } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  private readonly APIUrl = `${ENV.baseAPIUrl}/${ENV.API}`;

  getEnvironmentalData(): Observable<any> {
    return this.http
      .get<any>(`${this.APIUrl}/weather/getEnvironmentalData`)
      .pipe(
        catchError((error) => {
          console.error(
            'Error fetching getEnvironmentalData JSON data:',
            error
          );
          return throwError(
            () => new Error('Error fetching getEnvironmentalData JSON data')
          );
        })
      );
  }

  getWeather(): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/weather/forecast`).pipe(
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }

  getMarine(): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/weather/marine`).pipe(
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }

  getAstro(): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/weather/astro`).pipe(
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }

  getMoonPhase(): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/weather/moon`).pipe(
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }
}
