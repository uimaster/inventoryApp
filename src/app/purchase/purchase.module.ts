import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { SharedModule } from '../shared/shared.module';
import { PurchaseRouteModule } from './purchase.route.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PurchaseRouteModule
  ],
  declarations: [ PurchaseComponent]
})
export class PurchaseModule { }
