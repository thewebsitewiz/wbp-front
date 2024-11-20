import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Slide, Slides } from '../interfaces/carousel.interface';

@Injectable()
export class CarouselService {
  slides: Slides = [];

  p!: number;
  c: number = 0;
  n: number = 1;

  slideLen!: number;
  lastSlide!: number;

  ref!: ElementRef;
  prefix!: string;

  constructor() {}

  initCarousel(ref: ElementRef, prefix: string, slides: Slide[]) {
    console.log('initCarousel: ', prefix, slides);

    this.ref = ref;
    this.prefix = prefix;
    this.slides = slides;

    this.slideLen = this.slides?.length;
    this.lastSlide = this.slideLen;
    this.p = this.lastSlide - 1;

    this.updateSlides();
  }

  async updateSlides(): Promise<void> {
    console.log('updateSlides: ', this.prefix, this.slides);
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

    if (
      this.slides[this.c]?.src !== undefined &&
      this.slides[this.c]?.src !== null
    ) {
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

  getSlides(): Observable<Slide[]> {
    return of([
      {
        src: 'pics/--155-Edit-Edit.jpg',
        alt: 'photo 1',
        slider: {
          width: 250,
          height: 300,
          sliderClass: 'coral',
          typingText: 'Professional Photography',
          header: 'Wedding Photography',
          headerColor: '',
          subHeader: '',
          subHeaderColor: '',
          content:
            "Professional wedding photography is an art form that goes beyond capturing moments; it encapsulates emotions, stories, and the essence of one of the most significant days in a couple's life. It involves a delicate balance of technical expertise, creativity, and interpersonal skills to deliver timeless images that evoke nostalgia and joy for years to come.        ",
          contentColor: '',
          origin: '-350 250 0 0',
          destination: '200 400 0 0',
        },
      },
      {
        src: 'pics/--501-Edit.jpg',
        alt: 'Wedding Photography Destination Belize',
        slider: {
          width: 400,
          height: 500,
          sliderClass: '',
          header: 'Exotic Locations',
          headerColor: '',
          subHeader: '',
          subHeaderColor: '',
          content: [
            `In the heart of an exotic paradise, where azure waters kiss powdery sands and verdant palms sway in rhythm with love's gentle dance, wedding portraits
      transcend mere snapshots; they become timeless canvases of romance and adventure. Against a backdrop of majestic mountains or
      beneath the vibrant hues of a tropical sunset, the couple's love story unfolds in each captured moment.`,
            `A moment suspended in time, where love, beauty, and paradise intertwine in perfect harmony.`,
          ],
          contentColor: '',
          origin: '0 -550 -500 0',
          destination: '0 250 50 0',
        },
      },
      {
        src: 'pics/--98-Edit.jpg',
        alt: 'Two Flower Girls',
        slider: {
          width: 350,
          height: 500,
          sliderClass: '',
          header: 'Precious Memories',
          headerColor: '',
          subHeader: '',
          subHeaderColor: '',
          content: [
            `In a tropical paradise, small feet leave imprints in soft sand, giggles dancing in the warm breeze. Sun-kissed faces adorned with bright smiles, chasing each other down pristine beaches. Innocent eyes marvel at vibrant corals, tiny fingers tracing patterns in tide pools, accompanied by seagulls on sun-drenched shores.`,
            `Nights alive with the enchanting chorus of crickets, as little ones drift off to dreams under a canopy of stars. These moments, woven into the fabric of paradise, become the timeless jewels of childhood, sparkling with the magic of the tropics, forever etched in the heart's treasure trove.`,
          ],
          contentColor: '',
          origin: '0 500 -320',
          destination: '0 650 0 250',
        },
      },
      {
        src: 'pics/--Edit-2121.jpg',
        alt: 'Happy Hour Bridesmaids',
      },
      {
        src: 'pics/--115-Edit.jpg',
        alt: 'Couple Kissing Sunset',
      },
      {
        src: 'pics/--0161-Edit.jpg',
        alt: 'Married Couple Walking on Beach',
      },
      {
        src: 'pics/--281-Edit.3.jpg',
        alt: 'Married Couple Kissing Underwater',
      },
      {
        src: 'pics/49-Edit-Edit.jpg',
        alt: 'Portrait Lady Chair Ocean',
      },
      {
        src: 'pics/--135-Edit.jpg',
        alt: 'Sea Turtle Underwater',
        slider: {
          width: 250,
          height: 300,
          sliderClass: 'coral',
          header: 'Exotic Underwater Photography',
          headerColor: '',
          subHeader: '',
          subHeaderColor: '',
          content: `Underwater photography captures a hidden world of
          mesmerizing beauty. Beneath the waves, vibrant corals sway
          ]and elusive creatures glide with grace. The lens reveals a
          kaleidoscope of colors, from the azure depths to the sunlit
          shallows. Mastering this art requires skill in buoyancy control,
          composition, and understanding light's behavior in water. Each
          click immortalizes fleeting moments, preserving the ocean's mystique.
          Through these images, we connect with an aquatic realm, inspiring awe
           and fostering conservation efforts for its preservation.`,
          contentColor: '',
          origin: '200 100 0 0',
        },
      },
    ]);
  }
}
