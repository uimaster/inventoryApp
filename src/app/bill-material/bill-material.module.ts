import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillMaterialComponent } from './bill-material.component';
import { SharedModule } from '../shared/shared.module';
import { BillRouteModule } from './bill-material.route.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BillRouteModule
  ],
  declarations: [ BillMaterialComponent ]
})
export class BillMaterialModule { }
