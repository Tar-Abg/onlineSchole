import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFifthStepComponent } from './student-fifth-step.component';

describe('StudentFifthStepComponent', () => {
  let component: StudentFifthStepComponent;
  let fixture: ComponentFixture<StudentFifthStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFifthStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFifthStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
