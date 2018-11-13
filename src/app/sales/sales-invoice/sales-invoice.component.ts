import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.scss']
})
export class SalesInvoiceComponent implements OnInit {
  public invoiceList = [];

  constructor(
    private transComService: TransactionSerivices, private router: Router
  ) { }

  ngOnInit() {
    this.getSalesOrderList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'true');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'true');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('FormHeader', 'Sales Invoice Edit/Create Form');
  }

  getSalesOrderList() {
    this.transComService.getTransactionList('12').subscribe( res => {
      if (res && res.status === '200') {
        this.invoiceList = res.data;
      }
    });
  }

  addSalesInvoice() {
    this.router.navigate(['/sales/addEditsales']);
    localStorage.setItem('transactionID', '0');
  }

  editSalesInvoice(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/sales/addEditsales']);
  }
}
