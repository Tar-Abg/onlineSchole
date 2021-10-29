import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFourthStepComponent } from './student-fourth-step.component';

describe('StudentFourthStepComponent', () => {
  let component: StudentFourthStepComponent;
  let fixture: ComponentFixture<StudentFourthStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFourthStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFourthStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
