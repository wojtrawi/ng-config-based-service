import { Provider } from '@angular/core';
import { CarsWrapperService } from './cars-wrapper.service';

import { CarsService } from './cars.service';

export function provideCars(): Provider[] {
  return [
    CarsWrapperService,
    { provide: CarsService, useExisting: CarsWrapperService },
  ];
}
