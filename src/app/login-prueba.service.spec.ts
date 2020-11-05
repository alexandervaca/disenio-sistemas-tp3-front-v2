import { TestBed } from '@angular/core/testing';

import { LoginPruebaService } from './login-prueba.service';

describe('LoginPruebaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginPruebaService = TestBed.get(LoginPruebaService);
    expect(service).toBeTruthy();
  });
});
