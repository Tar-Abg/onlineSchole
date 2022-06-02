import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndLessonForTutorComponent } from './end-lesson-for-tutor.component';

describe('EndLessonForTutorComponent', () => {
  let component: EndLessonForTutorComponent;
  let fixture: ComponentFixture<EndLessonForTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndLessonForTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndLessonForTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
