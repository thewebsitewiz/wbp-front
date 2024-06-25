import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { Observable, Subject, takeUntil, timer } from 'rxjs';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

import { DomainService } from '@adapters/domain.service';
import { ImageService } from '@adapters/image.service';

import { Image } from '@interfaces/image.interface';

import { MessageService, FilterService, PrimeNGConfig } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'wbp-image-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    ToastModule,
    AutoCompleteModule,
    FileUploadModule,
  ],
  providers: [MessageService, FilterService, DomainService],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  editmode: boolean = false;
  isSubmitted: boolean = false;

  uploadedFiles: any[] = [];

  imageForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    caption: new FormControl(''),
    comments: new FormControl(''),
    dateTaken: new FormControl(''),
    tags: new FormControl('', Validators.required),
    image: new FormControl<File | null | undefined>(null, Validators.required),
  });
  @Input() id!: string;

  imageDisplay!: string | ArrayBuffer | null | undefined;
  currentImageId!: number;
  endsubs$: Subject<any> = new Subject();

  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  filteredTags: any[] = [];
  selectedTags: any[] = [];

  constructor(
    private primengConfig: PrimeNGConfig,
    private location: Location,
    private messageService: MessageService,
    private filterService: FilterService,
    @Inject(ImageService) private imageService: ImageService,
    @Inject(DomainService) private domainService: DomainService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };

    this.domainService.getDomain('tags').subscribe((data: any) => {
      this.filteredTags = data;
      console.log('tags', this.filteredTags);
    });

    this.fileInfos = this.imageService.getImages();

    this.checkEditMode();
  }

  filterTags(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];

    console.log('event', event.query);
    let query = event.query;
    for (let i = 0; i < this.filteredTags.length; i++) {
      let tag = this.filteredTags[i];
      console.log(tag);
      if (tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tag);
      }
    }
    this.filteredTags = [];
    this.filteredTags = filtered;
  }

  /*   onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file && this.imageForm !== null) {
      this.imageForm.patchValue({ image: file });
      if (this.imageForm.get('image')) {
        this.imageForm.get('image')!.updateValueAndValidity();
      }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  } */

  checkEditMode() {
    if (this.id !== null && this.id !== undefined) {
      this.editmode = true;
    } else {
      this.editmode = false;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.imageForm.invalid) return;

    const imageFormData: any = {};

    const skipFields = ['tags', 'image'];

    for (const field in this.imageForm.controls) {
      if (
        this.imageForm.controls.hasOwnProperty(field) &&
        !skipFields.includes(field)
      ) {
        imageFormData[field] = this.imageForm.get(field)?.value;
      }
    }

    if (this.selectedTags.length > 0) {
      imageFormData.tags = this.selectedTags;
    }

    if (this.editmode) {
      this._updateImage(imageFormData);
    } else {
      this._addImage(imageFormData);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _addImage(imageData: FormData) {
    // this.uploadFile();
  }

  selectFile(event: any): void {
    this.progress = 0;
    this.message = '';
    this.currentFile = event.target.files.item(0);

    if (this.currentFile && this.imageForm !== null) {
      this.imageForm.patchValue({ image: this.currentFile });
      if (this.imageForm.get('image')) {
        this.imageForm.get('image')!.updateValueAndValidity();
      }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(this.currentFile);
    }
  }

  uploadFile(): void {
    if (this.currentFile) {
      this.imageService.uploadFile(this.currentFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.imageService.getImages();
          }
        },
        error: (err: any) => {
          console.log(err);

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
          this.progress = 0;
        },
        complete: () => {
          this.currentFile = undefined;
        },
      });
    }
  }

  private _updateImage(imageData: FormData) {
    this.imageService
      .updateImage(imageData, this.currentImageId)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product is updated!',
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
            detail: 'Product is not updated!',
          });
        }
      );
  }

  get prodForm() {
    return this.imageForm.controls;
  }
}
