import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss']
})
export class PackingListComponent implements OnInit {
  public packingList = [];

  constructor(
    private transComService: TransactionSerivices, private router: Router,
  ) { }

  ngOnInit() {
    this.getSalesOrderList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'false');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'true');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'true');
    localStorage.setItem('showSupplier', 'false');
    localStorage.setItem('transactionTypeId', '11');
    localStorage.setItem('FormHeader', 'Packing List Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'true');
  }

  getSalesOrderList() {
    this.transComService.getTransactionList('11').subscribe( res => {
      if (res && res.status === '200') {
        this.packingList = res.data;
      }
    });
  }

  addPackingList() {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    this.router.navigate(['/sales/addEditsales']);
    localStorage.setItem('transactionID', '0');
  }

  editPackingList(id) {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/sales/addEditsales']);
  }
}
