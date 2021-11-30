import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonModalComponent } from './add-lesson-modal.component';

describe('AddLessonModalComponent', () => {
  let component: AddLessonModalComponent;
  let fixture: ComponentFixture<AddLessonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
