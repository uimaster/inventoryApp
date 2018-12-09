import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prod-order',
  templateUrl: './prod-order.component.html',
  styleUrls: ['./prod-order.component.scss']
})
export class ProdOrderComponent implements OnInit {
  prodOrderList = [];
  constructor( private transactionSerivices: TransactionSerivices, private router: Router) { }

  ngOnInit() {
    this.getTransactionList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'false');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'true');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'true');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'true');
    localStorage.setItem('showSupplier', 'false');
    localStorage.setItem('transactionTypeId', '16');
    localStorage.setItem('FormHeader', 'Production Order Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'false');
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(16).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.prodOrderList = res.data;
        }
      }
    });
  }

  addProdOrder() {
    this.router.navigate(['/production/addEditProduction']);
    localStorage.setItem('transactionID', '0');
  }

  editProdOrder(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/production/addEditProduction']);
  }

}
