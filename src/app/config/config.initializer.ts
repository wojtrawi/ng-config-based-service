import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { switchMap, tap } from 'rxjs';

import { fetchConcreteLoggerClass, LoggerHelperService } from '../logger';
import { ConfigService } from './config.service';

export function provideConfigInitializer(): Provider {
  return {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: () => {
      const configService = inject(ConfigService);
      const loggerHelperService = inject(LoggerHelperService);

      // return () =>
      //   configService.load().pipe(
      //     switchMap((config) => fetchConcreteLoggerClass(config)),
      //     tap(
      //       (concreteLoggerClass) =>
      //         (loggerHelperService.concreteLoggerClass = concreteLoggerClass)
      //     )
      //   );

      return () => configService.load();
    },
  };
}
