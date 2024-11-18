import { Routes } from '@angular/router';
import { ImageUploadComponent } from '../../page-elements/admin/images/upload/image-upload.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';

export const AuthRoutes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'images/upload', component: ImageUploadComponent },
  { path: 'images/edit/:id', component: ImageUploadComponent },
  { path: '**', component: AdminDashboardComponent },
];
