import { inject, Injectable } from '@angular/core';

import { UserService } from '../../user.service';
import { CAR_SECRET } from '../car.token';
import { CarsService } from './cars.service';

@Injectable({
  providedIn: 'root',
})
export class CarsAlfaService implements CarsService {
  private readonly userService = inject(UserService);
  private readonly secret = inject(CAR_SECRET, { optional: true });

  constructor() {
    console.log(`CarsAlfaService constructor with secret: ${this.secret}`);
  }

  drive(): void {
    console.log(`CarsAlfaService [${this.userService.getNick()}] drive`);
  }
}
