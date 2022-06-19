import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndLessonForStudentComponent } from './end-lesson-for-student.component';

describe('EndLessonForTutorComponent', () => {
  let component: EndLessonForStudentComponent;
  let fixture: ComponentFixture<EndLessonForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndLessonForStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndLessonForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
