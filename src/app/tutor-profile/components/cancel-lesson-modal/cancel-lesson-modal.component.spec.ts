import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelLessonModalComponent } from './cancel-lesson-modal.component';

describe('CancelLessonModalComponent', () => {
  let component: CancelLessonModalComponent;
  let fixture: ComponentFixture<CancelLessonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelLessonModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelLessonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
