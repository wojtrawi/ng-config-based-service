import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { fetchConfig, provideConfig } from './app/config';
import {
  fetchConcreteLoggerClass,
  provideConcreteLoggerClass,
} from './app/logger';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// (async function () {
//   const config = await fetchConfig();
//   const concreteLoggerClass = await fetchConcreteLoggerClass(config);

//   platformBrowserDynamic([
//     provideConfig(config),
//     provideConcreteLoggerClass(concreteLoggerClass),
//   ])
//     .bootstrapModule(AppModule)
//     .catch((err) => console.error(err));
// })();
