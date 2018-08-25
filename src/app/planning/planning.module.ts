import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { SharedModule } from '../shared/shared.module';
import { PlanningRouteModule } from './planning.route.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlanningRouteModule
  ],
  declarations: [ PlanningComponent ]
})
export class PlanningModule {}
