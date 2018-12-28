import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { PlanningListComponent } from './planning-list.component';
import { SharedModule } from '../shared/shared.module';
import { PlanningRouteModule } from './planning.route.module';
import { CreateComponent } from './create/create.component';
import { PlanningService } from './services/planning.service';
import { DatePipe } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlanningRouteModule,
    ReactiveFormsModule
  ],
  declarations: [ PlanningComponent, PlanningListComponent, CreateComponent ],
  providers: [ PlanningService,DatePipe ],
})
export class PlanningModule {}
