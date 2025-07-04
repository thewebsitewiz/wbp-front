import { Component } from '@angular/core';

// Layout Components
import { NavBarComponent } from '../../shared/layout/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/layout/footer/footer.component';

//Page Elements Components
import { HeroComponent } from '../../page-elements/home/hero/hero.component';
import { WillsBioComponent } from '../../page-elements/home/wills-bio/wills-bio.component';
import { AlbumsComponent } from '../../page-elements/home/albums/albums.component';
import { WeatherWidgetComponent } from '../../page-elements/home/weather-widget/weather-widget.component';
import { VendorsComponent } from '../../page-elements/home/vendors/vendors.component';

@Component({
  selector: 'wbp-home-page',
  imports: [
    NavBarComponent,
    FooterComponent,
    HeroComponent,
    WillsBioComponent,
    AlbumsComponent,
    WeatherWidgetComponent,
    VendorsComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
