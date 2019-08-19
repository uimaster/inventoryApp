import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionServices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';
import { BASEURL } from '../../../utils/app.urls';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class TransactionPurchaseComponent implements OnInit, OnDestroy {
  grnList = [];
  constructor( private transactionSerivices: TransactionServices, private router: Router ) { }

  ngOnInit() {
    // this.getTransactionList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'true');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'true');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'false');
    localStorage.setItem('showSupplier', 'true');
    localStorage.setItem('FormHeader', 'Purchase Edit/Create Form');
    localStorage.setItem('transactionTypeId', '18');
    localStorage.setItem('transationLinkRef', 'false');
    localStorage.setItem('showLocation', 'true');
    localStorage.setItem('showBarcode', 'true');
    localStorage.setItem('transationLinkRefNamePO', 'false');
    localStorage.setItem('transationLinkRefNameGRN', 'true');
    localStorage.setItem('GrnInput', 'false');
    localStorage.setItem('showActionBtn', 'true');
    localStorage.setItem('showBarcode4Grn', 'true');
    localStorage.setItem('showProjects', 'true');
  }



  getTransactionList(dates) {
    let searchText = '';
    if(localStorage.getItem('t_searchText') && localStorage.getItem('t_searchText') !== '') {
      searchText = localStorage.getItem('t_searchText');
    }
    this.transactionSerivices.getTransactionList(18, dates,searchText).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.grnList = res.data;
        }
      }
    });
  }

  addPurchase() {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    this.router.navigate(['/purchase/addEditPurchase']);
    localStorage.setItem('transactionID', '0');
  }

  editPurchase(id) {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    localStorage.setItem('transactionID', id);
    this.router.navigate(['/purchase/addEditPurchase']);
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

  ngOnDestroy() {
    localStorage.removeItem('t_searchText');
    // localStorage.setItem('showBarcode', 'false');
  }
}
