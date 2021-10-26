import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorThirdStepComponent } from './tutor-third-step.component';

describe('TutorThirdStepComponent', () => {
  let component: TutorThirdStepComponent;
  let fixture: ComponentFixture<TutorThirdStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorThirdStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
