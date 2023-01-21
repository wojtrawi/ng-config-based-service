import { StaticProvider, Type } from '@angular/core';
import { LoggerService, LOGGER_CONCRETE_CLASS } from '../logger';

import { Config } from './config';
import { CONFIG } from './config.token';

export function fetchConfig(): Promise<Config> {
  return fetch('assets/config.json').then((res) => res.json());
}

export function provideConfig(config: Config): StaticProvider {
  return {
    provide: CONFIG,
    useValue: config,
  };
}

export function fetchLoggerClass({
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

export function provideLogger(
  loggerClass: Type<LoggerService>
): StaticProvider {
  return {
    provide: LOGGER_CONCRETE_CLASS,
    useValue: loggerClass,
  };
}
