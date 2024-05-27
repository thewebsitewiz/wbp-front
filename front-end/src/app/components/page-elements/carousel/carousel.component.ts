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

  sliderContainerOrigin!: string;
  sliderContainerDestination!: string;

  sliderContainer!: HTMLElement | null;
  sliderContent!: HTMLElement | null;
  sliderContentHeader!: HTMLElement | null;
  sliderContentBody!: HTMLElement | null;

  constructor(
    private ref: ElementRef,
    @Inject(CarouselService) private CarouselService: CarouselService
  ) {}

  ngOnInit() {
    this.CarouselService.getSlides().subscribe((slides) => {
      this.slides = slides;
    });

    this.slideLen = this.slides?.length;
    this.lastSlide = this.slideLen;
    this.p = this.lastSlide - 1;

    this.sliderContainer = document.getElementById('slide-animation');
    this.sliderContent = document.getElementById('slide-animation-content');
    this.sliderContentHeader = document.getElementById('slide-animation-title');
    this.sliderContentBody = document.getElementById('slide-animation-body');

    this.updateSlides();
  }

  async updateSlides() {
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

    if (this.slides[this.c]?.slider?.typingText !== undefined || null) {
      await this.typingText(this.slides[this.c].slider.typingText);

      await this.animateSlider();
    }

    if (
      (this.slides[this.c]?.slider?.content !== undefined || null) &&
      (this.slides[this.c]?.slider?.origin !== undefined || null) &&
      (this.slides[this.c]?.slider?.destination !== undefined || null)
    ) {
    }
  }
  animateSlider() {
    // Populate slider content
    let sliderStatus = false;
    console.log(
      'sliderContent',
      this.sliderContent,
      this.slides[this.c]?.slider?.content
    );
    if (this.sliderContainer !== null && this.sliderContent !== null) {
      let width = this.slides[this.c]?.slider?.width;
      let height = this.slides[this.c]?.slider?.height;

      width !== undefined || null || 0 ? width : 350;
      height !== undefined || null || 0 ? height : 350;

      this.sliderContainer.style.width = `${width}px`;
      this.sliderContainer.style.height = `${height}px`;

      if (
        (this.slides[this.c]?.slider?.header !== undefined || null) &&
        this.sliderContentHeader !== null
      ) {
        this.sliderContentHeader.innerHTML = `<h1>${
          this.slides[this.c].slider.header
        }</h1>`;
        sliderStatus = true;
      }
      console.log(
        'sliderContentBody',
        this.sliderContentBody,
        this.slides[this.c]?.slider?.content
      );
      if (
        (this.slides[this.c]?.slider?.content !== undefined || null) &&
        this.sliderContentBody !== null
      ) {
        this.sliderContentBody.innerHTML = `${
          this.slides[this.c].slider.content
        }`;

        sliderStatus = true;
      }

      if (sliderStatus === true && this.sliderContainer !== null) {
        this.sliderContainer.style.display = 'block';
        const origin = this.slides[this.c].slider.origin.split(' ');
        const destination = this.slides[this.c].slider.destination.split(' ');

        const originLeft = parseInt(origin[0]) || null;
        const originTop = parseInt(origin[1]) || null;
        const originRight = parseInt(origin[2]) || null;
        const originBottom = parseInt(origin[3]) || null;

        const destinationLeft = parseInt(destination[0]) || null;
        const destinationTop = parseInt(destination[1]) || null;
        const destinationRight = parseInt(destination[2]) || null;
        const destinationBottom = parseInt(destination[3]) || null;

        if (originLeft !== null)
          this.sliderContainer.style.left = `${originLeft}px`;
        if (originTop !== null)
          this.sliderContainer.style.top = `${originTop}px`;

        if (originRight !== null && originLeft === null)
          this.sliderContainer.style.right = `${originRight}px`;
        if (originBottom !== null && originTop === null)
          this.sliderContainer.style.bottom = `${originBottom}px`;

        this.sliderContainer.style.position = 'absolute';

        let distance = 0;
        console.log(destinationLeft, originLeft, destinationTop, originTop);
        if (
          destinationLeft !== null &&
          originLeft !== null &&
          destinationTop !== null &&
          originTop !== null
        ) {
          this.sliderContainer.animate(
            [
              {
                left: `${originLeft}px`,
                top: `${originTop}px`,
              },
              {
                left: `${destinationLeft}px`,
                top: `${destinationTop}px`,
              },
            ],
            {
              duration: 2500,
              iterations: 1,
              easing: 'ease-in',
            }
          );

          this.sliderContainer.style.left = `${destinationLeft}px`;
          this.sliderContainer.style.top = `${destinationTop}px`;
        }
      }
    }
  }

  typingText(text: string) {
    const typingDelay = 100;
    const typingElement = document.getElementById('typing-text');

    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        if (typingElement !== null) typingElement.textContent += text.charAt(i);
      }, typingDelay * i);
    }
  }

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
