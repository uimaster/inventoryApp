import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnitListComponent} from './component/unit-list.component';
import {UnitService} from './services/unit.service';
import {ReactiveFormsModule} from '@angular/forms';
import {UnitComponent} from './component/unit.component';
import { PrimeNGModule } from '../../app.primeNg.module';
@NgModule({
  declarations: [ UnitListComponent , UnitComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
  providers: [ UnitService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class UnitModule {}

