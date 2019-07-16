import { TestBed, async, inject } from '@angular/core/testing';

import { TargetPageGuardGuard } from './target-page-guard.guard';

describe('TargetPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TargetPageGuardGuard]
    });
  });

  it('should ...', inject([TargetPageGuardGuard], (guard: TargetPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
