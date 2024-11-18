import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { AlbumsService } from '../../../services/albums.service';

import { NgClass, NgForOf, NgStyle, NgIf } from '@angular/common';
import {
  Postmark,
  PostmarkPosition,
  Album,
} from '../../../interfaces/album.interface';

@Component({
  selector: 'wbp-albums',
  standalone: true,
  imports: [CommonModule, NgClass, NgForOf, NgStyle, NgIf],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent implements OnInit {
  [x: string]: any;
  albums: any[] = [];

  selectedAlbum!: any;
  albumSelected: boolean = false;

  constructor(
    private ref: ElementRef,
    @Inject(AlbumsService) private albumsService: AlbumsService
  ) {}

  ngOnInit() {
    this.albumsService.getAlbums().subscribe((albums) => {
      this.albums = albums;
    });
  }

  setBackgroundImage(album: Album): void {
    this.ref.nativeElement.style.backgroundImage = `url('assets/images/${album.images[0].src}')`;
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

  openAlbum(album: Album) {
    this.selectedAlbum = album;
    this.albumSelected = true;
    console.log(this.selectedAlbum);
  }

  closeAlbum() {
    this.albumSelected = false;
    this.selectedAlbum = undefined;
  }
}
