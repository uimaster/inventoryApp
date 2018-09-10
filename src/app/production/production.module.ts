import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductionRouteModule } from './production.route.module';
import { ProductionComponent } from './production.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductionRouteModule
  ],
  declarations: [ ProductionComponent, CreateComponent]
})
export class ProductionModule { }
