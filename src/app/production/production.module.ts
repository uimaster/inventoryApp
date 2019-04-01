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
import { TransactionServices } from '../transactionsShared/transaction.service';
import { FiltersModule } from '../transFilters/transFilter.Module';
import { AssemblyInstructionModule } from './assembly-instruction/assembly-instruction.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductionRouteModule,
    TransactionCommonModule,
    FiltersModule,
    AssemblyInstructionModule
  ],
  declarations: [ ProductionComponent, CreateProdComponent, ProdOrderComponent, ProdEntryComponent, FGInwardComponent],
  providers : [ TransactionServices ]
})
export class ProductionModule { }
