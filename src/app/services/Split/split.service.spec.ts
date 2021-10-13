import { TestBed } from '@angular/core/testing';

import { SplitService } from '../sidenav/split.service';

describe('SplitService', () => {
  let service: SplitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
