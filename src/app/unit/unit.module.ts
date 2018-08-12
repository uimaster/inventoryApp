import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnitListComponent} from './component/unit-list.component';
import { UnitRouteModule } from './unit.route.module';
import {UnitService} from './services/unit.service';
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [ UnitListComponent ],
  imports: [
    UnitRouteModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [ UnitService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UnitModule {}

