import { Component, OnInit } from '@angular/core';
import { TransactionServices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';
import { BASEURL } from '../../../utils/app.urls';

@Component({
  selector: 'app-prod-order',
  templateUrl: './prod-order.component.html',
  styleUrls: ['./prod-order.component.scss']
})
export class ProdOrderComponent implements OnInit {
  prodOrderList = [];
  constructor( private transactionSerivices: TransactionServices, private router: Router) { }

  ngOnInit() {
    // this.getTransactionList();
    localStorage.setItem('t_searchText','');
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
    localStorage.setItem('showLocation', 'false');
  }

  getTransactionList(dates) {
    this.transactionSerivices.getTransactionList(16, dates).subscribe ( res => {
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
