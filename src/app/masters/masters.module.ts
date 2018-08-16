import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNGModule } from './../app.primeNg.module';
import { UnitComponent } from './unit/component/unit.component';
import { SharedLedgerService } from './ledger/services/shared-ledger.service';
import { LedgerService } from './ledger/services/ledger.service';
import { LedgerComponent } from './ledger/component/ledger.component';
import { MastersComponent } from './masters.component';
import { MastersRouteModule } from './masters.route.module';
import { SharedModule } from '../shared/shared.module';
import { LedgerListComponent } from './ledger/component/ledger-list.component';
import { StockDetailComponent } from './stock/stock-details/stock-detail.component';
import { StockItemComponent } from './stock/component/stock-item.component';
import { StockGroupComponent } from './stock-group/component/stock-group.component';
import { StockGroupListComponent } from './stock-group/component/stock-group-list.component';
import { UnitListComponent } from './unit/component/unit-list.component';
import { StockService } from './stock/services/stock.service';
import { StockGroupService } from './stock-group/services/stock-group.service';
import { UnitService } from './unit/services/unit.service';
import {CustomerListComponent} from "./customer/component/customer-list.component";
import {CustomerService} from "./customer/services/customer.service";
import {CustomerComponent} from "./customer/component/customer.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MastersRouteModule,
    SharedModule,
    PrimeNGModule
  ],
  declarations: [MastersComponent, LedgerComponent, LedgerListComponent, StockDetailComponent, StockItemComponent,
    StockGroupComponent, StockGroupListComponent, UnitComponent, UnitListComponent, CustomerListComponent, CustomerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ LedgerService, SharedLedgerService, StockService, StockGroupService, UnitService, CustomerService]
})
export class MastersModule {}
