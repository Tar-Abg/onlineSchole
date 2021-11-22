import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSchemComponent } from './modal-schem.component';

describe('ModalSchemComponent', () => {
  let component: ModalSchemComponent;
  let fixture: ComponentFixture<ModalSchemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSchemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSchemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
