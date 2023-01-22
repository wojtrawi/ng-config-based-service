import { inject, Injectable, InjectionToken, Type } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CONFIG } from '../config';
import { ENVIRONMENT } from '../environment.token';
import { ConcreteLoggerService } from './concrete-logger.service';

import { LocalLoggerService } from './local-logger.service';
import { LoggerWrapperService } from './logger-wrapper.service';
import { RemoteLoggerService } from './remote-logger.service';

export const CONCRETE_LOGGER_CLASS = new InjectionToken<Type<LoggerService>>(
  'CONCRETE_LOGGER_CLASS'
);

@Injectable({ providedIn: 'root' })
export class LoggerHelperService {
  concreteLoggerClass: Type<LoggerService> | null = null;
}

@Injectable({
  providedIn: 'root',
  // ---------------------------------
  // environment file
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
  // useFactory: () =>
  //   environment.mode === 'prod'
  //     ? new RemoteLoggerService()
  //     : new LocalLoggerService(),
  // useClass: ConcreteLoggerService,
  // ---------------------------------
  // static provider
  // ---------------------------------
  // useClass:
  //   inject(CONFIG).mode === 'prod' ? RemoteLoggerService : LocalLoggerService,
  // useClass: inject(CONCRETE_LOGGER_CLASS),
  // ---------------------------------
  // APP_INITIALIZER
  // ---------------------------------
  // useClass: inject(LoggerHelperService).concreteLoggerClass!,
  // ---------------------------------
  // wrapper service
  // ---------------------------------
  useClass: LoggerWrapperService,
})
export abstract class LoggerService {
  abstract log(message: string): void;
}
