import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestPasswordComponent } from './dump-components/reset-password/rest-password.component';
import { AppRouteModule } from './app.route.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PurchaseComponent } from './dump-components/purchase/purchase.component';
import { HttpClientModule} from '@angular/common/http';
import { PrimeNGModule } from './app.primeNg.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { OrderlistComponent } from './dump-components/orderlist/orderlist.component';
import { FooterComponent } from './shared/footer/footer.component';


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
    AppRouteModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChartsModule,
    PrimeNGModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
