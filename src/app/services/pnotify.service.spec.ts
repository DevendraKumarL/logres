import { TestBed, inject } from '@angular/core/testing';

import { PNotifyService } from './pnotify.service';

describe('PNotifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PNotifyService]
    });
  });

  it('should be created', inject([PNotifyService], (service: PNotifyService) => {
    expect(service).toBeTruthy();
  }));
});
