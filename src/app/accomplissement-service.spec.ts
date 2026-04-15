import { TestBed } from '@angular/core/testing';

import { AccomplissementService } from './accomplissement-service';

describe('AccomplissementService', () => {
  let service: AccomplissementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccomplissementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
