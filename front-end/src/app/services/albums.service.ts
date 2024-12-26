import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAlbum } from '../interfaces/album.interface';
import { Albums } from '../../assets/json/album.data';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor() {}

  getAlbums(): Observable<IAlbum[]> {
    return of(Albums);
  }
}
