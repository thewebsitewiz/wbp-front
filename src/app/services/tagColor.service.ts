import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagColorService {
  private tagColorUrl = 'assets/json/tagColor.data'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.tagColorUrl);
  }

  updateData(data: any): Observable<any> {
    return this.http.put(this.jsonUrl, data);
  }
}
