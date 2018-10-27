import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-stock-reject-note',
  templateUrl: './stock-reject-note.component.html',
  styleUrls: ['./stock-reject-note.component.scss']
})
export class StockRejectNoteComponent implements OnInit {
  stockRejectList = [];
  constructor( private transactionSerivices: TransactionSerivices ) { }

  ngOnInit() {
    this.getTransactionList();
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(6).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.stockRejectList = res.data;
          console.log(this.stockRejectList);
        }
      }
    });
  }
}
