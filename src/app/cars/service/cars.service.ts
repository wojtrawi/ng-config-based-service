import { Injectable } from '@angular/core';

import { CarsWrapperService } from './cars-wrapper.service';

// @Injectable({
//   providedIn: 'root',
//   useExisting: CarsWrapperService,
// })
export abstract class CarsService {
  abstract drive(): void;
}
