import { Component, inject } from '@angular/core';

import { CARS_SERVICE, CarsService } from '../cars.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent {
  // private readonly carsService = inject(CARS_SERVICE);
  private readonly carsService = inject(CarsService);

  constructor() {
    console.log(`[CarDetailComponent]: carsService ${this.carsService}`);

    // setTimeout(() => {
    //   console.log(`[CarDetailComponent]: carsService 2s ${this.carsService}`);
    // }, 2000);
  }
}
