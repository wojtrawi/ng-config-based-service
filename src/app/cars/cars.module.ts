import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { CAR_SECRET } from './car.token';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarsInitializerDirective } from './cars-initializer.directive';
import { CarsShellComponent } from './cars-shell/cars-shell.component';

@NgModule({
  declarations: [CarsComponent, CarDetailComponent, CarsInitializerDirective, CarsShellComponent],
  imports: [CommonModule, CarsRoutingModule],
  providers: [{ provide: CAR_SECRET, useValue: 'xyz' }],
})
export class CarsModule {}
