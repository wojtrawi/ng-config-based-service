import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';

// @Injectable()
@Injectable({ providedIn: 'root' })
export class RemoteLoggerService implements LoggerService {
  constructor(private readonly http: HttpClient) {
    console.log('[RemoteLoggerService]: created');
  }

  log(message: string): void {
    // Call to monitoring service e.g. Sentry
    console.log(`[RemoteLoggerService]: ${message}`);
  }
}
