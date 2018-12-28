import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductionRouteModule } from './production.route.module';
import { ProductionComponent } from './production.component';
import { CreateProdComponent } from './create/create.component';
import { ProdOrderComponent } from './prod-order/prod-order.component';
import { ProdEntryComponent } from './prod-entry/prod-entry.component';
import { FGInwardComponent } from './fginward/fginward.component';
import { TransactionCommonModule } from '../transactionsShared/transaction.module';
import { TransactionSerivices } from '../transactionsShared/transaction.service';
import { FiltersModule } from '../transFilters/transFilter.Module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductionRouteModule,
    TransactionCommonModule,
    FiltersModule
  ],
  declarations: [ ProductionComponent, CreateProdComponent, ProdOrderComponent, ProdEntryComponent, FGInwardComponent],
  providers : [ TransactionSerivices ]
})
export class ProductionModule { }
