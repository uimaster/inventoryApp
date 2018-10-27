import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-gnr',
  templateUrl: './gnr.component.html',
  styleUrls: ['./gnr.component.scss']
})
export class GnrComponent implements OnInit {
  grnList = [];
  constructor( private transactionSerivices: TransactionSerivices ) { }

  ngOnInit() {
    this.getTransactionList();
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
}
