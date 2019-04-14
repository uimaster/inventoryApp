import { PrimeNGModule } from "./../app.primeNg.module";
import { FormsModule } from "@angular/forms";
import { WorkInstructionComponent } from "./work-instruction/work-instruction.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ProductionRouteModule } from "./production.route.module";
import { ProductionComponent } from "./production.component";
import { CreateProdComponent } from "./create/create.component";
import { ProdOrderComponent } from "./prod-order/prod-order.component";
import { ProdEntryComponent } from "./prod-entry/prod-entry.component";
import { FGInwardComponent } from "./fginward/fginward.component";
import { TransactionCommonModule } from "../transactionsShared/transaction.module";
import { TransactionServices } from "../transactionsShared/transaction.service";
import { FiltersModule } from "../transFilters/transFilter.Module";
import { WorkInstructionService } from "./work-instruction/work-instruction.service";
import { CreateWorkInstructionComponent } from "./work-instruction/create/create.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AssemblyInstructionModule } from './assembly-instruction/assembly-instruction.module';
import { DetailsComponent } from './work-instruction/details/details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductionRouteModule,
    TransactionCommonModule,
    FiltersModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNGModule,
    AssemblyInstructionModule
  ],
  declarations: [
    ProductionComponent,
    CreateProdComponent,
    ProdOrderComponent,
    ProdEntryComponent,
    FGInwardComponent,
    WorkInstructionComponent,
    CreateWorkInstructionComponent,
    DetailsComponent
  ],
  providers: [TransactionServices, WorkInstructionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductionModule {}
