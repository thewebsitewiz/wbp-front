import { ElementRef, Injectable } from '@angular/core';
import { ISlide, ISlides } from '../interfaces/slide.interface';

@Injectable()
export class CarouselService {
  slides: ISlides = [];

  p!: number;
  c: number = 0;
  n: number = 1;

  slideLen!: number;
  lastSlide!: number;

  ref!: ElementRef;
  prefix!: string;

  constructor() {}

  initCarousel(ref: ElementRef, prefix: string, slides: ISlide[], auto = 0) {
    this.ref = ref;
    this.prefix = prefix;
    this.slides = slides;

    this.slideLen = this.slides?.length;
    this.lastSlide = this.slideLen;
    1;
    this.p = this.lastSlide - 1;

    this.updateSlides();

    if (auto > 0) {
      setInterval(() => {
        this.nextSlide();
      }, auto * 1000);
    }
  }

  async updateSlides(): Promise<void> {
    await this.resetCallout();

    if (
      this.slides[this.p]?.src !== undefined &&
      this.slides[this.p]?.src !== null
    ) {
      this.ref.nativeElement.style.setProperty(
        `--${this.prefix}-prev`,
        `url(assets/images/${this.slides[this.p].src})`
      );
    } else {
      this.ref.nativeElement.style.setProperty(
        `--${this.prefix}-prev`,
        `url(assets/images/${this.slides[0].src})`
      );
    }

    console.log('c: ', this.c, this.prefix, this.slides[this.c].src);
    if (
      this.slides[this.c]?.src !== undefined &&
      this.slides[this.c]?.src !== null
    ) {
      console.log('c: if');
      this.ref.nativeElement.style.setProperty(
        `--${this.prefix}-curr`,
        `url(assets/images/${this.slides[this.c].src})`
      );
    } else {
      this.ref.nativeElement.style.setProperty(
        `--${this.prefix}-curr`,
        `url(assets/images/${this.slides[0].src})`
      );
    }

    if (
      this.slides[this.n]?.src !== undefined &&
      this.slides[this.n]?.src !== null
    ) {
      this.ref.nativeElement.style.setProperty(
        `--${this.prefix}-next`,
        `url(assets/images/${this.slides[this.n].src})`
      );
    } else {
      this.ref.nativeElement.style.setProperty(
        `--${this.prefix}-next`,
        `url(assets/images/${this.slides[0].src})`
      );
    }

    await this.populateCallout();

    await this.animateCallout();
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
