import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockItemComponent } from './component/stock-item.component';
import { StockService } from './services/stock.service';
import { StockDetailComponent } from './stock-details/stock-detail.component';
import { PrimeNGModule } from '../../app.primeNg.module';

@NgModule({
  declarations: [ StockItemComponent, StockDetailComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
  providers: [ StockService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class StockModule {}

