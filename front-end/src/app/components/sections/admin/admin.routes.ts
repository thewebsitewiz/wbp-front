import { Routes } from '@angular/router';
import { ImageUploadComponent } from '../../page-elements/admin/images/upload/image-upload.component';

export const AuthRoutes: Routes = [
  { path: 'images/upload', component: ImageUploadComponent },
  { path: 'images/edit/:id', component: ImageUploadComponent },
];
