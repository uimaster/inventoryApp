import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent implements OnInit {
  public salesOrderList = [];

  constructor(
    private transComService: TransactionSerivices
  ) { }

  ngOnInit() {
    this.getSalesOrderList();
  }

  getSalesOrderList() {
    this.transComService.getTransactionList('10').subscribe( res => {
      if (res && res.status === '200') {
        this.salesOrderList = res.data;
        console.log(this.salesOrderList);
      }
    });
  }
}
