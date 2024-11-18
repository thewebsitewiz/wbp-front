import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http
      .get<any>(`http://localhost:3000/api/weather/forecast`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching JSON data:', error);
          return throwError(
            () => new Error('Something went wrong; please try again later.')
          );
        })
      );
  }

  getMarine(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/weather/marine`).pipe(
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }

  getAstro(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/weather/astro`).pipe(
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }

  getMoonPhase(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/weather/moon`).pipe(
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }
}
