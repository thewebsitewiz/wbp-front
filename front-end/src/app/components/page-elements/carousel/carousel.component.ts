import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { CarouselService } from '../../../adapters/carousel.service';

@Component({
  selector: 'wbp-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  slides: any[] = [];

  p!: number;
  c: number = 0;
  n: number = 1;

  slideLen!: number;
  lastSlide!: number;

  constructor(
    private ref: ElementRef,
    @Inject(CarouselService) private CarouselService: CarouselService
  ) {}

  ngOnInit() {
    this.CarouselService.getSlides().subscribe((slides) => {
      this.slides = slides;

      this.slideLen = this.slides?.length;
      this.lastSlide = this.slideLen;
      this.p = this.lastSlide - 1;
      this.updateSlides();
    });
  }

  async updateSlides() {
    this.resetCallout();
    if (
      this.slides[this.p]?.src !== undefined &&
      this.slides[this.p]?.src !== null
    ) {
      this.ref.nativeElement.style.setProperty(
        '--prev',
        this.slides[this.p].src
      );
    } else {
      this.ref.nativeElement.style.setProperty('--prev', this.slides[0].src);
    }

    if (
      this.slides[this.c]?.src !== undefined &&
      this.slides[this.c]?.src !== null
    ) {
      this.ref.nativeElement.style.setProperty(
        '--curr',
        this.slides[this.c].src
      );
    } else {
      this.ref.nativeElement.style.setProperty('--curr', this.slides[0].src);
    }

    if (
      this.slides[this.n]?.src !== undefined &&
      this.slides[this.n]?.src !== null
    ) {
      this.ref.nativeElement.style.setProperty(
        '--next',
        this.slides[this.n].src
      );
    } else {
      this.ref.nativeElement.style.setProperty('--curr', this.slides[0].src);
    }

    // await this.populateCallout();

    // await this.animateCallout();
  }

  resetCallout() {}

  populateCallout() {}

  animateCallout() {}

  prevSlide() {
    this.n = this.c;
    this.c = this.p;
    this.p === 0 ? (this.p = this.lastSlide) : (this.p = this.p - 1);
    this.updateSlides();
  }

  nextSlide() {
    this.p = this.c;
    this.c = this.n;
    this.n === this.lastSlide ? (this.n = 0) : (this.n = this.n + 1);
    this.updateSlides();
  }
}
