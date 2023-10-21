import { TestBed } from '@angular/core/testing';

import { ProdctsService } from './prodcts.service';

describe('ProdctsService', () => {
  let service: ProdctsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdctsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
