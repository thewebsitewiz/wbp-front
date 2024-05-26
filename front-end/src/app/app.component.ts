import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

// Layout Components
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { FooterComponent } from './components/layout/footer/footer.component';

// Home Page
import { HomePageComponent } from './components/sections/home/home-page/home-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wbp-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front-end';
}
