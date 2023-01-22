import { inject, Injectable, Type } from '@angular/core';
import { catchError, EMPTY, Observable, switchMap } from 'rxjs';

import { ConfigService } from '../../config';
import { CarsService } from './cars.service';

@Injectable({ providedIn: 'root' })
export class ConcreteCarsClassLoaderService {
  private readonly configService = inject(ConfigService);

  public load(): Observable<Type<CarsService>> {
    return this.configService.loadedData$.pipe(
      switchMap(({ mode }) => this.loadConcreteCarsClass(mode)),
      catchError((err) => {
        console.log(err);

        return EMPTY;
      })
    );
  }

  private loadConcreteCarsClass(
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
}
