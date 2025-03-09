import { tagColor } from './../../../../../../assets/json/tagColor.data';
import {
  Component,
  Inject,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import { CommonModule, Location } from '@angular/common';

import { Observable, Subject, pipe, takeUntil, timer } from 'rxjs';

import { environment } from '@env/environment';

import { orderBy } from 'lodash';

import * as ExifReader from 'exifreader';

import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';

import { TagService } from '@app/services/tag.service';
import { ImageService } from '@app/services/image.service';

import { IImage, IImageResponse } from '@interfaces/image.interface';
import { ITag, ITagStatusEnum } from '@interfaces/tag.interface';

import { MessageService, FilterService, PrimeNGConfig } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wbp-image-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    SelectButtonModule,
    InputTextModule,
    ToastModule,
    FileUploadModule,
    TagModule,
    BadgeModule,
  ],

  providers: [MessageService, FilterService],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit, OnDestroy {
  editmode: boolean = false;
  isSubmitted: boolean = false;

  uploadedFiles: any[] = [];

  imageForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    caption: new FormControl(''),
    comments: new FormControl(''),
    dateTaken: new FormControl(''),
    tags: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null, Validators.required),
  });

  imageButtonLabel: string = 'Choose Image';
  imagePreview!: string | ArrayBuffer | null | undefined;
  currentImageId!: number;
  endsubs$: Subject<any> = new Subject();

  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  files: any[] = [];

  getTags$!: Observable<ITag[]>;
  tagsLookup: { [key: string]: ITag } = {};
  tagsLookupById: { [key: string]: ITag } = {};
  filteredTags: any[] = [];
  selectedTags: any[] = [];

  sortTagsBy: string = 'count';

  badgeValue: any = {};
  badgeSeverity: any = {};

  md!: any;

  defaultDate!: Date;

  imageId!: string | undefined;
  image: IImage | null = null;

  imageDisplay!: string | ArrayBuffer | null | undefined;

  @ViewChild('tagInput', { static: false })
  tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('newTag', { static: false }) newTag!: ElementRef<HTMLInputElement>;

  constructor(
    private primengConfig: PrimeNGConfig,
    private location: Location,
    private messageService: MessageService,
    private filterService: FilterService,
    private route: ActivatedRoute,
    @Inject(ImageService) private imageService: ImageService,
    @Inject(TagService) private tagService: TagService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };

    this.getTags$ = this._getTags();

    this.getTags$.subscribe((tags: Array<ITag>) => {
      tags.forEach((tag: ITag) => {
        this.tagsLookup[tag.tag] = tag;
        this.tagsLookupById[tag._id] = tag;
        this.filteredTags.push(tag);
      });

      // Set the badge settings
      this._setBadgeSettings();

      this._sortTags();

      this.checkEditMode();
    });

    // this.fileInfos = this.imageService.getAllImages();
  }

  private _getTags() {
    return this.tagService.getAllTags().pipe(takeUntil(this.endsubs$));
  }

  checkEditMode(): void {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      this.imageId = params['id'] || undefined;
      if (!this.imageId) {
        return;
      }
      this.editmode = true;
      this.imageButtonLabel = 'Choose New Image';
      this.imageService
        .getImage(this.imageId)
        .pipe(takeUntil(this.endsubs$))
        .subscribe((image: IImageResponse) => {
          console.log(`image! ${image.success} : ${image.data}`);
          if (image.success !== true || image.data === undefined) {
            this.image = null;
            this.messageService.add({
              summary: 'Error',
              detail: `No image found! :  ${image.success} :  ${image.data} : ${this.imageId}`,
            });
            return;
          }

          this.image = null;
          if (Array.isArray(image.data)) {
            this.image = image.data[0];
          } else {
            this.image = image.data;
          }
          if (
            this.image &&
            this.image.tags !== undefined &&
            this.image.tags.length > 0
          ) {
            console.log(' this.image', this.image);
            this.image.tags.forEach((tagId: string) => {
              const tag = this.tagsLookupById[tagId];
              this.selectTag(tag.tag);
            });
          }

          this.imageForm.patchValue({
            title: this.image.title,
            description: this.image.description,
            caption: this.image.caption,
            comments: this.image.comments,
            dateTaken: this.image.dateTaken,
            tags: this.selectedTags,
            image: this.image.src,
          });

          this.imagePreview = `${environment.imageUrl}/${this.image.src}`;
          console.log('this.imagePreview', this.imagePreview);
          this.imageForm.controls['image'].updateValueAndValidity();
        });
    });
  }

  tagSortSelected(sortBy: string) {
    this.sortTagsBy = sortBy;
    this._sortTags();
  }

  selectTag(selectedTag: string) {
    // Remove Selected Tag from the filteredTags
    this.filteredTags.filter(
      (tag: ITag) => tag.tag !== selectedTag // filter out the selected tag
    );

    // Update the count of the selected tag
    if (
      selectedTag &&
      this.tagsLookup &&
      this.tagsLookup[selectedTag] &&
      this.tagsLookup[selectedTag].count
    ) {
      this.tagsLookup[selectedTag].count += 1;
    }

    this._setBadgeSettings();

    // Add Selected Tag to the selectedTags
    this.selectedTags.push(this.tagsLookup[selectedTag]);

    // Sort the filtered and selected tags
    this._sortTags();

    // Add the selected tags to the form
    this._addTagToForm();
  }

  deSelectTag(selectedTag: string) {
    const currentlySelectedTags = [...this.selectedTags];

    // Remove Selected Tag from the selectedTags
    // filter out the selected tag
    this.selectedTags = currentlySelectedTags.filter(
      (tag: ITag) => tag.tag !== selectedTag
    );

    // Update the count of the selected tag
    if (
      selectedTag &&
      this.tagsLookup &&
      this.tagsLookup[selectedTag] &&
      this.tagsLookup[selectedTag].count &&
      this.tagsLookup[selectedTag].count > 0
    ) {
      this.tagsLookup[selectedTag].count -= 1;
    }

    this._setBadgeSettings();

    // Add Selected Tag back into the filteredTags
    this.filteredTags.push(this.tagsLookup[selectedTag]);

    // Order the filtered and selected tags
    this._sortTags();
  }

  private _sortTags() {
    if (this.sortTagsBy === 'tag') {
      this.selectedTags = orderBy(this.selectedTags, ['tag'], ['asc']);
      this.filteredTags = orderBy(this.filteredTags, ['tag'], ['asc']);
    } else {
      this.selectedTags = orderBy(
        this.selectedTags,
        ['count', 'tag'],
        ['desc', 'asc']
      );
      this.filteredTags = orderBy(
        this.filteredTags,
        ['count', 'tag'],
        ['desc', 'asc']
      );
    }
  }

  private _setBadgeSettings() {
    for (let tag in this.tagsLookup) {
      if (
        this.tagsLookup[tag] !== undefined &&
        (this.tagsLookup[tag]['count'] !== undefined || null)
      ) {
        const tagCount = this.tagsLookup[tag]['count'] || 0;
        this.badgeValue[this.tagsLookup[tag].tag] = this.tagsLookup[tag].count;
        if (tagCount > 30) {
          this.badgeSeverity[this.tagsLookup[tag].tag] = 'danger';
        } else if (tagCount > 20) {
          this.badgeSeverity[this.tagsLookup[tag].tag] = 'warning';
        } else if (tagCount > 10) {
          this.badgeSeverity[tag] = 'info';
        } else {
          this.badgeSeverity[tag] = 'success';
        }
      }
    }
  }

  private _addTagToForm() {
    const tagIdList = this.selectedTags.map((tag: ITag) => tag._id).join(',');

    this.imageForm.patchValue({ tags: tagIdList });
  }

  addNewTag(event: any) {
    const { value } = event;
    this.tagService.addTag(value).subscribe((tag: any) => {
      if (tag.status !== null && tag.status !== '200') {
        this.messageService.add({
          severity: 'error',
          summary: 'Tag Exists',
          detail: `Tag ${value} exists already!`,
        });
      } else {
        const resultTag: ITag = {
          tag: value,
          _id: tag._id,
          id: tag.id,
          count: 0,
          createdAt: tag.createdAt,
          updatedAt: tag.updatedAt,
        };

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Tag added successfully!',
        });

        this.tagsLookup[value] = resultTag;

        // Add tag to selected tags
        this.selectTag(value);

        // Order the filtered and selected tags
        this._sortTags();
      }

      // Clear new tag field
      this.newTag.nativeElement.value = '';
    });
  }

  onImagePicked(event: Event) {
    const element = event.target as HTMLInputElement;
    let file;
    if (element === null || element.files === null) {
      return;
    } else {
      file = element.files[0];
    }
    this.imageForm.patchValue({ image: file });

    if (
      this.formControls !== undefined &&
      this.formControls['image'] !== undefined
    ) {
      this.formControls['image'].updateValueAndValidity();
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this._getMetadata(this.imagePreview);
    };
    reader.readAsDataURL(file);
  }

  private _getMetadata = async (file: any) => {
    this.md = await ExifReader.load(file);

    this._setDateTaken();
  };

  private _setDateTaken(): void {
    let dateTaken = null;
    if (this.md !== undefined) {
      if (
        this.md['DateCreated'] !== undefined &&
        (this.md['DateCreated'].description !== undefined || null)
      ) {
        dateTaken = this.md['DateTime'].description;
      }

      if (
        this.md['DateTimeOriginal'] !== undefined &&
        (this.md['DateTimeOriginal']['description'] !== undefined || null)
      ) {
        dateTaken = this._formatMongoDate(
          this.md['DateTimeOriginal'].description
        );
      }

      if (
        dateTaken === null &&
        this.md['DateTimeCreated'] !== undefined &&
        (this.md['DateTimeCreated'].description !== undefined || null)
      ) {
        dateTaken = this._formatMongoDate(
          this.md['DateTimeOriginal'].description
        );
      }
    }

    if (dateTaken) {
      this.defaultDate = new Date(dateTaken);
    }
  }

  private _formatMongoDate(dateString: string) {
    // in 2022:03:27 15:35:03
    // out 2007-06-02T16:00:00
    let [date, time] = dateString.split(' ');
    date = date.replaceAll(':', '-');

    let stringDate = `${date}T${time}`;
    return new Date(stringDate);
  }

  onSubmit() {
    if (this.imageForm.invalid) {
      this.isSubmitted = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form Submission Error!',
      });
    }

    let skippedFields: any[] = [];
    let imageFormData: FormData = new FormData();
    for (const field in this.imageForm.controls) {
      console.log('field', field);
      if (
        this.imageForm.value.hasOwnProperty(field) &&
        !skippedFields.includes(field)
      ) {
        console.log('\t', this.imageForm.get(field)?.value);
        try {
          imageFormData.append(field, this.imageForm.get(field)?.value);
        } catch (e) {
          console.log('error', e);
        }
      }
    }

    console.log('imageFormData', imageFormData);
    // sourcery skip: merge-else-if
    if (this.editmode === false) {
      this._addImage(imageFormData);
    } else {
      if (this.imageId !== undefined) {
        this._putImage(imageFormData, this.imageId);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No image loaded for editing!',
        });
      }
    }
    this.imageForm.reset();
    this.imagePreview = null;
    this.selectedTags = [];
    this._getTags();
  }

  onCancel() {
    this.location.back();
  }

  private _addImage(imageData: FormData) {
    this.imageService
      .createImage(imageData)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Image is created!`,
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Image is not created!',
          });
        },
      });
  }

  private _putImage(imageData: FormData, id: string) {
    console.log('imageData', imageData);
    this.imageService
      .putImage(imageData, id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Image is updated!',
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Image is not updated!',
          });
        }
      );
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  get formControls() {
    return this.imageForm.controls;
  }
  ngOnDestroy() {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }
}
