import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { SharedModule } from '../shared/shared.module';
import { PurchaseRouteModule } from './purchase.route.module';
import { PurchaseOrderComponent } from './purchase-order/purchase-order';
import { PurchaseService } from './purchase.service';
import { CreatePOrderComponent } from './purchase-order/create-porder';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimeNGModule } from '../app.primeNg.module';
import { POAuthListComponent } from './po-authentication/po-auth.component';
import { StockService } from '../masters/stock/services/stock.service';
import { LedgerService } from '../masters/ledger/services/ledger.service';
import { SupplierService } from '../masters/supplier/services/supplier.service';
import { TransactionSerivices } from '../transactionsShared/transaction.service';
import { TransactionCommonModule } from '../transactionsShared/transaction.module';
import { FiltersModule } from '../transFilters/transFilter.Module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PurchaseRouteModule,
    ReactiveFormsModule,
    PrimeNGModule,
    FormsModule,
    TransactionCommonModule,
    FiltersModule
  ],
  declarations: [ PurchaseComponent, PurchaseOrderComponent, CreatePOrderComponent, POAuthListComponent],
  providers: [ PurchaseService, StockService, LedgerService, SupplierService, TransactionSerivices],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchaseModule { }
