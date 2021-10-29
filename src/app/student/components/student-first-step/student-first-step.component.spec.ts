import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFirstStepComponent } from './student-first-step.component';

describe('StudentFirstStepComponent', () => {
  let component: StudentFirstStepComponent;
  let fixture: ComponentFixture<StudentFirstStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFirstStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
