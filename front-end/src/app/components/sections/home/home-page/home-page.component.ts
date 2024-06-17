import { Component } from '@angular/core';

// Layout Components
import { NavBarComponent } from '../../../layout/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../layout/footer/footer.component';

//Page Elemeents Components
import { CarouselComponent } from '../../../page-elements/carousel/carousel.component';
import { WillsBioComponent } from '../../../page-elements/wills-bio/wills-bio.component';
import { AlbumsComponent } from '../../../page-elements/albums/albums.component';
import { WeatherComponent } from '../../../page-elements/weather/weather.component';
@Component({
  selector: 'wbp-home-page',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    CarouselComponent,
    WillsBioComponent,
    AlbumsComponent,
    WeatherComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
