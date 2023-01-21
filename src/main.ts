import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {
  fetchConfig,
  fetchLoggerClass,
  provideConfig,
  provideLogger,
} from './app/config';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// (async function () {
//   const config = await fetchConfig();
//   const loggerClass = await fetchLoggerClass(config);

//   platformBrowserDynamic([provideConfig(config), provideLogger(loggerClass)])
//     .bootstrapModule(AppModule)
//     .catch((err) => console.error(err));
// })();
