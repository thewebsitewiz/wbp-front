import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wbp-progress',
  standalone: true,
  imports: [],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent implements OnInit {
  @Input() progress = 0;
  constructor() {}

  ngOnInit() {}
}
