import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ImageUploadComponent } from '../../page-elements/admin/image-upload/image-upload.component';

export const AuthRoutes: Routes = [
  { path: 'image-upload', component: ImageUploadComponent },
];
