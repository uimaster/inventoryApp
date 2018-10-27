import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductionRouteModule } from './production.route.module';
import { ProductionComponent } from './production.component';
import { CreateComponent } from './create/create.component';
import { ProdOrderComponent } from './prod-order/prod-order.component';
import { ProdEntryComponent } from './prod-entry/prod-entry.component';
import { FGInwardComponent } from './fginward/fginward.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductionRouteModule
  ],
  declarations: [ ProductionComponent, CreateComponent, ProdOrderComponent, ProdEntryComponent, FGInwardComponent]
})
export class ProductionModule { }
