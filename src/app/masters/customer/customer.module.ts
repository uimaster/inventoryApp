
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CustomerListComponent} from './component/customer-list.component';
import {CustomerService} from './services/customer.service';
import {CustomerComponent} from './component/customer.component';
import { PrimeNGModule } from '../../app.primeNg.module';
@NgModule({
  declarations: [ CustomerListComponent , CustomerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
  providers: [ CustomerService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class CustomerModule {}

