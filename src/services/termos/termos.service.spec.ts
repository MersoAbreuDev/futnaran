import { TestBed } from '@angular/core/testing';

import { TermosService } from './termos.service';

describe('TermosService', () => {
  let service: TermosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
