import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order';
import { CreatePOrderComponent } from './purchase-order/create-porder';

export const routes: Routes = [
  { path: '',  component: PurchaseComponent,
    children: [
      {
        path: '', children: [
          { path: 'purchaseOrder', component: PurchaseOrderComponent },
          { path: 'addPOrder', component: CreatePOrderComponent},
        ]
      }
    ]
  }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class PurchaseRouteModule { }
