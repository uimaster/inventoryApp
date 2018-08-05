import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestPasswordComponent } from './dump-components/reset-password/rest-password.component';
import { routing, routes} from './app.route';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PurchaseComponent } from './dump-components/purchase/purchase.component';
import { HttpClientModule} from '@angular/common/http';
import { PrimeNGModule } from './app.primeNg.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { OrderlistComponent } from './dump-components/orderlist/orderlist.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stock.module';
import {UnitModule} from './unit/unit.module';
import {StockGroupModule} from "./stock-group/stock-group.module";

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
    BrowserAnimationsModule,
    BrowserModule,
    ChartsModule,
    PrimeNGModule,
    AuthModule,
    StockModule,
    UnitModule,
    StockGroupModule

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
