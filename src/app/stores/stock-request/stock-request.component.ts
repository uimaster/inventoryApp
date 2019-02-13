import { Component, OnInit } from '@angular/core';
import { TransactionServices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';
import { BASEURL } from '../../../utils/app.urls';

@Component({
  selector: 'app-stock-request',
  templateUrl: './stock-request.component.html',
  styleUrls: ['./stock-request.component.scss']
})
export class StockRequestComponent implements OnInit {
  stockRequestList = [];
  constructor( private transactionSerivices: TransactionServices, private router: Router ) { }

  ngOnInit() {
    // this.getTransactionList();

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
    localStorage.setItem('transactionTypeId', '15');
    localStorage.setItem('FormHeader', 'Stock Issue Request Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'false');
    localStorage.setItem('showLocation', 'true');
  }

  getTransactionList(dates) {
    this.transactionSerivices.getTransactionList(15, dates).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.stockRequestList = res.data;
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
        const downloadUrl = BASEURL + 'ReportDownload/DownloadReportPDF?ReportFileName=' + fileName;
        window.location.href = downloadUrl;
      } else if ( res.status === '500') {
        alert('Download Report Failed !');
      }
      });
  }

}
