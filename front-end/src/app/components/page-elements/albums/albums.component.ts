import { CarouselService } from './../../../services/carousel.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlbumsService } from '../../../services/albums.service';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { NgClass, NgForOf, NgStyle, NgIf } from '@angular/common';
import {
  Postmark,
  PostmarkPosition,
  Album,
} from '../../../interfaces/album.interface';

@Component({
  selector: 'wbp-albums',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    NgForOf,
    NgStyle,
    NgIf,
    DialogModule,
    ButtonModule,
  ],
  providers: [CarouselService, AlbumsService],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent implements OnInit {
  @ViewChild('albumCurr', { static: true }) albumCurr!: ElementRef;
  slides: any[] = [];
  prefix: string = 'album';

  [x: string]: any;
  albums!: Album[];

  selectedAlbum!: Album | null;
  albumSelected: boolean = false;
  albumHeader!: string;

  constructor(
    private albumsService: AlbumsService,
    private carouselService: CarouselService
  ) {}

  ngOnInit() {
    this.albumsService.getAlbums().subscribe((albums: Album[]) => {
      this.albums = albums;
    });
  }

  setBackgroundImage(album: Album): void {
    this.albumCurr.nativeElement.style.backgroundImage = `url('assets/images/${album.images[0].src}')`;
  }

  getPostmarkPosition(postmark: Postmark): PostmarkPosition {
    const position: { [key: string]: string } = {};
    if (postmark.top) {
      position['top'] = `${postmark.top}px`;
    }
    if (postmark.bottom) {
      position['bottom'] = `${postmark.bottom}px`;
    }
    if (postmark.left) {
      position['left'] = `${postmark.left}px`;
    }
    if (postmark.right) {
      position['right'] = `${postmark.right}px`;
    }
    if (postmark.width) {
      position['width'] = `${postmark.width}px`;
    }

    return position;
  }

  titleAlignment(album: Album): string {
    return album.alignment === 'right' ? 'right' : 'left';
  }

  titleColor(album: Album): string {
    return album.albumColor !== undefined ? album.albumColor : 'white';
  }

  openAlbum(album: Album): void {
    this.selectedAlbum = album;
    this.albumSelected = true;
    this.albumHeader = album.album;

    console.log('openAlbum: ', this.albumCurr, this.prefix, album.images);
    this.carouselService.initCarousel(
      this.albumCurr,
      this.prefix,
      album.images
    );
  }

  closeAlbum() {
    this.albumSelected = false;
    this.selectedAlbum = null;
  }

  prevSlide() {
    this.carouselService.prevSlide();
  }

  nextSlide() {
    this.carouselService.nextSlide();
  }
}
