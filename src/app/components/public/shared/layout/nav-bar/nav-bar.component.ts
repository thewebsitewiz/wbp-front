import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'wbp-nav-bar',
    imports: [],
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 50) {
      navbar.classList.add(
        'navbar-scrolled',
        'border-bottom',
        'border-secondary',
        'navbar-sticky'
      );
    } else {
      navbar.classList.remove(
        'navbar-scrolled',
        'border-bottom',
        'border-secondary',
        'navbar-sticky'
      );
    }
    console.log('User scrolled');
  }
}
