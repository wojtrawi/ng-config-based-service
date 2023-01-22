import { Component, inject } from '@angular/core';

import { CarsService } from '../service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent {
  private readonly carsService = inject(CarsService);

  constructor() {
    console.log(`[CarDetailComponent]: carsService ${this.carsService}`);
  }
}
