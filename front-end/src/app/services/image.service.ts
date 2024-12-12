import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { IImage } from '../interfaces/image.interface';

interface Environment {
  baseAPIUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseAPIUrl = (env as Environment).baseAPIUrl;
  private imagesAPI = '/api/images';
  private imageAPIUrl = `${this.baseAPIUrl}${this.imagesAPI}`;

  // private _headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    // this._headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  createImage(imageData: FormData): Observable<FormData> {
    return this.http.post<FormData>(
      `${this.imageAPIUrl}/upload-image`,
      imageData
    );
  }

  updateImage(imageUpdateData: FormData, id: string) {
    return this.http.put(
      `${this.imageAPIUrl}/update-image/${id}`,
      imageUpdateData
    );
  }

  getImages(): Observable<any> {
    return this.http.get(`${this.imageAPIUrl}/get-images`);
  }

  getImage(imageId: number): Observable<IImage> {
    return this.http.get<IImage>(`${this.imageAPIUrl}/get-image/${imageId}`);
  }

  OLDupdateImage(imageData: FormData, imageId: number): Observable<IImage> {
    return this.http.put<IImage>(
      `${this.imageAPIUrl}/update-image/${imageId}`,
      imageData
    );
  }

  deleteImage(imageId: string): Observable<IImage> {
    return this.http.delete<IImage>(
      `${this.imageAPIUrl}/delete-image/${imageId}`
    );
  }
}
