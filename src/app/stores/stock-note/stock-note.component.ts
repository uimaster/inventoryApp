import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-note',
  templateUrl: './stock-note.component.html',
  styleUrls: ['./stock-note.component.scss']
})
export class StockNoteComponent implements OnInit {
  stockIssueList = [];
  constructor( private transactionSerivices: TransactionSerivices, private router: Router ) { }

  ngOnInit() {
    this.getTransactionList();

    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'false');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'false');
    localStorage.setItem('showSupplier', 'true');
    localStorage.setItem('transactionTypeId', '4');
    localStorage.setItem('FormHeader', 'Stock Issue Note Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'false');
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(4).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.stockIssueList = res.data;
          console.log(this.stockIssueList);
        }
      }
    });
  }

  addRecord() {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    this.router.navigate(['/stores/addEditStore']);
    localStorage.setItem('transactionID', '0');
  }

  editRecord(id) {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    localStorage.setItem('transactionID', id);
    this.router.navigate(['/stores/addEditStore']);
  }
}
