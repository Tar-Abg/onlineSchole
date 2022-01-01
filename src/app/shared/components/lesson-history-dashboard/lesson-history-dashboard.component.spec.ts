import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonHistoryDashboardComponent } from './lesson-history-dashboard.component';

describe('LessonHistoryDashboardComponent', () => {
  let component: LessonHistoryDashboardComponent;
  let fixture: ComponentFixture<LessonHistoryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonHistoryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonHistoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
