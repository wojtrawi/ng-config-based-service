import { APP_INITIALIZER, inject, Provider } from '@angular/core';

import { ConfigService } from './config.service';

export function provideConfigInitializer(): Provider {
  return {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: () => {
      const configService = inject(ConfigService);

      return () => configService.load();
    },
  };
}
