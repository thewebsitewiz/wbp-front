import { Component } from '@angular/core';

// Layout Components
import { NavBarComponent } from '../../layout/nav-bar/nav-bar.component';
import { FooterComponent } from '../../layout/footer/footer.component';

//Page Elements Components
import { HeroComponent } from '../../page-elements/hero/hero.component';
import { WillsBioComponent } from '../../page-elements/wills-bio/wills-bio.component';
import { AlbumsComponent } from '../../page-elements/albums/albums.component';
import { WeatherWidgetComponent } from '../../page-elements/weather-widget/weather-widget.component';

@Component({
  selector: 'wbp-home-page',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    HeroComponent,
    WillsBioComponent,
    AlbumsComponent,
    WeatherWidgetComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
