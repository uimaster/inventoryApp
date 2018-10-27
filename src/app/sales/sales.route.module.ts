import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { PackingListComponent } from './packing-list/packing-list.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesInvoicePrintComponent } from './sales-invoice-print/sales-invoice-print.component';
import { SalesOrderVerificationComponent } from './sales-order-verification/sales-order-verification.component';
import { SalesOrderAcceptanceComponent } from './sales-order-acceptance/sales-order-acceptance.component';
import { SalesInvoiceGenerationComponent } from './sales-invoice-generation/sales-invoice-generation.component';

export const routes: Routes = [
  { path: '',  component: SalesComponent,
    children: [
      {
        path: '', children: [
          { path: 'salesOrder', component: SalesOrderComponent },
          { path: 'packingList', component: PackingListComponent },
          { path: 'salesInvoice', component: SalesInvoiceComponent },
          { path: 'salesInvoicePrint', component: SalesInvoicePrintComponent },
          { path: 'salesOrderVerify', component: SalesOrderVerificationComponent },
          { path: 'salesOrderAccept', component: SalesOrderAcceptanceComponent },
          { path: 'salesInvoiceGenerate', component: SalesInvoiceGenerationComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class SalesRouteModule { }




