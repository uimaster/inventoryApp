import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SupplierListComponent} from './component/supplier-list.component';
import {SupplierService} from './services/supplier.service';
import {SupplierComponent} from './component/supplier.component';
import { PrimeNGModule } from '../../app.primeNg.module';
@NgModule({
  declarations: [ SupplierListComponent , SupplierComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
  providers: [ SupplierService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SupplierModule {}

