import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillMaterialComponent } from './bill-material.component';
import { BomComponent } from './bom/component/bom.component';
import { BomListComponent } from './bom/component/bom-list.component';

export const routes: Routes = [
  { path: '',  component: BillMaterialComponent,
    children: [
      {
        path: '', children: [
          { path: 'list', component: BomListComponent },
          { path: 'add-bom', component: BomComponent},
          { path: 'bom/:id', component: BomComponent},
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

export class BillRouteModule { }
