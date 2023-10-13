import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {appInitializerFactory} from "./translation/appInitializerFactory";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {ConfirmationService, MessageService} from "primeng/api";
import {httpLoaderFactory} from "./translation/HttpLoaderFactory";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpRequestInterceptorModule} from "./shared/interceptors/http-request.interceptor.module";
import {PagesModule} from "./layout/pages/pages.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    HttpRequestInterceptorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [ TranslateService, Injector ],
      multi: true
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
