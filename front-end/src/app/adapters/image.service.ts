import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Image } from '../interfaces/image.interface';

interface Environment {
  baseAPIUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseAPIUrl = (env as Environment).baseAPIUrl;
  private imagesAPI = '/api/images';

  constructor(private http: HttpClient) {}

  uploadImage(imageData: FormData): Observable<Image> {
    return this.http.post<Image>(
      `${this.baseAPIUrl}/${this.imagesAPI}/upload`,
      imageData
    );
  }

  getImage(imageId: number): Observable<Image> {
    return this.http.get<Image>(
      `${this.baseAPIUrl}/${this.imagesAPI}/get/${imageId}`
    );
  }

  updateImage(imageData: FormData, imageId: number): Observable<Image> {
    return this.http.put<Image>(
      `${this.baseAPIUrl}/${this.imagesAPI}/update/${imageId}`,
      imageData
    );
  }

  deleteImage(imageId: string): Observable<Image> {
    return this.http.delete<Image>(
      `${this.baseAPIUrl}/${this.imagesAPI}/delete/${imageId}`
    );
  }
}
