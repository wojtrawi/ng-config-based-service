import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { LoggerHelperService } from '../logger';

import { ConfigService } from './config.service';
import { fetchLoggerClass } from './config.static-provider';

export function provideConfigInitializer(): Provider {
  return {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: () => {
      const configService = inject(ConfigService);
      // const loggerHelperService = inject(LoggerHelperService);

      // return () =>
      //   configService.load().pipe(
      //     switchMap((config) => fetchLoggerClass(config)),
      //     tap((loggerClass) => (loggerHelperService.loggerClass = loggerClass))
      //   );

      return () => configService.load();
    },
  };
}
