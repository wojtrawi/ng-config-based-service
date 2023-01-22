import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { CAR_SECRET } from './car.token';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarsShellComponent } from './cars-shell/cars-shell.component';
import { provideCars } from './service';

@NgModule({
  declarations: [CarsComponent, CarDetailComponent, CarsShellComponent],
  imports: [CommonModule, CarsRoutingModule],
  providers: [{ provide: CAR_SECRET, useValue: 'xyz' }, provideCars()],
})
export class CarsModule {}
