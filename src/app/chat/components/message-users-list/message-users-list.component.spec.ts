import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageUsersListComponent } from './message-users-list.component';

describe('MessageUsersListComponent', () => {
  let component: MessageUsersListComponent;
  let fixture: ComponentFixture<MessageUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageUsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
