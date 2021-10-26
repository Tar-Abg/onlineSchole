import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrHeaderComponent } from './register-header.component';

describe('RegistrHeaderComponent', () => {
  let component: RegistrHeaderComponent;
  let fixture: ComponentFixture<RegistrHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
