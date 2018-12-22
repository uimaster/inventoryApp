import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillMaterialComponent } from './bill-material.component';
import { SharedModule } from '../shared/shared.module';
import { BillRouteModule } from './bill-material.route.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BillRouteModule
  ],
  declarations: [ BillMaterialComponent, CreateComponent ]
})
export class BillMaterialModule { }
