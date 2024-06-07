import { Component } from '@angular/core';

//Page Elemeents Components
import { CarouselComponent } from '../../../page-elements/carousel/carousel.component';
import { WillsBioComponent } from '../../../page-elements/wills-bio/wills-bio.component';
import { AlbumsComponent } from '../../../page-elements/albums/albums.component';
@Component({
  selector: 'wbp-home-page',
  standalone: true,
  imports: [CarouselComponent, WillsBioComponent, AlbumsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
