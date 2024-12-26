import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    console.log('url: ', url);
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
    return this.http.post(`${this.tagsAPIUrl}/add-tag`, { tag });
  }
}
