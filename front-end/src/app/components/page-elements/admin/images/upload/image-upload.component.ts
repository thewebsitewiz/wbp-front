import {
  Component,
  Inject,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { CommonModule, Location } from '@angular/common';

import { Observable, Subject, pipe, takeUntil, timer } from 'rxjs';

import { orderBy } from 'lodash';

import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

import { TagService } from '@adapters/tag.service';
import { ImageService } from '@adapters/image.service';

import { Image } from '@interfaces/image.interface';
import { Tag } from '@interfaces/tag.interface';

import { MessageService, FilterService, PrimeNGConfig } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ProgressComponent } from './progress/progress.component';

@Component({
  selector: 'wbp-image-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    ToastModule,
    FileUploadModule,
    TagModule,
    BadgeModule,
    ProgressComponent,
  ],

  providers: [MessageService, FilterService, TagService],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  editmode: boolean = false;
  isSubmitted: boolean = false;

  uploadedFiles: any[] = [];

  imageForm: FormGroup = new FormGroup({
    title: new FormControl('Fathers Day Stealie - Test', Validators.required),
    description: new FormControl('SYF with Grateful Dad'),
    caption: new FormControl('Happy Fathers Day to all of you  Grateful Dads'),
    comments: new FormControl('Created by Daryl Johnson'),
    dateTaken: new FormControl(''),
    tags: new FormControl('Parties,Fathers Day,Weddings', Validators.required),
    image: new FormControl<File | null>(null, Validators.required),
  });
  @Input() id!: string;

  imagePreview!: string | ArrayBuffer | null | undefined;
  currentImageId!: number;
  endsubs$: Subject<any> = new Subject();

  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  files: any[] = [];

  tagsLookup: { [key: string]: Tag } = {};
  filteredTags: any[] = [];
  selectedTags: any[] = [];

  badgeValue: any = {};
  badgeSeverity: any = {};

  uploadDisabled: boolean = true;

  @ViewChild('newTag', { static: false }) newTag!: ElementRef<HTMLInputElement>;

  constructor(
    private primengConfig: PrimeNGConfig,
    private location: Location,
    private messageService: MessageService,
    private filterService: FilterService,
    @Inject(ImageService) private imageService: ImageService,
    @Inject(TagService) private tagService: TagService,
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };

    this._getTags();

    this.fileInfos = this.imageService.getImages();

    this.checkEditMode();

    this.imageForm.get('image')?.valueChanges.subscribe((value) => {
      if (value) {
        this.uploadDisabled = false;
      } else {
        this.uploadDisabled = true;
      }
    });
  }

  private _setBadgeSettings() {
    for (let tag in this.tagsLookup) {
      if (
        this.tagsLookup[tag] !== undefined ||
        (null && this.tagsLookup[tag]['count'] !== undefined) ||
        null
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

  checkEditMode() {
    if (this.id !== null && this.id !== undefined) {
      this.editmode = true;
    } else {
      this.editmode = false;
    }
  }

  private _getTags() {
    this.tagService.getTags().subscribe((tags: Array<Tag>) => {
      tags.forEach((tag: Tag) => {
        const resultTag = {
          tag: tag.tag,
          _id: tag._id,
          id: tag.id,
          description: tag.description,
          count: tag.count,
        };
        this.tagsLookup[tag['tag']] = resultTag;

        this.filteredTags.push(resultTag);
      });

      this._setBadgeSettings();
    });
  }

  _addTagToForm() {
    let tags: string[] = [];
    this.selectedTags.forEach((tag: Tag) => {
      tags.push(tag.tag);
    });

    const tagIdList = this.selectedTags.map((tag: Tag) => tag._id).join(',');

    this.imageForm.patchValue({ tags: tagIdList });
  }

  addNewTag(event: any) {
    const value = event.value;
    this.tagService.addTag(value).subscribe((result: any) => {
      const resultTag = {
        tag: value,
        _id: result._id,
        id: result.id,
        count: 0,
      };
      this.tagsLookup[value] = resultTag;
      this.filteredTags.push(resultTag);

      this.filteredTags = orderBy(
        this.filteredTags,
        ['count', 'tag'],
        ['desc', 'asc'],
      );

      this.newTag.nativeElement.value = '';
      this._setBadgeSettings();
    });
  }

  selectTag(selectedTag: string) {
    this.selectedTags.push(this.tagsLookup[selectedTag]);
    this.selectedTags = orderBy(
      this.selectedTags,
      ['count', 'tag'],
      ['desc', 'asc'],
    );

    this._addTagsToForm();

    const tempTags = [...this.filteredTags];
    const newFilteredTags: any[] = [];

    tempTags.forEach((tag: Tag) => {
      if (tag.tag !== selectedTag) {
        newFilteredTags.push(tag);
      }
    });

    this.filteredTags = orderBy(
      newFilteredTags,
      ['count', 'tag'],
      ['desc', 'asc'],
    );

    this._addTagToForm();
    this._setBadgeSettings();
  }

  deSelectTag(selectedTag: string) {
    const tempTags = [...this.selectedTags];
    const newSelectedTags: any[] = [];

    tempTags.forEach((tag: Tag) => {
      if (tag.tag !== selectedTag) {
        newSelectedTags.push(tag);
      }
    });

    this.selectedTags = orderBy(
      newSelectedTags,
      ['count', 'tag'],
      ['desc', 'asc'],
    );

    this._addTagsToForm();

    this.filteredTags.push(this.tagsLookup[selectedTag]);
    this.filteredTags = orderBy(
      this.filteredTags,
      ['count', 'tag'],
      ['desc', 'asc'],
    );
    this.filteredTags = orderBy(
      this.filteredTags,
      ['count', 'tag'],
      ['desc', 'asc'],
    );

    this._setBadgeSettings();
  }

  _addTagsToForm() {
    let tagIdsList: string[] = [];
    this.selectedTags.forEach((tag: Tag) => {
      tagIdsList.push(tag._id);
    });

    this.imageForm.patchValue({ tags: tagIdsList.join(',') });
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
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    console.log('this.imageForm', this.imageForm);
    if (this.imageForm.invalid) return;

    //this.isLoading = true;
    let skippedFields = ['tags'];
    let imageFormData: FormData = new FormData();
    for (const field in this.imageForm.controls) {
      if (
        this.imageForm.controls.hasOwnProperty(field) &&
        !skippedFields.includes(field)
      ) {
        imageFormData.append(field, this.imageForm.get(field)?.value);
      }
    }

    if (this.editmode === false) {
      this._addImage(imageFormData);
    } else {
      this._updateImage(imageFormData, this.id);
    }
    this.imageForm.reset();
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

  private _updateImage(imageData: FormData, id: string) {
    this.imageService
      .updateImage(imageData, id)
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
        },
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
}
