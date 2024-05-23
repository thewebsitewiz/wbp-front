import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'wbp-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  slides = [
    {
      src: '/images/--501-Edit.jpg',
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
      src: '/images/--98-Edit.jpg',
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
      src: '/images/--Edit-2121.jpg',
      alt: 'Happy Hour Bridesmaids',
    },
    {
      src: '/images/--115-Edit.jpg',
      alt: 'Couple Kissing Sunset',
    },
    {
      src: '/images/--0161-Edit.jpg',
      alt: 'Married Couple Walking on Beach',
    },
    {
      src: '/images/--281-Edit.3.jpg',
      alt: 'Married Couple Kissing Underwater',
    },
    {
      src: '/images/49-Edit-Edit.jpg',
      alt: 'Portrait Lady Chair Ocean',
    },
    {
      src: '/images/--135-Edit.jpg',
      alt: 'Sea Turtle Underwater',
    },
  ];
}
