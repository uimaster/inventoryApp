import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-stock-note',
  templateUrl: './stock-note.component.html',
  styleUrls: ['./stock-note.component.scss']
})
export class StockNoteComponent implements OnInit {
  stockIssueList = [];
  constructor( private transactionSerivices: TransactionSerivices ) { }

  ngOnInit() {
    this.getTransactionList();
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
}
