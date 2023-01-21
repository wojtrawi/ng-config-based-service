import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken, Type } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CONFIG } from '../config';
import { ENVIRONMENT } from '../environment.token';
import { ConcreteLoggerService } from './concrete-logger.service';

import { LocalLoggerService } from './local-logger.service';
import { RemoteLoggerService } from './remote-logger.service';

export const LOGGER_CONCRETE_CLASS = new InjectionToken<Type<LoggerService>>(
  'LOGGER_CONCRETE_CLASS'
);

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
  useClass: inject(LOGGER_CONCRETE_CLASS),
})
export abstract class LoggerService {
  abstract log(message: string): void;
}
