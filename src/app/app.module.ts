import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/component/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestPasswordComponent } from './dump-components/reset-password/rest-password.component';
import { routing } from './app.route';
import { ChartsModule } from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';
import {DataTableModule} from 'primeng/datatable';
import {TableModule} from 'primeng/table';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { OrderlistComponent } from './dump-components/orderlist/orderlist.component';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import { FooterComponent } from './shared/footer/footer.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { PurchaseComponent } from './dump-components/purchase/purchase.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../app/auth/services/auth.service';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/effects/auth.effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './auth/reducers';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    BrowserAnimationsModule,
    BrowserModule,
    routing,
    ChartsModule,
    SidebarModule,
    DataTableModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    CheckboxModule,
    PanelMenuModule,
    RadioButtonModule,
    DialogModule,
    InputTextareaModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
