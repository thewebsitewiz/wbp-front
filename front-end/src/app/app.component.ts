import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

// Home Page
import { HomePageComponent } from './components/sections/home/home-page/home-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wbp-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front-end';
}
