import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TransactionFormComponent } from './transaction.form';
import { PrimeNGModule } from '../app.primeNg.module';
import { TransactionServices } from './transaction.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PurchaseService } from '../purchase/purchase.service';
import { StockService } from '../masters/stock/services/stock.service';
import { LedgerService } from '../masters/ledger/services/ledger.service';
import { SupplierService } from '../masters/supplier/services/supplier.service';
import { CustomerService } from '../masters/customer/services/customer.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  imports: [ CommonModule, RouterModule, PrimeNGModule, FormsModule, ReactiveFormsModule,ConfirmDialogModule ],
  declarations: [ TransactionFormComponent],
  exports: [ TransactionFormComponent, PrimeNGModule],
  providers: [ TransactionServices, PurchaseService, StockService, LedgerService, SupplierService, CustomerService,
    ConfirmationService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})

export class TransactionCommonModule {}
