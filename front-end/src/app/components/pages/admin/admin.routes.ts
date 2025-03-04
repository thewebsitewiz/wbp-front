import { Routes } from '@angular/router';
import { ImageUploadComponent } from '../../page-elements/admin/images/image-upload/image-upload.component';
import { VendorsComponent } from '../../page-elements/admin/vendors/vendors/vendors.component';
import { DashboardComponent } from '../../page-elements/admin/dashboard/dashboard.component';
import { BrowseImagesComponent } from '../../page-elements/admin/images/browse-images/browse-images.component';

export const AuthRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'images/upload', component: ImageUploadComponent },
  { path: 'images/edit/:id', component: ImageUploadComponent },
  { path: 'images/browse', component: BrowseImagesComponent },

  { path: 'vendors/add', component: VendorsComponent },
  { path: 'vendors/edit/:id', component: VendorsComponent },

  { path: '**', component: DashboardComponent },
];
