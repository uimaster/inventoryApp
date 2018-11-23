import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prod-entry',
  templateUrl: './prod-entry.component.html',
  styleUrls: ['./prod-entry.component.scss']
})
export class ProdEntryComponent implements OnInit {
  prodEntriesList = [];
  constructor( private transactionSerivices: TransactionSerivices, private router: Router) { }

  ngOnInit() {
    this.getTransactionList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'false');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'true');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'true');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'true');
    localStorage.setItem('showSupplier', 'false');
    localStorage.setItem('transactionTypeId', '17');
    localStorage.setItem('FormHeader', 'Production Entery Edit/Create Form');
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(17).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.prodEntriesList = res.data;
        }
      }
    });
  }

  addProdEntry() {
    this.router.navigate(['/production/addEditProduction']);
    localStorage.setItem('transactionID', '0');
  }

  editProdEntry(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/production/addEditProduction']);
  }
}