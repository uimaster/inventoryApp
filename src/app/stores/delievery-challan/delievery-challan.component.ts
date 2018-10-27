import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-delievery-challan',
  templateUrl: './delievery-challan.component.html',
  styleUrls: ['./delievery-challan.component.scss']
})
export class DelieveryChallanComponent implements OnInit {

  challanList = [];
  constructor( private transactionSerivices: TransactionSerivices ) { }

  ngOnInit() {
    this.getTransactionList();
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(6).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.challanList = res.data;
          console.log(this.challanList);
        }
      }
    });
  }

}
