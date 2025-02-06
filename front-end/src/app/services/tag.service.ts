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
export class TagService {
  private baseAPIUrl: string = environment.baseAPIUrl;
  private tagsAPI = `${environment.API}/tags`;
  private tagsAPIUrl = `${this.baseAPIUrl}/${this.tagsAPI}`;

  constructor(private http: HttpClient) {}

  getAllTags(): Observable<ITag[]> {
    const url = `${this.tagsAPIUrl}/get-tags`;
    return this.http.get(url) as Observable<ITag[]>;
  }

  getTagsByType(
    options: { type: string } = { type: 'all' }
  ): Observable<ITag[]> {
    const url = `${this.tagsAPIUrl}/get-tags/${
      options.type === 'all' ? '' : `${options.type}`
    }`;
    return this.http.get(url) as Observable<ITag[]>;
  }

  getTag(id: string): Observable<ITag> {
    return this.http.get(
      `${this.tagsAPIUrl}/get-tag/:${id}`
    ) as Observable<ITag>;
  }

  addTag(tag: string): Observable<any> {
    return this.http
      .post(`${this.tagsAPIUrl}/add-tag`, { tag })
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
