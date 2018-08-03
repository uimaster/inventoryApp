import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnitListComponent} from './component/unit-list.component';
import {UnitRouter} from './unit.routes';
import {UnitService} from './services/unit.service';
@NgModule({
  declarations: [ UnitListComponent ],
  imports: [
    UnitRouter,
    CommonModule
  ],
  providers: [ UnitService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UnitModule{}

