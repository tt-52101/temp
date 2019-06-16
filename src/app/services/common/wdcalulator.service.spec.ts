import { TestBed } from '@angular/core/testing';

import { WDCalulatorService } from './wdcalulator.service';

describe('WDCalulatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WDCalulatorService = TestBed.get(WDCalulatorService);
    expect(service).toBeTruthy();
  });
});
