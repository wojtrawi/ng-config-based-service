import { inject, Injectable, Type } from '@angular/core';
import { catchError, EMPTY, Observable, switchMap } from 'rxjs';

import { ConfigService } from '../config';
import { fetchConcreteLoggerClass } from './concrete-logger-class.static.provider';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class ConcreteLoggerClassLoaderService {
  private readonly configService = inject(ConfigService);

  public load(): Observable<Type<LoggerService>> {
    return this.configService.loadedData$.pipe(
      switchMap((config) => fetchConcreteLoggerClass(config)),
      catchError((err) => {
        console.log(err);

        return EMPTY;
      })
    );
  }
}
