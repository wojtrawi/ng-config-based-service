import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarsShellComponent } from './cars-shell/cars-shell.component';

const routes: Routes = [{ path: '', component: CarsShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsRoutingModule {}
