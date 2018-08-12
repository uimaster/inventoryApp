import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockItemComponent } from './component/stock-item.component';
import { StockService } from './services/stock.service';
import { StockRouteModule } from './stock.route.module';
import { StockDetailComponent } from './stock-details/stock-detail.component';
@NgModule({
  declarations: [ StockItemComponent, StockDetailComponent ],
  imports: [
    StockRouteModule,
    CommonModule
  ],
  providers: [ StockService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class StockModule {}

