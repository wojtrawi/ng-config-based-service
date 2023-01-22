import { inject, Injectable } from '@angular/core';

import { UserService } from '../user.service';
import { LoggerService } from './logger.service';

// @Injectable()
@Injectable({ providedIn: 'root' })
export class RemoteLoggerService implements LoggerService {
  private readonly userService = inject(UserService);

  constructor() {
    console.log('[RemoteLoggerService]: created');
  }

  log(message: string): void {
    // Call to monitoring service e.g. Sentry
    console.log(
      `[RemoteLoggerService][${this.userService.getNick()}]: ${message}`
    );
  }
}
