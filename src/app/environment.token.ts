import { InjectionToken } from '@angular/core';

import { environment } from 'src/environments/environment';

export interface EnvironmentData {
  production: boolean;
  mode: 'dev' | 'prod';
}

export const ENVIRONMENT = new InjectionToken<EnvironmentData>('ENVIRONMENT', {
  providedIn: 'root',
  factory: () => environment as EnvironmentData,
});
