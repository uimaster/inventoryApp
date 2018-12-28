
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {BomListComponent} from './component/bom-list.component';
import {BomService} from './services/bom.service';
import {BomComponent} from './component/bom.component';
import { PrimeNGModule } from '../../app.primeNg.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [ BomListComponent , BomComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
  providers: [ BomService,DatePipe ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class BomModule {}

