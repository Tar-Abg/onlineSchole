import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSecondStepComponent } from './tutor-second-step.component';

describe('TutorSecondStepComponent', () => {
  let component: TutorSecondStepComponent;
  let fixture: ComponentFixture<TutorSecondStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorSecondStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
