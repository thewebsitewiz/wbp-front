import { Routes } from '@angular/router';
import { HomePageComponent } from './sections/home/home-page/home-page.component';

export const routes: Routes = [{ path: '', component: HomePageComponent }];

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
