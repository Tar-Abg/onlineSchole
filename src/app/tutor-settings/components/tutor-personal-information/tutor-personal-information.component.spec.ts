import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPersonalInformationComponent } from './tutor-personal-information.component';

describe('TutorPersonalInformationComponent', () => {
  let component: TutorPersonalInformationComponent;
  let fixture: ComponentFixture<TutorPersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorPersonalInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
