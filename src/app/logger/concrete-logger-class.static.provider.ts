import { Type, StaticProvider } from '@angular/core';

import { Config } from '../config';
import { LoggerService, CONCRETE_LOGGER_CLASS } from './logger.service';

export function fetchConcreteLoggerClass({
  mode,
}: Config): Promise<Type<LoggerService>> {
  return mode === 'prod'
    ? import('../logger/remote-logger.service').then(
        ({ RemoteLoggerService }) => RemoteLoggerService
      )
    : import('../logger/local-logger.service').then(
        ({ LocalLoggerService }) => LocalLoggerService
      );
}

export function provideConcreteLoggerClass(
  concreteLoggerClass: Type<LoggerService>
): StaticProvider {
  return {
    provide: CONCRETE_LOGGER_CLASS,
    useValue: concreteLoggerClass,
  };
}
