import { TestBed } from '@angular/core/testing';

import { SocketcommService } from './socketcomm.service';

describe('SocketcommService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketcommService = TestBed.get(SocketcommService);
    expect(service).toBeTruthy();
  });
});
