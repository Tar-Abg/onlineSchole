import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSignUpComponent } from './student-sign-up.component';

describe('SignUpComponent', () => {
  let component: StudentSignUpComponent;
  let fixture: ComponentFixture<StudentSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
