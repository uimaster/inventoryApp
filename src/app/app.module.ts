import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { RestPasswordComponent } from './dump-components/reset-password/rest-password.component';
import { AppRouteModule } from './app.route.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PrimeNGModule } from './app.primeNg.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { SharedModule} from './shared/shared.module';
// import { TransactionFormModule } from './transactions-form/transaction.module';
import { FiltersModule } from './transFilters/transFilter.Module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    // RestPasswordComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouteModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChartsModule,
    PrimeNGModule,
    SharedModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
