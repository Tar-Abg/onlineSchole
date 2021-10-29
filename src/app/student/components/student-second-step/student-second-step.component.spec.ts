import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSecondStepComponent } from './student-second-step.component';

describe('StudentSecondStepComponent', () => {
  let component: StudentSecondStepComponent;
  let fixture: ComponentFixture<StudentSecondStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSecondStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
