import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prod-entry',
  templateUrl: './prod-entry.component.html',
  styleUrls: ['./prod-entry.component.scss']
})
export class ProdEntryComponent implements OnInit {
  prodEntriesList = [];
  constructor( private transactionSerivices: TransactionSerivices, private router: Router) { }

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
    localStorage.setItem('showSupplier', 'false');
    localStorage.setItem('transactionTypeId', '17');
    localStorage.setItem('FormHeader', 'Production Entery Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'false');
    localStorage.setItem('showLocation', 'false');
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(17).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.prodEntriesList = res.data;
        }
      }
    });
  }

  addProdEntry() {
    this.router.navigate(['/production/addEditProduction']);
    localStorage.setItem('transactionID', '0');
  }

  editProdEntry(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/production/addEditProduction']);
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
