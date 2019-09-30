import { TestBed } from '@angular/core/testing';

import { MockedUsersService } from './mocked-users.service';

describe('MockedUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockedUsersService = TestBed.get(MockedUsersService);
    expect(service).toBeTruthy();
  });
});
