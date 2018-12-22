import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { SharedModule } from '../shared/shared.module';
import { PlanningRouteModule } from './planning.route.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlanningRouteModule
  ],
  declarations: [ PlanningComponent, CreateComponent ]
})
export class PlanningModule {}
