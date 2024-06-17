import { Routes } from '@angular/router';
import { HomePageComponent } from './components/sections/home/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/sections/admin/admin.component').then(
        (m) => m.AdminComponent
      ), // Lazy loading
    loadChildren: () =>
      import('./components/sections/admin/admin.routes').then(
        (m) => m.AuthRoutes
      ),
  },
];

/*

 {
    path: '',
    loadComponent: () =>
      import('./sections/home/home-page/home-page.component'),
  },

  {
    path: '',
    loadChildren: () =>
      import('./sections/home/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ), // Lazy loading
  },
  */
