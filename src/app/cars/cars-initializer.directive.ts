import {
  Directive,
  Injector,
  StaticProvider,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { catchError, first, map, Observable, of, switchMap, tap } from 'rxjs';

import { ConfigService } from '../config';
import { CarsService } from './cars.service';

@Directive({
  selector: '[appCarsInitializer]',
})
export class CarsInitializerDirective {
  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly tpl: TemplateRef<unknown>,
    private readonly parentInjector: Injector,
    private readonly configService: ConfigService
  ) {
    this.initialize().subscribe();
  }

  private initialize(): Observable<boolean> {
    return this.configService.state$.pipe(
      first((config) => config.isLoaded),
      map(({ data }) => data!),
      switchMap(({ mode }) => this.loadCarsServiceClass(mode)),
      tap((loggerConcreteClass) => {
        this.createCarsService(loggerConcreteClass);
      }),
      map(() => true),
      catchError((err) => {
        console.log(err);

        return of(false);
      })
    );
  }

  private loadCarsServiceClass(
    mode: 'dev' | 'prod'
  ): Promise<Type<CarsService>> {
    switch (mode) {
      case 'dev':
        return import('./cars-beta.service').then(
          ({ CarsBetaService }) => CarsBetaService
        );
      case 'prod':
        return import('./cars-alfa.service').then(
          ({ CarsAlfaService }) => CarsAlfaService
        );
    }
  }

  private createCarsService(carsServiceClass: Type<CarsService>): void {
    const injector = Injector.create({
      parent: this.parentInjector,
      providers: [
        { provide: carsServiceClass },
        { provide: CarsService, useExisting: carsServiceClass },
      ],
    });

    this.vcr.createEmbeddedView(this.tpl, null, { injector });
  }
}
