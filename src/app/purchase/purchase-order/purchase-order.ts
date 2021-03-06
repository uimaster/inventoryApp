import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from './../purchase.service';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.html',
  styleUrls: ['./purchase-order.scss']
})
export class PurchaseOrderComponent implements OnInit {

  purchaseList = [];
  constructor( private purchaseService: PurchaseService, private router: Router, private transactionSerivices: TransactionSerivices) { }

  ngOnInit() {
    this.getPurchaseList();
    localStorage.setItem('transactionTypeId', '1');
  }

  getPurchaseList() {
    this.purchaseService.getPurchaseList().subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.purchaseList = res.data;
          console.log('purchaseList:', this.purchaseList);
        }
      }
    });
  }

  addPOrder() {
    this.router.navigate(['/purchase/addPOrder']);
    localStorage.setItem('transactionID', '0');
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);
  }

  getPurchaseDetails(id) {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    localStorage.setItem('transactionID', id);
    this.router.navigate(['/purchase/addPOrder']);

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
