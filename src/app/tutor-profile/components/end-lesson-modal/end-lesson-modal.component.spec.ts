import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndLessonModalComponent } from './end-lesson-modal.component';

describe('EndLessonModalComponent', () => {
  let component: EndLessonModalComponent;
  let fixture: ComponentFixture<EndLessonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndLessonModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndLessonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
