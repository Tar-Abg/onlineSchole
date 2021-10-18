import { TestBed } from '@angular/core/testing';

import { RegistrartionService } from './registrartion.service';

describe('RegistrartionService', () => {
  let service: RegistrartionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrartionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
