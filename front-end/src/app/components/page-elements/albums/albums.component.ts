import { Component, Inject } from '@angular/core';
import { AlbumsService } from '../../../adapters/albums.service';

import { NgClass, NgForOf, NgStyle } from '@angular/common';
@Component({
  selector: 'wbp-albums',
  standalone: true,
  imports: [NgClass, NgForOf, NgStyle],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent {
  albums: any[] = [];

  constructor(@Inject(AlbumsService) private AlbumsService: AlbumsService) {}

  ngOnInit() {
    this.AlbumsService.getAlbums().subscribe((albums) => {
      this.albums = albums;
    });
  }

  titleAlignment(album: any): string {
    return album.alignment === 'right' ? 'right' : 'left';
  }

  titleColor(album: any): string {
    return album.albumColor !== undefined ? album.albumColor : 'black';
  }
}
