import { TestBed } from '@angular/core/testing';

import { SearchTutorService } from './search-tutor.service';

describe('SearchTutorService', () => {
  let service: SearchTutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
