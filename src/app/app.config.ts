import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, } from 'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';

const ngx: NgxUiLoaderConfig = {
  text: "載入中...",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  bgsColor: "#dc9c9c",
  fgsColor: "#dc9c9c",
  fgsType: "square-loader",
  fgsSize: 100,
  hasProgressBar: false
}
export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(NgxUiLoaderModule.forRoot(ngx)), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),importProvidersFrom(HttpClientModule), provideAnimationsAsync()]
};
