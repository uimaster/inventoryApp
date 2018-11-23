import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent implements OnInit {
  public salesOrderList = [];

  constructor(
    private transComService: TransactionSerivices, private router: Router
  ) { }

  ngOnInit() {
    this.getSalesOrderList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'true');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'true');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'true');
    localStorage.setItem('showSupplier', 'false');
    localStorage.setItem('transactionTypeId', '10');
    localStorage.setItem('FormHeader', 'Sales Order Edit/Create Form');
  }

  getSalesOrderList() {
    this.transComService.getTransactionList('10').subscribe( res => {
      if (res && res.status === '200') {
        this.salesOrderList = res.data;
        console.log(this.salesOrderList);
      }
    });
  }

  addSalesOrder() {
    this.router.navigate(['/sales/addEditsales']);
    localStorage.setItem('transactionID', '0');
  }

  editSalesOrder(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/sales/addEditsales']);
  }
}
