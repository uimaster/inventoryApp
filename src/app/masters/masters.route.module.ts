import { UnitListComponent } from './unit/component/unit-list.component';
import { LedgerListComponent } from './ledger/component/ledger-list.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersComponent } from './masters.component';
import { StockItemComponent } from './stock/component/stock-item.component';
import { StockGroupListComponent } from './stock-group/component/stock-group-list.component';

export const routes: Routes = [
  { path: '',  component: MastersComponent,
    children: [
      {
        path: '', children: [
          { path: 'stockItems', component: StockItemComponent },
          { path: 'stockGroups', component: StockGroupListComponent },
          { path: 'units', component: UnitListComponent},
          { path: 'ledgers', component: LedgerListComponent},
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
