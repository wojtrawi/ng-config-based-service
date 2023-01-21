import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { CAR_SECRET } from './car.token';
import { CarsService } from './cars.service';

@Injectable({
  providedIn: 'root',
})
export class CarsAlfaService implements CarsService {
  private readonly secret = inject(CAR_SECRET, { optional: true });

  constructor(private readonly http: HttpClient) {
    console.log(`CarsAlfaService constructor with secret: ${this.secret}`);
  }
  drive(): void {
    console.log('CarsAlfaService drive');
    console.log(this.http);
  }
}
