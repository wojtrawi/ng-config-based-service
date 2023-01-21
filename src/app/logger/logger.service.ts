import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ENVIRONMENT } from '../environment.token';
import { ConcreteLoggerService } from './concrete-logger.service';

import { LocalLoggerService } from './local-logger.service';
import { RemoteLoggerService } from './remote-logger.service';

@Injectable({
  providedIn: 'root',
  useClass: environment.production ? RemoteLoggerService : LocalLoggerService,
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
})
export abstract class LoggerService {
  abstract log(message: string): void;
}
