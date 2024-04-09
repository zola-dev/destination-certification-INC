import { TestBed } from '@angular/core/testing';

import { DeleteToDoService } from './delete-to-do.service';

describe('DeleteToDoService', () => {
  let service: DeleteToDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteToDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
