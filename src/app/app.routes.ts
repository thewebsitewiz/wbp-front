import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/pages/admin/admin/admin.component').then(
        (m) => m.AdminComponent
      ),
    // Lazy loading
    loadChildren: () =>
      import('./components/pages/admin/admin.routes').then((m) => m.AuthRoutes),
  },
  { path: '**', component: HomePageComponent },
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
