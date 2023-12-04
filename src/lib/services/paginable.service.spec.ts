import { TestBed } from '@angular/core/testing';

import { PaginableService } from './paginable.service';

describe('PaginableService', () => {
  let service: PaginableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
