import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorFirstStepComponent } from './tutor-first-step.component';

describe('TutorFirstStepComponent', () => {
  let component: TutorFirstStepComponent;
  let fixture: ComponentFixture<TutorFirstStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorFirstStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
