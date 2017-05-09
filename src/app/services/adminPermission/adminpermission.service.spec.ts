/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminpermissionService } from './adminpermission.service';

describe('AdminpermissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminpermissionService]
    });
  });

  it('should ...', inject([AdminpermissionService], (service: AdminpermissionService) => {
    expect(service).toBeTruthy();
  }));
});
