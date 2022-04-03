import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component';
import { CurrenciesDetailsComponent } from './currencies-details/currencies-details.component';
import { CurrenciesService } from './@core/services/currencies.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CurrencyFilterPipe } from './@core/pipes/currency-filter.pipe';
import { CurrencyService } from './@core/services/currency.service';
import { GlobalHttpInterceptorService } from './@core/services/global-http-interceptor.service';
import { GlobalErrorHandlerService } from './@core/services/global-error-handler.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { SpinnerInterceptorService } from './@core/services/spinner-interceptor.service';
import { SpinnerComponent } from './spinner-component/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    CurrenciesListComponent,
    CurrenciesDetailsComponent,
    CurrencyFilterPipe,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule,
  ],
  providers: [
    CurrenciesService,
    CurrencyService,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
