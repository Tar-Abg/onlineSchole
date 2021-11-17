import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPersonalInformationComponent } from './student-personal-information.component';

describe('StudentPersonalInformationComponent', () => {
  let component: StudentPersonalInformationComponent;
  let fixture: ComponentFixture<StudentPersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPersonalInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
