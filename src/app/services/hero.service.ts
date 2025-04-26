import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IHeroSlide } from '../../app/interfaces/hero.interface';
import { HeroSlides } from '../../assets/json/hero.data';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() {}

  getSlides(): Observable<IHeroSlide[]> {
    return of(HeroSlides);
  }
}
