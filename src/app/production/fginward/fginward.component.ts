import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fginward',
  templateUrl: './fginward.component.html',
  styleUrls: ['./fginward.component.scss']
})
export class FGInwardComponent implements OnInit {
  fgList = [];
  constructor( private transactionSerivices: TransactionSerivices, private router: Router) { }

  ngOnInit() {
    this.getTransactionList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'false');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'true');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'false');
    localStorage.setItem('showSupplier', 'false');
    localStorage.setItem('transactionTypeId', '13');
    localStorage.setItem('FormHeader', 'Finish Goods Inwards Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'false');
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(13).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.fgList = res.data;
        }
      }
    });
  }

  addfg() {
    this.router.navigate(['/production/addEditProduction']);
    localStorage.setItem('transactionID', '0');
  }

  editfg(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/production/addEditProduction']);
  }
}
