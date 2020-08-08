import { TestBed } from '@angular/core/testing';

import { StocksFileReaderService } from './stocks-file-reader.service';

describe('StocksFileReaderService', () => {
  let service: StocksFileReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocksFileReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
