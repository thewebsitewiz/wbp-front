import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeroService } from './../../../services/hero.service';
import { CarouselService } from '../../../services/carousel.service';
import { ISlides } from '../../../interfaces/slide.interface';

@Component({
    selector: 'wbp-hero',
    imports: [CommonModule],
    providers: [
        HeroService,
        {
            provide: CarouselService,
            useFactory: () => new CarouselService(),
        },
    ],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  @ViewChild('heroCurr', { static: true }) heroCurr!: ElementRef;
  slides: any[] = [];
  prefix: string = 'hero';

  constructor(
    private carouselService: CarouselService,
    private heroService: HeroService
  ) {}

  ngOnInit() {
    this.heroService.getSlides().subscribe((slides: ISlides) => {
      this.carouselService.initCarousel(this.heroCurr, this.prefix, slides);
    });
  }

  prevSlide() {
    this.carouselService.prevSlide();
  }

  nextSlide() {
    this.carouselService.nextSlide();
  }
}
