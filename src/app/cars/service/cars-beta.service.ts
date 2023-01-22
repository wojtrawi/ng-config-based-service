import { inject, Injectable } from '@angular/core';

import { UserService } from '../../user.service';
import { CAR_SECRET } from '../car.token';
import { CarsService } from './cars.service';

@Injectable({
  providedIn: 'root',
})
export class CarsBetaService implements CarsService {
  private readonly userService = inject(UserService);
  private readonly secret = inject(CAR_SECRET, { optional: true });

  constructor() {
    console.log(`CarsBetaService constructor with secret: ${this.secret}`);
  }

  drive(): void {
    console.log(`CarsBetaService [${this.userService.getNick()}] drive`);
  }
}
