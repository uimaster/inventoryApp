import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { ProdOrderComponent } from './prod-order/prod-order.component';
import { ProdEntryComponent } from './prod-entry/prod-entry.component';
import { FGInwardComponent } from './fginward/fginward.component';
import { CreateProdComponent } from './create/create.component';
import { WorkInstructionComponent } from './work-instruction/work-instruction.component';
import { CreateWorkInstructionComponent } from './work-instruction/create/create.component';
import { AssemblyInstructionComponent } from './assembly-instruction/component/assembly-instruction.component';
import { AssemblyInstructionListComponent } from './assembly-instruction/component/assembly-instruction-list.component';
import { DetailsComponent } from './work-instruction/details/details.component';

export const routes: Routes = [
  { path: '',  component: ProductionComponent,
    children: [
      {
        path: '', children: [
          { path: 'prodOrder', component: ProdOrderComponent },
          { path: 'prodEntry', component: ProdEntryComponent },
          { path: 'FGInward', component: FGInwardComponent },
          { path: 'workInstruction', component: WorkInstructionComponent },
          { path: 'addworkInstruction', component: CreateWorkInstructionComponent},
          { path: 'workInstructionDetails', component: DetailsComponent},
          { path: 'addEditProduction', component: CreateProdComponent},
          { path: 'AssemblyInstruction/list', component: AssemblyInstructionListComponent },
          { path: 'AssemblyInstruction/add', component: AssemblyInstructionComponent },
          { path: 'AssemblyInstruction/edit/:id', component: AssemblyInstructionComponent },
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
