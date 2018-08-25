import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillMaterialComponent } from './bill-material.component';

export const routes: Routes = [
  { path: '',  component: BillMaterialComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class BillRouteModule { }
