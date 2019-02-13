import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SalesRouteModule } from './sales.route.module';
import { SharedModule } from './../shared/shared.module';
import { CreateEditSalesComponent } from './create/create.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { PackingListComponent } from './packing-list/packing-list.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesInvoicePrintComponent } from './sales-invoice-print/sales-invoice-print.component';
import { SalesOrderVerificationComponent } from './sales-order-verification/sales-order-verification.component';
import { SalesOrderAcceptanceComponent } from './sales-order-acceptance/sales-order-acceptance.component';
import { SalesInvoiceGenerationComponent } from './sales-invoice-generation/sales-invoice-generation.component';
import { TransactionCommonModule } from '../transactionsShared/transaction.module';
import { SalesService } from './sales.service';
import { FiltersModule } from '../transFilters/transFilter.Module';
import { PrimeNGModule } from './../app.primeNg.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SalesRouteModule,
    SharedModule,
    TransactionCommonModule,
    FiltersModule,
    PrimeNGModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    SalesComponent,
    CreateEditSalesComponent,
    SalesOrderComponent,
    PackingListComponent,
    SalesInvoiceComponent,
    SalesInvoicePrintComponent,
    SalesOrderVerificationComponent,
    SalesOrderAcceptanceComponent,
    SalesInvoiceGenerationComponent
  ],
  providers: [ SalesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesModule { }
