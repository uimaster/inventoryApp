import { UnitListComponent } from './unit/component/unit-list.component';
import { LedgerListComponent } from './ledger/component/ledger-list.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersComponent } from './masters.component';
import { StockItemComponent } from './stock/component/stock-item.component';
import { StockGroupListComponent } from './stock-group/component/stock-group-list.component';
import {LedgerComponent} from "./ledger/component/ledger.component";
import {UnitComponent} from "./unit/component/unit.component";
import {StockGroupComponent} from "./stock-group/component/stock-group.component";
import {StockDetailComponent} from "./stock/stock-details/stock-detail.component";
import {CustomerListComponent} from "./customer/component/customer-list.component";
import {CustomerComponent} from "./customer/component/customer.component";
import {SupplierListComponent} from "./supplier/component/supplier-list.component";
import {SupplierComponent} from "./supplier/component/supplier.component";

export const routes: Routes = [
  { path: '',  component: MastersComponent,
    children: [
      {
        path: '', children: [
          { path: 'stockItems', component: StockItemComponent },
          { path: 'add-stock-item', component: StockDetailComponent},
          { path: 'stock-item/:id', component: StockDetailComponent},
          { path: 'stockGroups', component: StockGroupListComponent },
          { path: 'add-stock-group', component: StockGroupComponent},
          { path: 'stock-group/:id', component: StockGroupComponent},
          { path: 'units', component: UnitListComponent},
          { path: 'add-unit', component: UnitComponent},
          { path: 'unit/:id', component: UnitComponent},
          { path: 'ledgers', component: LedgerListComponent},
          { path: 'add-ledger', component: LedgerComponent},
          { path: 'ledger/:id', component: LedgerComponent},
          { path: 'customers', component: CustomerListComponent},
          { path: 'add-customer', component: CustomerComponent},
          { path: 'customer/:id', component: CustomerComponent},
          { path: 'suppliers', component: SupplierListComponent},
          { path: 'add-supplier', component: SupplierComponent},
          { path: 'supplier/:id', component: SupplierComponent}

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

export class MastersRouteModule { }
