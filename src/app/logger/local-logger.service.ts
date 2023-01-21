import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';

// @Injectable()
@Injectable({ providedIn: 'root' })
export class LocalLoggerService implements LoggerService {
  constructor(private readonly http: HttpClient) {
    console.log('[LocalLoggerService]: created');
  }

  log(message: string): void {
    console.log(`[LocalLoggerService]: ${message}`);
  }
}
