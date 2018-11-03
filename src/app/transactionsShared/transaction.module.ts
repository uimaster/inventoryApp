import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TransactionFormComponent } from './transaction.form';
import { PrimeNGModule } from '../app.primeNg.module';
import { TransactionSerivices } from './transaction.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PurchaseService } from '../purchase/purchase.service';
import { StockService } from '../masters/stock/services/stock.service';
import { LedgerService } from '../masters/ledger/services/ledger.service';
import { SupplierService } from '../masters/supplier/services/supplier.service';

@NgModule({
  imports: [ CommonModule, RouterModule, PrimeNGModule, FormsModule, ReactiveFormsModule ],
  declarations: [ TransactionFormComponent],
  exports: [ TransactionFormComponent, PrimeNGModule],
  providers: [ TransactionSerivices, PurchaseService, StockService, LedgerService, SupplierService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})

export class TransactionCommonModule {}
