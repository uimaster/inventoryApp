import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-physical-stock',
  templateUrl: './physical-stock.component.html',
  styleUrls: ['./physical-stock.component.scss']
})
export class PhysicalStockComponent implements OnInit {

  physicaStocknList = [];
  constructor( private transactionSerivices: TransactionSerivices ) { }

  ngOnInit() {
    this.getTransactionList();
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(14).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.physicaStocknList = res.data;
          console.log(this.physicaStocknList);
        }
      }
    });
  }

}
