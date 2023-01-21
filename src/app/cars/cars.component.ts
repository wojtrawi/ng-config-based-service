import {
  Component,
  EnvironmentInjector,
  inject,
  Injector,
  Type,
} from '@angular/core';
import { Observable, first, map, switchMap, tap, catchError, of } from 'rxjs';

import { ConfigService } from '../config';
import { CarsService, CARS_SERVICE } from './cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  providers: [
    // {
    //   provide: CARS_SERVICE,
    //   useFactory: () => {
    //     const carsCmp = inject(CarsComponent);
    //     return () => carsCmp.carsService;
    //   },
    // },
    // {
    //   provide: CarsService,
    //   useFactory: () => inject(CarsComponent).carsService,
    // },
  ],
})
export class CarsComponent {
  // carsService: CarsService | null = null;
  // private readonly configService = inject(ConfigService);
  // private readonly environmentInjector = inject(EnvironmentInjector);
  // private readonly injector = inject(Injector);
  private readonly carsService = inject(CarsService);

  // constructor() {
  //   this.initialize().subscribe(() =>
  //     console.log(`[CarsComponent]: carsService initialized`)
  //   );
  // }

  drive(): void {
    this.carsService.drive();
  }

  // private initialize(): Observable<boolean> {
  //   return this.configService.state$.pipe(
  //     first((config) => config.isLoaded),
  //     map(({ data }) => data!),
  //     switchMap(({ mode }) => this.loadCarsServiceClass(mode)),
  //     tap((loggerConcreteClass) => {
  //       this.createCarsService(loggerConcreteClass);
  //     }),
  //     map(() => true),
  //     catchError((err) => {
  //       console.log(err);

  //       return of(false);
  //     })
  //   );
  // }

  // private loadCarsServiceClass(
  //   mode: 'dev' | 'prod'
  // ): Promise<Type<CarsService>> {
  //   switch (mode) {
  //     case 'dev':
  //       return import('./cars-beta.service').then(
  //         ({ CarsBetaService }) => CarsBetaService
  //       );
  //     case 'prod':
  //       return import('./cars-alfa.service').then(
  //         ({ CarsAlfaService }) => CarsAlfaService
  //       );
  //   }
  // }

  // private createCarsService(carsServiceClass: Type<CarsService>): void {
  //   // this.environmentInjector.runInContext(() => {
  //   //   this.carsService = inject(carsServiceClass);
  //   // });

  //   // const injector = Injector.create({
  //   //   parent: this.injector,
  //   //   providers: [{ provide: CarsService as any, useClass: carsServiceClass }],
  //   // });

  //   // this.carsService = injector.get(CarsService);

  //   const injector = Injector.create({
  //     parent: this.injector,
  //     providers: [{ provide: carsServiceClass }],
  //   });

  //   this.carsService = injector.get(carsServiceClass);
  // }
}
