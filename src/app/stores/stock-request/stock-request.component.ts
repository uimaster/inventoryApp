import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-stock-request',
  templateUrl: './stock-request.component.html',
  styleUrls: ['./stock-request.component.scss']
})
export class StockRequestComponent implements OnInit {
  stockRequestList = [];
  constructor( private transactionSerivices: TransactionSerivices ) { }

  ngOnInit() {
    this.getTransactionList();
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(15).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.stockRequestList = res.data;
          console.log(this.stockRequestList);
        }
      }
    });
  }
}
