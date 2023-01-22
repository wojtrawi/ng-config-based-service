import { inject, Injectable } from '@angular/core';

import { UserService } from '../user.service';
import { LoggerService } from './logger.service';

@Injectable()
// @Injectable({ providedIn: 'root' })
export class LocalLoggerService implements LoggerService {
  constructor(private readonly userService: UserService) {
    console.log('[LocalLoggerService]: created');
  }

  log(message: string): void {
    console.log(
      `[LocalLoggerService][${this.userService.getNick()}]: ${message}`
    );
  }
}
