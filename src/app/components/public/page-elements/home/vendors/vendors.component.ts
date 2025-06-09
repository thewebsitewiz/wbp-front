import { VendorService } from '@app/services/vendor.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CarouselService } from './../../../../../services/carousel.service';
import { ISlides } from '../../../../../interfaces/slide.interface';

@Component({
  selector: 'wbp-vendors',
  imports: [],
  providers: [
    {
      provide: CarouselService,
      useFactory: () => new CarouselService(),
    },
  ],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss',
})
export class VendorsComponent implements OnInit {
  @ViewChild('vendorCurr', { static: true }) vendorCurr!: ElementRef;

  prefix: string = 'vendor';

  constructor(
    private vendorService: VendorService,
    private carouselService: CarouselService
  ) {}

  ngOnInit() {
    this.vendorService.getVendors().subscribe((vendors: ISlides) => {
      this.carouselService.initCarousel(
        this.vendorCurr,
        this.prefix,
        vendors,
        5
      );
    });
  }

  prevSlide() {
    this.carouselService.prevSlide();
  }

  nextSlide() {
    this.carouselService.nextSlide();
  }
}
