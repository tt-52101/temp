import { TestBed } from '@angular/core/testing';

import { DocumentsServiceService } from './documents-service.service';

describe('DocumentsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentsServiceService = TestBed.get(DocumentsServiceService);
    expect(service).toBeTruthy();
  });
});
