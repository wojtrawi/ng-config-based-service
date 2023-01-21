import { Injectable, InjectionToken } from '@angular/core';

@Injectable()
export abstract class CarsService {
  abstract drive(): void;
}

export const CARS_SERVICE = new InjectionToken<() => CarsService>(
  'CARS_SERVICE'
);
