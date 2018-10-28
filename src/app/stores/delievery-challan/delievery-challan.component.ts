import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delievery-challan',
  templateUrl: './delievery-challan.component.html',
  styleUrls: ['./delievery-challan.component.scss']
})
export class DelieveryChallanComponent implements OnInit {

  challanList = [];
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
    localStorage.setItem('transWorkCompletionDetails', 'true');
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

  addRecord() {
    this.router.navigate(['/stores/addEditStore']);
    localStorage.setItem('transactionID', '0');
  }

  editRecord(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/stores/addEditStore']);
  }

}
