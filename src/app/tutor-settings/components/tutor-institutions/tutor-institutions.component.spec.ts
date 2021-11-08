import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorInstitutionsComponent } from './tutor-institutions.component';

describe('TutorInstitutionsComponent', () => {
  let component: TutorInstitutionsComponent;
  let fixture: ComponentFixture<TutorInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorInstitutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
