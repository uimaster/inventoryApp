import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-physical-stock',
  templateUrl: './physical-stock.component.html',
  styleUrls: ['./physical-stock.component.scss']
})
export class PhysicalStockComponent implements OnInit {

  physicaStocknList = [];
  constructor( private transactionSerivices: TransactionSerivices, private router: Router ) { }

  ngOnInit() {
    this.getTransactionList();

    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'false');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
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

  addRecord() {
    this.router.navigate(['/stores/addEditStore']);
    localStorage.setItem('transactionID', '0');
  }

  editRecord(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/stores/addEditStore']);
  }

}
