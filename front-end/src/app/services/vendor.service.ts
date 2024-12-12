import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Vendor } from '../interfaces/vendor.interface';
import { update, get } from 'lodash';
import { VendorsComponent } from '../components/page-elements/vendors/vendors.component';

interface Environment {
  baseAPIUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private baseAPIUrl = (env as Environment).baseAPIUrl;
  private vendorsAPI = '/api/vendors';
  private vendorAPIUrl = `${this.baseAPIUrl}${this.vendorsAPI}`;

  constructor(private http: HttpClient) { }

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

  getVendors(): Observable<any> {
    return this.http.get(`${this.vendorAPIUrl}/get-vendors`);
  }

  getVendor(vendorId: number): Observable<VendorsComponent> {
    return this.http.get<VendorsComponent>(
      `${this.vendorAPIUrl}/get-vendor/${vendorId}`
    );
  }

  /*   deleteImage(imageId: string): Observable<Image> {
    return this.http.delete<Image>(
      `${this.imageAPIUrl}/delete-image/${imageId}`
    );
  } */
}
