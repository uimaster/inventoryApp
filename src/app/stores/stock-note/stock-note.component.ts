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
    this.router.navigate(['/stores/addEditStore']);
    localStorage.setItem('transactionID', '0');
  }

  editRecord(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/stores/addEditStore']);
  }
}
