import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { IVendor } from '../interfaces/vendor.interface';
import { Vendors } from '../../assets/json/vendors.data';

interface Environment {
  baseAPIUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private baseAPIUrl = (env as Environment).baseAPIUrl;
  private vendorsAPI = 'api/vendors';
  private vendorAPIUrl = `${this.baseAPIUrl}/${this.vendorsAPI}`;

  constructor(private http: HttpClient) {}

  addVendor(vendorData: FormData): Observable<FormData> {
    return this.http.post<FormData>(
      `${this.vendorAPIUrl}/add-vendor`,
      vendorData
    );
  }

  updateVendor(vendorUpdateData: FormData, id: string) {
    return this.http.put(
      `${this.vendorAPIUrl}/update-vendor/${id}`,
      vendorUpdateData
    );
  }

  getVendors(): Observable<IVendor[]> {
    return of(Vendors);
  }
  /* getVendors(): Observable<IVendor[]> {
    return this.http.get(`${this.vendorAPIUrl}/get-vendors`) as Observable<
      IVendor[]
    >;
  }
 */
  getVendor(vendorId: number): Observable<IVendor> {
    return this.http.get<IVendor>(
      `${this.vendorAPIUrl}/get-vendor/${vendorId}`
    ) as Observable<IVendor>;
  }

  /*   deleteImage(imageId: string): Observable<Image> {
    return this.http.delete<Image>(
      `${this.imageAPIUrl}/delete-image/${imageId}`
    );
  } */
}
