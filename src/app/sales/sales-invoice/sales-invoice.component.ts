import { Component, OnInit } from '@angular/core';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.scss']
})
export class SalesInvoiceComponent implements OnInit {
  public invoiceList = [];
  constructor(
    private transComService: TransactionSerivices, private router: Router
  ) { }

  ngOnInit() {
    this.getSalesOrderList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'true');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'true');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'true');
    localStorage.setItem('showSupplier', 'false');
    localStorage.setItem('transactionTypeId', '12');
    localStorage.setItem('FormHeader', 'Sales Invoice Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'true');
    localStorage.setItem('showLocation', 'false');
  }

  getSalesOrderList() {
    this.transComService.getTransactionList('12').subscribe( res => {
      if (res && res.status === '200') {
        this.invoiceList = res.data;
      }
    });
  }

  addSalesInvoice() {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    this.router.navigate(['/sales/addEditsales']);
    localStorage.setItem('transactionID', '0');
  }

  editSalesInvoice(id) {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    localStorage.setItem('transactionID', id);
    this.router.navigate(['/sales/addEditsales']);
  }

  generateReport(id) {
    this.transComService.generateReport(id).subscribe( res => {
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
