import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentThirdStepComponent } from './student-third-step.component';

describe('StudentThirdStepComponent', () => {
  let component: StudentThirdStepComponent;
  let fixture: ComponentFixture<StudentThirdStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentThirdStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
