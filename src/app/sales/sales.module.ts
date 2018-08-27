import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SalesRouteModule } from './sales.route.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SalesRouteModule,
    SharedModule
  ],
  declarations: [ SalesComponent]
})
export class SalesModule { }
