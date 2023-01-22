import { Component, inject } from '@angular/core';

import { CarsService } from './service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent {
  private readonly carsService = inject(CarsService);

  constructor() {
    this.carsService;
  }

  drive(): void {
    this.carsService.drive();
  }
}
