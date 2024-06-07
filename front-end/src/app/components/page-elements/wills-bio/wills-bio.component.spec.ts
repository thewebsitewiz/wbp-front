import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillsBioComponent } from './wills-bio.component';

describe('WillsBioComponent', () => {
  let component: WillsBioComponent;
  let fixture: ComponentFixture<WillsBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillsBioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WillsBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
