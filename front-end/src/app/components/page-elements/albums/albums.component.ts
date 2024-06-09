import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { AlbumsService } from '../../../adapters/albums.service';

import { NgClass, NgForOf, NgStyle, NgIf } from '@angular/common';

@Component({
  selector: 'wbp-albums',
  standalone: true,
  imports: [NgClass, NgForOf, NgStyle, NgIf],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent implements OnInit {
  [x: string]: any;
  albums: any[] = [];

  selectedAlbum!: any;
  albumSelected: boolean = false;

  constructor(@Inject(AlbumsService) private albumsService: AlbumsService) {}

  ngOnInit() {
    this.albumsService.getAlbums().subscribe((albums) => {
      this.albums = albums;
    });
  }

  titleAlignment(album: any): string {
    return album.alignment === 'right' ? 'right' : 'left';
  }

  titleColor(album: any): string {
    return album.albumColor !== undefined ? album.albumColor : 'black';
  }

  openAlbum(album: any) {
    this.selectedAlbum = album;
    this.albumSelected = true;
    console.log(this.selectedAlbum);
  }

  closeAlbum() {
    this.albumSelected = false;
    this.selectedAlbum = undefined;
  }
}
