import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TransactionFormComponent } from './transaction.form';
import { PrimeNGModule } from '../app.primeNg.module';
import { TransactionSerivices } from './transaction.service';

@NgModule({
  imports: [ CommonModule, RouterModule, PrimeNGModule ],
  declarations: [ TransactionFormComponent],
  exports: [ TransactionFormComponent, PrimeNGModule],
  providers: [ TransactionSerivices ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})

export class TransactionCommonModule {}
