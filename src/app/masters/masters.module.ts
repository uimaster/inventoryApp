
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from './../app.primeNg.module';

import { MastersComponent } from './masters.component';
import { MastersRouteModule } from './masters.route.module';
import { SharedModule } from '../shared/shared.module';
import { StockModule } from './stock/stock.module';
import { StockGroupModule } from './stock-group/stock-group.module';
import { CustomerModule } from './customer/customer.module';
import { SupplierModule } from './supplier/supplier.module';
import { UnitModule } from './unit/unit.module';
import { LedgerModule } from './ledger/ledger.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MastersRouteModule,
    SharedModule,
    PrimeNGModule,
    LedgerModule,
    StockModule,
    StockGroupModule,
    UnitModule,
    CustomerModule,
    SupplierModule
  ],
  declarations: [MastersComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class MastersModule {}
