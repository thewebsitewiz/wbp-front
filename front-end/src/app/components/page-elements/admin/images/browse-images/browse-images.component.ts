import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { CommonModule, Location, NgIf } from '@angular/common';
// import { NgClass, NgForOf, NgStyle, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Table } from 'primeng/table';
import {
  ConfirmationService,
  MessageService,
  FilterService,
  PrimeNGConfig,
} from 'primeng/api';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { ImageService } from '../../../../../services/image.service';
import { TagService } from '../../../../../services/tag.service';
import { IImage } from '../../../../../interfaces/image.interface';

@Component({
  selector: 'wbp-browse-images',
  standalone: true,
  imports: [
    CommonModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    MessagesModule,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
  ],
  providers: [ConfirmationService, MessageService, FilterService],
  templateUrl: './browse-images.component.html',
  styleUrl: './browse-images.component.scss',
})
export class BrowseImagesComponent implements OnInit, OnDestroy {
  images: any = [];
  endsubs$: Subject<any> = new Subject();
  protocol: string = '';
  host: string = '';
  first: number = 0;
  totalRecords!: number;

  tagList: string[] | undefined = [];

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private location: Location,
    private filterService: FilterService,
    @Inject(MessageService)
    private messageService: MessageService,
    @Inject(ConfirmationService)
    private confirmationService: ConfirmationService,
    @Inject(ImageService) private imageService: ImageService,
    @Inject(TagService) private tagService: TagService
  ) {}

  ngOnInit(): void {
    this._getAllImages();
  }

  private _getAllImages() {
    this.imageService
      .getAllImages()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((images: any) => {
        images.data.forEach((image: IImage) => {
          image.src = `${environment.imageUrl}/${image.src}`;
          //  image.activeString = image.isActive ? 'Yes' : 'No';
          image.tagList = [];
          image.tagInfo?.forEach((tag) => {
            if (!!tag && tag['tag'] && this.tagList) {
              this.tagList.push(tag['tag']);
              if (!!image.tagList) {
                image.tagList.push(tag['tag']);
              }
            }
          });

          this.images.push(image);
        });

        console.log('this.images: ', this.images);

        this.totalRecords = this.images.length;
      });
  }

  reset() {
    this.first = 0;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(
      ($event.target as HTMLInputElement).value,
      'contains'
    );
  }

  updateImage(imageID: string) {
    this.router.navigateByUrl(`admin/images/edit/${imageID}`);
  }

  deleteImage(imageID: string) {
    this.confirmationService.confirm({
      message: 'Do you really want to delete this Image?',
      header: 'Delete Image',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.imageService
          .deleteImage(imageID)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
            () => {
              this._getAllImages();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Image is deleted!',
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Image was not deleted!',
              });
            }
          );
      },
    });
  }
  ngOnDestroy() {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }
}
