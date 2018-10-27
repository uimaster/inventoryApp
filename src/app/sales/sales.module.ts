import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SalesRouteModule } from './sales.route.module';
import { SharedModule } from './../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { PackingListComponent } from './packing-list/packing-list.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesInvoicePrintComponent } from './sales-invoice-print/sales-invoice-print.component';
import { SalesOrderVerificationComponent } from './sales-order-verification/sales-order-verification.component';
import { SalesOrderAcceptanceComponent } from './sales-order-acceptance/sales-order-acceptance.component';
import { SalesInvoiceGenerationComponent } from './sales-invoice-generation/sales-invoice-generation.component';
import { TransactionCommonModule } from '../transactionsShared/transaction.module';

@NgModule({
  imports: [
    CommonModule,
    SalesRouteModule,
    SharedModule,
    TransactionCommonModule
  ],
  declarations: [
    SalesComponent,
    CreateComponent,
    SalesOrderComponent,
    PackingListComponent,
    SalesInvoiceComponent,
    SalesInvoicePrintComponent,
    SalesOrderVerificationComponent,
    SalesOrderAcceptanceComponent,
    SalesInvoiceGenerationComponent
  ]
})
export class SalesModule { }
