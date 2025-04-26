import {
  Component,
  Inject,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';

import {
  Observable,
  Subject,
  Subscription,
  pipe,
  takeUntil,
  timer,
} from 'rxjs';

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

import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';

import { SelectTagsComponent } from '../../shared/select-tags/select-tags.component';

@Component({
  selector: 'wbp-image-form',
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
    SelectTagsComponent,
  ],

  providers: [MessageService],
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss'],
})
export class ImageFormComponent implements OnInit, OnDestroy {
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

  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  files: any[] = [];

  md!: any;

  defaultDate!: Date;

  imageId!: string | undefined;
  image$!: Observable<IImageResponse>;
  image: IImage | null = null;

  imageDisplay!: string | ArrayBuffer | null | undefined;

  selectedTags: string[] = [];

  endsubs$: Subject<any> = new Subject();

  private imageService = inject(ImageService);
  private messageService = inject(MessageService);

  constructor(
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };

    this._checkEditMode();
  }

  private _checkEditMode(): void {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      this.imageId = params['id'] || undefined;
      if (!this.imageId) {
        return;
      }
      this.editmode = true;
      this.imageButtonLabel = 'Choose New Image';
      this.image$ = this.imageService
        .getImage(this.imageId)
        .pipe(takeUntil(this.endsubs$));

      this.image$.subscribe((image: IImageResponse) => {
        if (image.success !== true || image.data === undefined) {
          this.image = null;
          this.messageService.add({
            summary: 'Error',
            detail: `No image found! :  ${image.success} :  ${image.data} : ${this.imageId}`,
          });
          return;
        }

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
          this.selectedTags = [...this.image.tags];

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
        this.imageForm.controls['image'].updateValueAndValidity();
      });
    });
  }

  updateTagsInForm(tags: string[]): void {
    this.selectedTags = [...tags];
    this.imageForm.patchValue({ tags: this.selectedTags });
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
      this.handleFormError('Form Submission Error!');
      return;
    }

    if (!this.editmode) {
      this.handleAddImage();
    } else if (this.imageId === undefined) {
      this.handleFormError('No image loaded for editing!');
    } else {
      this.handleEditImage();
    }

    this.resetFormState();
  }

  private handleFormError(message: string) {
    this.isSubmitted = false;
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  private handleAddImage() {
    const formData = new FormData();
    const skippedFields: string[] = [];

    Object.keys(this.imageForm.controls).forEach((field) => {
      if (!skippedFields.includes(field)) {
        try {
          formData.append(field, this.imageForm.get(field)?.value);
        } catch (e) {
          this.handleFormError(`FormData append error: ${field}`);
          console.error('FormData append error:', e);
        }
      }
    });

    this._addImage(formData);
  }

  private handleEditImage() {
    const imageData: { [key: string]: string | number | boolean } = {};
    const skippedFields: string[] = ['image', 'height', 'width'];

    Object.keys(this.imageForm.controls).forEach((field) => {
      if (!skippedFields.includes(field)) {
        imageData[field] = this.imageForm.get(field)?.value;
      }
    });

    this._patchImage(imageData, this.imageId!);
  }

  private resetFormState() {
    this.imageForm.reset();
    this.imagePreview = null;
    this.selectedTags = [];
    this.editmode = false;
  }

  onCancel() {
    this.router.navigate(['/admin/images/browse']);
  }

  private _addImage(imageData: FormData): void {
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
          timer(3000).subscribe(() => {
            this.router.navigate(['/admin/images/browse']);
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

  private _patchImage(
    imageData: { [key: string]: string | number | boolean },
    id: string
  ) {
    this.imageService
      .updateImage(id, imageData)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Image is updated!',
          });
          timer(3000).subscribe(() => {
            this.router.navigate(['/admin/images/browse']);
          });
        },
        error: (error) => () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Image is not updated! ${error.message}`,
          });
        },
      });
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

  /**
   * Provides access to the form controls of the image form.
   * Facilitates accessing and manipulating the form controls.
   * @returns The form controls.
   */
  get formControls() {
    return this.imageForm.controls;
  }

  ngOnDestroy() {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }
}
