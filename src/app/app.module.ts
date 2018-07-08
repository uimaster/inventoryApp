import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestPasswordComponent } from './reset-password/rest-password.component';
import { routing } from './app.route';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';
import {DataTableModule} from 'primeng/datatable';
import {TableModule} from 'primeng/table';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import { FooterComponent } from './footer/footer.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { PurchaseComponent } from './purchase/purchase.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';




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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
