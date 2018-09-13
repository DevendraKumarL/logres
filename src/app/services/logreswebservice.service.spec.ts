import { TestBed, inject } from '@angular/core/testing';

import { LogresWebService } from './logresweb.service';

describe('LogresWebService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogresWebService]
    });
  });

  it('should be created', inject([LogresWebService], (service: LogresWebService) => {
    expect(service).toBeTruthy();
  }));
});
