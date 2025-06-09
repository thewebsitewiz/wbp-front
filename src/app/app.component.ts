import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
// Home Page
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'wbp-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-end';
}
