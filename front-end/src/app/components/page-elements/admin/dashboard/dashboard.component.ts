import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';

@Component({
  selector: 'wbp-admin-dashboard',
  standalone: true,
  imports: [RouterModule, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class AdminDashboardComponent {}
