import { TestBed } from '@angular/core/testing';

import { PaginableTranslationService } from './paginable-translation.service';

describe('PaginableTranslationService', () => {
  let service: PaginableTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginableTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
