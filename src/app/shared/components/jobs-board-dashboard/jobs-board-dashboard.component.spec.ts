import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsBoardDashboardComponent } from './jobs-board-dashboard.component';

describe('JobsBoardDashboardComponent', () => {
  let component: JobsBoardDashboardComponent;
  let fixture: ComponentFixture<JobsBoardDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsBoardDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsBoardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
