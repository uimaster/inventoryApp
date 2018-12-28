
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {PricelistListComponent} from './component/pricelist-list.component';
import {PricelistService} from './services/pricelist.service';
import {PricelistComponent} from './component/pricelist.component';
import { PrimeNGModule } from '../../app.primeNg.module';
import { DatePipe } from '@angular/common';
//import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ PricelistListComponent , PricelistComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule,
//    NgSelectModule
  ],
  providers: [ PricelistService,DatePipe ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class PricelistModule {}

