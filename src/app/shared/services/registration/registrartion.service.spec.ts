import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';

describe('RegistrartionService', () => {
  let service: RegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
