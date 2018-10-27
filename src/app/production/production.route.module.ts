import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { ProdOrderComponent } from './prod-order/prod-order.component';
import { ProdEntryComponent } from './prod-entry/prod-entry.component';
import { FGInwardComponent } from './fginward/fginward.component';

export const routes: Routes = [
  { path: '',  component: ProductionComponent,
    children: [
      {
        path: '', children: [
          { path: 'prodOrder', component: ProdOrderComponent },
          { path: 'prodEntry', component: ProdEntryComponent },
          { path: 'FGInward', component: FGInwardComponent }
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

export class ProductionRouteModule { }
