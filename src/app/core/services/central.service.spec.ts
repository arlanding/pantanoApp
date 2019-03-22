import { TestBed } from '@angular/core/testing';

import { CentralService } from './central.service';

describe('CentralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CentralService = TestBed.get(CentralService);
    expect(service).toBeTruthy();
  });
});
