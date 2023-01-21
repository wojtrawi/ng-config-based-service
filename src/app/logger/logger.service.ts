import { HttpClient } from '@angular/common/http';
import {
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Type,
} from '@angular/core';
import { Observable, switchMap, tap, map, catchError, of, first } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CONFIG, ConfigService } from '../config';
import { ENVIRONMENT } from '../environment.token';
import { ConcreteLoggerService } from './concrete-logger.service';

import { LocalLoggerService } from './local-logger.service';
import { RemoteLoggerService } from './remote-logger.service';

export const LOGGER_CONCRETE_CLASS = new InjectionToken<Type<LoggerService>>(
  'LOGGER_CONCRETE_CLASS'
);

@Injectable({
  providedIn: 'root',
})
export class LoggerHelperService {
  loggerClass: Type<LoggerService> | null = null;
}

@Injectable()
export class LoggerWrapperService {
  private concreteLogger: LoggerService | null = null;
  private readonly configService = inject(ConfigService);
  private readonly environmentInjector = inject(EnvironmentInjector);

  constructor() {
    this.initialize().subscribe(() =>
      console.log(`[LoggerWrapperService]: concreteLogger initialized`)
    );
  }

  log(message: string): void {
    if (this.concreteLogger === null) {
      return;
    }

    console.log(`[LoggerWrapperService]: proxying ${message}`);
    this.concreteLogger.log(message);
  }

  private initialize(): Observable<boolean> {
    return this.configService.state$.pipe(
      first((config) => config.isLoaded),
      map(({ data }) => data!),
      switchMap(({ mode }) => this.loadLoggerConcreteClass(mode)),
      tap((loggerConcreteClass) => {
        this.createConcreteLogger(loggerConcreteClass);
      }),
      map(() => true),
      catchError((err) => {
        console.log(err);

        return of(false);
      })
    );
  }

  private loadLoggerConcreteClass(
    mode: 'dev' | 'prod'
  ): Promise<Type<LoggerService>> {
    switch (mode) {
      case 'dev':
        return import('./local-logger.service').then(
          ({ LocalLoggerService }) => LocalLoggerService
        );
      case 'prod':
        return import('./remote-logger.service').then(
          ({ RemoteLoggerService }) => RemoteLoggerService
        );
    }
  }

  private createConcreteLogger(concreteLoggerClass: Type<LoggerService>): void {
    this.environmentInjector.runInContext(() => {
      this.concreteLogger = inject(concreteLoggerClass);
    });
    // this.concreteLogger = new concreteLoggerClass();
  }
}

@Injectable({
  providedIn: 'root',
  // ---------------------------------
  // compile-time config
  // ---------------------------------
  // useClass: environment.production ? RemoteLoggerService : LocalLoggerService,
  // useClass: inject(ENVIRONMENT).production
  //   ? RemoteLoggerService
  //   : LocalLoggerService,
  // useClass:
  //   environment.mode === 'prod' ? RemoteLoggerService : LocalLoggerService,
  // useClass:
  //   inject(ENVIRONMENT).mode === 'prod'
  //     ? RemoteLoggerService
  //     : LocalLoggerService,
  // useFactory: () => {
  //   const http = inject(HttpClient);

  //   return environment.mode === 'prod'
  //     ? new RemoteLoggerService(http)
  //     : new LocalLoggerService(http);
  // },
  // useFactory: () =>
  //   environment.mode === 'prod'
  //     ? inject(RemoteLoggerService)
  //     : inject(LocalLoggerService),
  // useClass: ConcreteLoggerService,
  // ---------------------------------
  // sync runtime config
  // ---------------------------------
  // useClass:
  //   inject(CONFIG).mode === 'prod' ? RemoteLoggerService : LocalLoggerService,
  // useClass: inject(LOGGER_CONCRETE_CLASS),
  // ---------------------------------
  // async runtime config
  // ---------------------------------
  // useClass: inject(LoggerHelperService).loggerClass!,
  // ---------------------------------
  // async runtime config with wrapper service
  // ---------------------------------
  useClass: LoggerWrapperService,
})
export abstract class LoggerService {
  abstract log(message: string): void;
}
