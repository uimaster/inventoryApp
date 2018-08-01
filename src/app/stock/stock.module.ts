import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockItemComponent } from './component/stock-item.component';
import { StockService } from './services/stock.service';
import { StockRouter } from './stock.routes';
import {NavbarComponent} from '../shared/navbar/navbar.component';
import {StockDetailComponent} from './component/stock-detail.component';
@NgModule({
  declarations: [ StockItemComponent, StockDetailComponent ],
  imports: [
    StockRouter,
    CommonModule
  ],
  providers: [ StockService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class StockModule {}

