import { Injectable, inject, EnvironmentInjector, Type } from '@angular/core';
import { tap } from 'rxjs';

import { CarsService } from './cars.service';
import { ConcreteCarsClassLoaderService } from './concrete-cars-class-loader.service';

// @Injectable({ providedIn: 'root' })
@Injectable()
export class CarsWrapperService implements CarsService {
  private carsService: CarsService | null = null;

  private readonly concreteCarsClassLoaderService = inject(
    ConcreteCarsClassLoaderService
  );
  private readonly environmentInjector = inject(EnvironmentInjector);

  drive(): void {
    if (this.carsService === null) {
      return;
    }

    this.carsService.drive();
  }

  loadConcreteCarsClass(): void {
    if (this.carsService !== null) {
      return;
    }

    this.concreteCarsClassLoaderService
      .load()
      .pipe(
        tap((concreteCarsClass) => {
          this.createCarsService(concreteCarsClass);
        })
      )
      .subscribe(() =>
        console.log(`[CarsWrapperService]: carsService instantiated`)
      );
  }

  private createCarsService(concreteCarsClass: Type<CarsService>): void {
    this.environmentInjector.runInContext(() => {
      this.carsService = new concreteCarsClass();
    });
  }
}
