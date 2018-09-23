import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { SharedModule } from '../shared/shared.module';
import { PurchaseRouteModule } from './purchase.route.module';
import { PurchaseOrderComponent } from './purchase-order/purchase-order';
import { PurchaseService } from './purchase.service';
import { CreatePOrderComponent } from './purchase-order/create-porder';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../app.primeNg.module';
import { POAuthListComponent } from './po-authentication/po-auth.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PurchaseRouteModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
  declarations: [ PurchaseComponent, PurchaseOrderComponent, CreatePOrderComponent, POAuthListComponent],
  providers: [ PurchaseService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchaseModule { }
