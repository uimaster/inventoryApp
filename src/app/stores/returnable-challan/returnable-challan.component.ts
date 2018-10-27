import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-returnable-challan',
  templateUrl: './returnable-challan.component.html',
  styleUrls: ['./returnable-challan.component.scss']
})
export class ReturnableChallanComponent implements OnInit {

  challanList = [];
  constructor( private transactionSerivices: TransactionSerivices ) { }

  ngOnInit() {
    this.getTransactionList();
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(7).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.challanList = res.data;
          console.log(this.challanList);
        }
      }
    });
  }
}
