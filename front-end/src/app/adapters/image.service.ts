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
      `${this.baseAPIUrl}/${this.imagesAPI}/upload-image`,
      imageData
    );
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest(
      'POST',
      `${this.baseAPIUrl}/upload-file`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  getImages(): Observable<any> {
    return this.http.get(`${this.baseAPIUrl}/get-images`);
  }

  getImage(imageId: number): Observable<Image> {
    return this.http.get<Image>(
      `${this.baseAPIUrl}/${this.imagesAPI}/get-image/${imageId}`
    );
  }

  updateImage(imageData: FormData, imageId: number): Observable<Image> {
    return this.http.put<Image>(
      `${this.baseAPIUrl}/${this.imagesAPI}/update-image/${imageId}`,
      imageData
    );
  }

  deleteImage(imageId: string): Observable<Image> {
    return this.http.delete<Image>(
      `${this.baseAPIUrl}/${this.imagesAPI}/delete-image/${imageId}`
    );
  }
}
