import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PrimeNGConfig } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'wbp-image-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent implements OnInit {
  editmode: boolean = false;
  isSubmitted: boolean = false;

  imageForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    caption: new FormControl(''),
    comments: new FormControl(''),
    dateTaken: new FormControl(''),
    tags: new FormControl('', Validators.required),
    image: new FormControl(null, Validators.required),
  });
  @Input() id!: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]; // Here we use only the first file (single file)
    this.imageForm.patchValue({ image: file });
  }

  private _checkEditMode() {
    if (this.id) this.editmode = true;
  }

  onSubmit() {}
  onCancel() {}
}
