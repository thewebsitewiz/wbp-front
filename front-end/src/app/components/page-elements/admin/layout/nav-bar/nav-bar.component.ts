import { Component } from '@angular/core';

import { provideRouter, Route, RouterLink } from '@angular/router';
@Component({
  selector: 'wbp-admin-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class AdminNavBarComponent {
  constructor() {}
}
