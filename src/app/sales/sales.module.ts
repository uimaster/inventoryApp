import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SalesRouteModule } from './sales.route.module';
import { SharedModule } from './../shared/shared.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    SalesRouteModule,
    SharedModule
  ],
  declarations: [ SalesComponent, CreateComponent]
})
export class SalesModule { }
