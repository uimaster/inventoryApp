import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';

import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestPasswordComponent } from './dump-components/reset-password/rest-password.component';
import { routing, routes} from './app.route';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PurchaseComponent } from './dump-components/purchase/purchase.component';
import { HttpClientModule} from '@angular/common/http';
import { EffectsModule} from '@ngrx/effects';
import { StoreModule} from '@ngrx/store';
import { PrimeNGModule } from './app.primeNg.module';
import { metaReducers, reducers } from './reducer';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { OrderlistComponent } from './dump-components/orderlist/orderlist.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stock.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RestPasswordComponent,
    NavbarComponent,
    OrderlistComponent,
    FooterComponent,
    PurchaseComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    RouterModule.forRoot(routes, { useHash: true}),
    StoreModule.forRoot( reducers, { metaReducers}),
    EffectsModule.forRoot([]),
    // StoreDevtoolsModule.instrument({
    //   name: 'Get Stock',
    //   logOnly: environment.production,
    // }),
    BrowserAnimationsModule,
    BrowserModule,
    ChartsModule,
    PrimeNGModule,
    AuthModule,
    StockModule

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
