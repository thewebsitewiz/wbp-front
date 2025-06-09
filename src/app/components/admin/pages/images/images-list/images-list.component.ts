import {
  Component,
  inject,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

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
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { ImageService } from '../../../../../services/image.service';
import { TagService } from '../../../../../services/tag.service';
import { ITag, ITagStatusEnum } from '../../../../../interfaces/tag.interface';

import { IImage } from '../../../../../interfaces/image.interface';

@Component({
    selector: 'wbp-images-list',
    imports: [
        CommonModule,
        BadgeModule,
        ButtonModule,
        CardModule,
        ConfirmDialogModule,
        DialogModule,
        MessagesModule,
        TableModule,
        TagModule,
        ToastModule,
        ToolbarModule,
    ],
    providers: [ConfirmationService, MessageService, FilterService],
    templateUrl: './images-list.component.html',
    styleUrl: './images-list.component.scss'
})
export class ImageListComponent implements OnInit {
  images: IImage[] = [];

  endsubs$: Subject<any> = new Subject();
  protocol: string = '';
  host: string = '';
  first: number = 0;
  initialTotalRecords!: number;
  totalRecords!: number;

  tags: Set<string> = new Set();
  tagList: string[] = [];
  tagStatus: { [key: string]: boolean } = {
    All: true,
  };
  showAll: boolean = true;
  imageList: IImage[] = [];

  showPreview: boolean = false;
  previewUrl: string = '';
  previewImageTitle: string = '';

  @ViewChild('dt') dt: Table | undefined;

  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private filterService = inject(FilterService);
  private primengConfig = inject(PrimeNGConfig);
  private imageService = inject(ImageService);
  private tagService = inject(TagService);
  private router = inject(Router);
  private location = inject(Location);

  constructor() {}

  ngOnInit(): void {
    this._getAllImages();
  }

  private _getAllImages() {
    this.imageService
      .getAllImages()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((images: any) => {
        images.data.forEach((image: any) => {
          image.src = `${environment.imageUrl}/${image.src}`;

          // Add tags to the tags set
          if (image && image.tagInfo) {
            image.tagInfo.forEach((tag: any) => {
              this.tags.add(tag.tag);
              this.tagStatus[tag.tag] = true;
            });
          }

          this.images.push(image);
        });

        this.imageList = [...this.images];
        this.totalRecords = this.imageList.length;

        // Convert tags set to array
        this.tagList = Array.from(this.tags);
      });

    this.resetTagList();
    this.resetImageList();
  }

  resetTagList() {
    this.tagStatus = {};

    this.tagList.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    this.tagStatus['All'] = true;
    this.tagList.forEach((tag: string) => {
      this.tagStatus[tag] = true;
    });

    this.showAll = true;
  }

  resetImageList() {
    this.imageList.length = 0;
    this.totalRecords = 0;

    this.imageList = [...this.images];
    this.totalRecords = this.imageList.length;
  }

  toggleTag(tag: string): void {
    // if tag === 'all', reset to all
    if (tag === 'All') {
      this.resetTagList();
      this.resetImageList();
      return;
    }
    // if selected tag is status false
    if (this.tagStatus[tag] === false && tag !== 'all') {
      this.tagStatus[tag] = true;
      this.showAll = false;

      this.getFilteredImageList();
    }

    // if selected tag is status true
    if (this.tagStatus[tag] === true && tag !== 'all') {
      Object.keys(this.tagStatus).forEach((key: string) => {
        if (key === tag) {
          this.tagStatus[key] = true;
        } else {
          this.tagStatus[key] = false;
        }
      });
      this.showAll = false;

      this.getFilteredImageList();
    }
  }

  getTagColor(tag: string): string {
    let backgroundColor = 'grey';
    if (this.tagStatus[tag] === true) {
      backgroundColor = 'blue';
    }

    return backgroundColor;
  }

  getFilteredImageList(): void {
    // get all images
    if (this.showAll === true) {
      this.resetTagList();
      this.resetImageList();
    }
    // get only selected images by tag
    else {
      this.imageList.length = 0;
      this.totalRecords = 0;
      this.images.forEach((image: IImage) => {
        let shouldPushImage = false;
        if (Array.isArray(image['tagInfo'])) {
          image['tagInfo'].forEach((tag: any) => {
            if (
              this.tagStatus[tag.tag] === true ||
              this.tagStatus['All'] === true
            ) {
              shouldPushImage = true;
            }
          });
        }

        if (shouldPushImage) {
          this.imageList.push(image);
        }
      });

      this.totalRecords = this.imageList.length;
    }
  }

  setStatus(imageId: string): void {
    let status = this.imageList.find((image) => image['_id'] === imageId)?.[
      'isActive'
    ];
    const updateValue: { [key: string]: string | boolean } = {
      isActive: !status,
    };

    this.imageService
      .updateImageFields(imageId, updateValue)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: () => {
          const index = this.images.findIndex(
            (image) => image['_id'] === imageId
          );
          this.images[index].isActive = !status;
          this.imageList = [...this.images];
          this.getFilteredImageList();
          const fields = Object.keys(updateValue).join(', ');
          let verb = 'has';
          if (fields.length > 1) {
            verb = 'have';
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${fields} ${verb} been updated`,
          });
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Image was not updated! ${err.message}`,
          });
        },
      });
  }

  editImage(imageID: string) {
    const route = `admin/images/form/${imageID}`;
    this.router.navigateByUrl(route);
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

  openPreview(url: string, title: string): void {
    this.previewUrl = url;
    this.showPreview = true;
    this.previewImageTitle = title;
  }

  closeAlbum(): void {
    this.showPreview = false;
  }
  ngOnDestroy() {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }
}
