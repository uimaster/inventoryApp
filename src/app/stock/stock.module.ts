import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StockItemComponent } from './component/stock-item.component';
import { StockService } from './services/stock.service';
import { StockRouter } from './stock.routes';
import { reducers } from './reducers/index';
import { GetStockListEffect } from './effects/stock.effects';

@NgModule({
  declarations: [ StockItemComponent ],
  imports: [
    StockRouter,
    CommonModule,
    StoreModule.forFeature('getStockListReducer', reducers),
    EffectsModule.forFeature([GetStockListEffect]),
  ],
  providers: [ StockService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class StockModule {}

