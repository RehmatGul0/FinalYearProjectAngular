import { TestBed } from '@angular/core/testing';

import { ModelInfoService } from './model-info.service';

describe('ModelInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelInfoService = TestBed.get(ModelInfoService);
    expect(service).toBeTruthy();
  });
});
