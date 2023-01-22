import { Component, inject } from '@angular/core';

import { CarsWrapperService } from '../service';

@Component({
  selector: 'app-cars-shell',
  templateUrl: './cars-shell.component.html',
  styleUrls: ['./cars-shell.component.scss'],
})
export class CarsShellComponent {
  private readonly carsWrapperService = inject(CarsWrapperService);

  constructor() {
    this.carsWrapperService.loadConcreteCarsClass();
  }
}
