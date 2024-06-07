import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor() {}

  getAlbums(): Observable<any[]> {
    return of([
      {
        album: 'Destinations',
        description: 'Destination photography is blah, blah, blah',
        images: [{ src: 'pics/--215-Edit.jpg', title: '', description: '' }],
      },
      {
        album: 'Proposals',
        alignment: 'right',
        description: '',
        images: [
          {
            src: 'pics/8-Edit.jpg',
            title: 'Proposals',
            description: 'description',
          },
        ],
      },
      {
        album: 'Families',
        description: 'Families photography is blah, blah, blah',
        images: [
          {
            src: 'pics/23-Edit.jpg',
            title: 'Families',
            description: 'description',
          },
        ],
      },
      {
        album: 'Portraits',
        description: 'Portraits photography is blah, blah, blah',
        alignment: 'right',
        images: [
          {
            src: 'pics/16-Edit.jpg',
            title: 'Portraits',
            description: 'description',
          },
        ],
      },
      {
        album: 'Weddings',
        description: 'Weddings photography is blah, blah, blah',
        images: [
          {
            src: 'pics/208-Edit.jpg',
            title: 'Weddings',
            description: 'description',
          },
        ],
      },
      {
        album: 'Underwater',
        description: 'Underwater photography is blah, blah, blah',
        images: [
          {
            src: 'pics/--P3120194-Edit-Edit-Edit-Edit.jpg',
            title: 'Underwater',
            description: 'description',
          },
          {
            src: 'pics/179-Edit-2.jpg',
            title: 'Underwater',
            description: 'description',
          },
          {
            src: 'pics/CM7P7948-Edit-Edit.jpg',
            title: 'Underwater',
            description: 'description',
          },
        ],
      },

      {
        album: 'Special Announcements',
        alignment: 'right',
        description: 'Special Occasions photography is blah, blah, blah',
        images: [
          {
            src: 'pics/0050-Edit.jpg',
            title: 'Special Occasions',
            description: 'description',
          },
        ],
      },
      {
        album: 'Landscapes',
        description: 'Landscapes photography is blah, blah, blah',
        images: [
          {
            src: 'pics/dxthm1000.CM7P7336-Edit.jpg',
            title: 'Landscapes',
            description: 'description',
          },
        ],
      },
      {
        album: 'Celebrities',
        description: 'Celebrities photography is blah, blah, blah',
        images: [
          {
            src: 'pics/dxthm1000.003work.jpg',
            title: 'Celebrities',
            description: 'description',
          },
        ],
      },
    ]);
  }
}
