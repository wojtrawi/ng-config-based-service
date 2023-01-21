import { Component, inject } from '@angular/core';
import { CONFIG } from './config';

import { LoggerService } from './logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly config = inject(CONFIG, { optional: true });
  private readonly loggerService = inject(LoggerService);

  logMessage(): void {
    this.loggerService.log('Hello from AppComponent');
  }
}
