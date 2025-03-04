import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITag } from '../interfaces/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private baseAPIUrl: string = `${environment.baseAPIUrl}/config`;

  constructor(private http: HttpClient) {}

  getAllConfigs(): Observable<ITag[]> {
    const url = `${this.baseAPIUrl}/get-all-configs`;
    return this.http.get(url) as Observable<ITag[]>;
  }

  getConfig(options: { type: string } = { type: 'all' }): Observable<ITag[]> {
    const url = `${this.baseAPIUrl}/get-config/${
      options.type === 'all' ? '' : `${options.type}`
    }`;
    return this.http.get(url) as Observable<ITag[]>;
  }

  addConfig(config: string, value: string): Observable<any> {
    return this.http
      .post(`${this.baseAPIUrl}/add-config`, { config, value })
      .pipe(retry(3), catchError(this.handleError));
  }

  updateConfig(config: string, value: string): Observable<any> {
    return this.http
      .patch(`${this.baseAPIUrl}/add-config`, { config, value })
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.status === 304) {
      console.warn('Request to server was not modified: ', error.url);
      // Here you should emit no value or the old cached value.
      return of({});
    } else if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, body was: ${error}`
      );
    }
    // Return an observable with a user-facing error message
    const err = new Error(`Unknown error occurred: ${JSON.stringify(error)}`);
    return throwError(() => err);
  }
}
