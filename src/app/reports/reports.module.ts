import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ReportsListComponent } from './reports-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReportsRouteModule } from './reports.route.module';
import { ReportsService } from './services/reports.service';
import { DatePipe } from '@angular/common';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { FiltersModule } from './filters/filter.Module';
import { PrimeNGModule } from '../app.primeNg.module';

@NgModule({
  imports: [
    PrimeNGModule,
    CommonModule,
    SharedModule,
    ReportsRouteModule,
    ReactiveFormsModule,
    FormsModule,
    FiltersModule
  ],
  declarations: [ ReportsComponent, ReportsListComponent ],
  providers: [ ReportsService,DatePipe ],
})
export class ReportsModule {}
