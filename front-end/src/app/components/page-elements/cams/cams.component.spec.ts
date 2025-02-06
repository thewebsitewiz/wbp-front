import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamsComponent } from './cams.component';

describe('CamsComponent', () => {
  let component: CamsComponent;
  let fixture: ComponentFixture<CamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
