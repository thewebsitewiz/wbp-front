import { Routes } from '@angular/router';
import { ImageFormComponent } from '../../page-elements/admin/images/image-form/image-form.component';
import { VendorsComponent } from '../../page-elements/admin/vendors/vendors/vendors.component';
import { DashboardComponent } from '../../page-elements/admin/dashboard/dashboard.component';
import { ImageListComponent } from '../../page-elements/admin/images/images-list/images-list.component';

export const AuthRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'images/form', component: ImageFormComponent },
  { path: 'images/form/:id', component: ImageFormComponent },
  { path: 'images/browse', component: ImageListComponent },

  { path: 'vendors/add', component: VendorsComponent },
  { path: 'vendors/edit/:id', component: VendorsComponent },

  { path: '**', component: DashboardComponent },
];
