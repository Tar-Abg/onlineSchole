import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTutorComponent } from './search-tutor.component';

describe('SearchTutorComponent', () => {
  let component: SearchTutorComponent;
  let fixture: ComponentFixture<SearchTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
