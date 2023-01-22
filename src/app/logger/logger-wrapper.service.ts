import { Injectable, inject, EnvironmentInjector, Type } from '@angular/core';
import { tap } from 'rxjs';

import { ConcreteLoggerClassLoaderService } from './concrete-logger-class-loader.service';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerWrapperService implements LoggerService {
  private logger: LoggerService | null = null;

  private readonly concreteLoggerClassLoaderService = inject(
    ConcreteLoggerClassLoaderService
  );
  private readonly environmentInjector = inject(EnvironmentInjector);

  constructor() {
    this.loadConcreteLoggerClass();
  }

  log(message: string): void {
    if (this.logger === null) {
      return;
    }

    console.log(`[LoggerWrapperService]: proxying ${message}`);
    this.logger.log(message);
  }

  private loadConcreteLoggerClass(): void {
    this.concreteLoggerClassLoaderService
      .load()
      .pipe(
        tap((concreteLoggerClass) => {
          this.createLogger(concreteLoggerClass);
        })
      )
      .subscribe(() =>
        console.log(`[LoggerWrapperService]: logger instantiated`)
      );
  }

  private createLogger(concreteLoggerClass: Type<LoggerService>): void {
    this.environmentInjector.runInContext(() => {
      this.logger = new concreteLoggerClass();
    });
  }
}
