import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCertificatesComponent } from './tutor-certificates.component';

describe('TutorCertificatesComponent', () => {
  let component: TutorCertificatesComponent;
  let fixture: ComponentFixture<TutorCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorCertificatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
