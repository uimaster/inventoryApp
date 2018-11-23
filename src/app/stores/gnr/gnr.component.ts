import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gnr',
  templateUrl: './gnr.component.html',
  styleUrls: ['./gnr.component.scss']
})
export class GnrComponent implements OnInit {
  grnList = [];
  constructor( private transactionSerivices: TransactionSerivices, private router: Router ) { }

  ngOnInit() {
    this.getTransactionList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'true');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'true');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'false');
    localStorage.setItem('showSupplier', 'true');
    localStorage.setItem('FormHeader', 'Good Receipt Note Edit/Create Form');
    localStorage.setItem('transactionTypeId', '3');
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(3).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.grnList = res.data;
          console.log(this.grnList);
        }
      }
    });
  }

  addNote() {
    this.router.navigate(['/stores/addEditStore']);
    localStorage.setItem('transactionID', '0');
  }

  editNote(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/stores/addEditStore']);
  }
}
