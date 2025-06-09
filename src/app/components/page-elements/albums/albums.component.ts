import { CommonModule } from '@angular/common';
import { Component, ElementRef, Host, OnInit, ViewChild } from '@angular/core';

import { AlbumsService } from '../../../services/albums.service';
import { CarouselService } from './../../../services/carousel.service';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { NgClass, NgForOf, NgStyle, NgIf } from '@angular/common';
import {
  IPostmark,
  IPostmarkPosition,
  IAlbum,
} from '../../../interfaces/album.interface';

@Component({
    selector: 'wbp-albums',
    imports: [
        CommonModule,
        NgClass,
        NgForOf,
        NgStyle,
        DialogModule,
        ButtonModule,
    ],
    providers: [
        {
            provide: CarouselService,
            useFactory: () => new CarouselService(),
        },
    ],
    templateUrl: './albums.component.html',
    styleUrl: './albums.component.scss'
})
export class AlbumsComponent implements OnInit {
  @ViewChild('albumCurr', { static: true }) albumCurr!: ElementRef;
  slides: any[] = [];
  prefix: string = 'album';

  [x: string]: any;
  albums!: IAlbum[];

  selectedAlbum!: IAlbum | null;
  albumSelected: boolean = false;
  albumHeader!: string;

  constructor(
    private albumsService: AlbumsService,
    private carouselService: CarouselService
  ) {}

  ngOnInit() {
    this.albumsService.getAlbums().subscribe((albums: IAlbum[]) => {
      this.albums = albums;
    });
  }

  setBackgroundImage(album: IAlbum): void {
    this.albumCurr.nativeElement.style.backgroundImage = `url('assets/images/${album.images[0].src}')`;
  }

  getPostmarkPosition(postmark: IPostmark): IPostmarkPosition {
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

  titleAlignment(album: IAlbum): string {
    return album.alignment === 'right' ? 'right' : 'left';
  }

  titleColor(album: IAlbum): string {
    return album.albumColor !== undefined ? album.albumColor : 'white';
  }

  openAlbum(album: IAlbum): void {
    this.selectedAlbum = album;
    this.albumSelected = true;
    this.albumHeader = album.album;

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
