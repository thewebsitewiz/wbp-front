import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavBarComponent } from '../../../page-elements/admin/layout/nav-bar/nav-bar.component';
import { AdminFooterComponent } from '../../../page-elements/admin/layout/footer/footer.component';
@Component({
  selector: 'wbp-dashboard',
  imports: [AdminNavBarComponent, AdminFooterComponent, RouterOutlet],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class AdminDashboardComponent {}
