import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarouselService } from '../../../services/carousel.service';
import { ISlides } from '../../../interfaces/carousel.interface';

@Component({
  selector: 'wbp-hero',
  standalone: true,
  imports: [CommonModule],
  providers: [CarouselService],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  @ViewChild('heroCurr', { static: true }) heroCurr!: ElementRef;
  slides: any[] = [];
  prefix: string = 'hero';

  constructor(private carouselService: CarouselService) {}

  ngOnInit() {
    this.carouselService.getSlides().subscribe((slides: ISlides) => {
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
