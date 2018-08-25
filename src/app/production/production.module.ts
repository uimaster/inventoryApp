import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductionRouteModule } from './production.route.module';
import { ProductionComponent } from './production.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductionRouteModule
  ],
  declarations: [ ProductionComponent]
})
export class ProductionModule { }
