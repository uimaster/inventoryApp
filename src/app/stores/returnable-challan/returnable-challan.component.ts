import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-returnable-challan',
  templateUrl: './returnable-challan.component.html',
  styleUrls: ['./returnable-challan.component.scss']
})
export class ReturnableChallanComponent implements OnInit {

  challanList = [];
  constructor( private transactionSerivices: TransactionSerivices, private router: Router ) { }

  ngOnInit() {
    this.getTransactionList();

    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'true');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
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

  addRecord() {
    this.router.navigate(['/stores/addEditStore']);
    localStorage.setItem('transactionID', '0');
  }

  editRecord(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/stores/addEditStore']);
  }
}
