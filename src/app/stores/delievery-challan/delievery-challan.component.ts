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
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'false');
    localStorage.setItem('showSupplier', 'true');
    localStorage.setItem('transactionTypeId', '5');
    localStorage.setItem('FormHeader', 'Good Receipt Note Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'false');
    localStorage.setItem('showLocation', 'false');
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
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    this.router.navigate(['/stores/addEditStore']);
    localStorage.setItem('transactionID', '0');
  }

  editRecord(id) {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    localStorage.setItem('transactionID', id);
    this.router.navigate(['/stores/addEditStore']);
  }

  generateReport(id) {
    this.transactionSerivices.generateReport(id).subscribe( res => {
      if (res.status === '200') {
        const fileName = res.data[0].downloadFileName;
        const downloadUrl = 'http://apietrax.iflotech.in/api/ReportDownload/DownloadReportPDF?ReportFileName=' + fileName;
        window.location.href = downloadUrl;
      } else if ( res.status === '500') {
        alert('Download Report Failed !');
      }
      });
  }

}
