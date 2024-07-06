import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tag } from '../interfaces/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private baseAPIUrl: string = environment.baseAPIUrl;
  private tagsAPI = `${environment.API}/tags`;
  private tagsAPIUrl = `${this.baseAPIUrl}${this.tagsAPI}`;

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    const url = `${this.tagsAPIUrl}/get-tags`;
    return this.http.get(url) as Observable<Tag[]>;
  }

  getTag(id: string): Observable<any> {
    return this.http.get(`${this.tagsAPIUrl}/get-tag/:${id}`);
  }

  addTag(tag: string): Observable<any> {
    return this.http.post(`${this.tagsAPIUrl}/add-tag`, { tag });
  }
}
