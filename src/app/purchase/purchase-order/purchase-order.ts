import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from './../purchase.service';
import { TransactionServices } from '../../transactionsShared/transaction.service';
import { BASEURL } from '../../../utils/app.urls';
import { UsersService } from '../../users/service/user.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.html',
  styleUrls: ['./purchase-order.scss']
})
export class PurchaseOrderComponent implements OnInit {

  purchaseList = [];
  public userRightMenuData = {};
  constructor(
    private purchaseService: PurchaseService,
    private router: Router,
    private transactionSerivices: TransactionServices,
    private userService: UsersService
    ) { }

  ngOnInit() {
    localStorage.setItem('transactionTypeId', '1');
    this.getUserMenuDetails();
  }

  getUserMenuDetails() {
    let userID = localStorage.getItem('userID');
    let userRightMenuID = localStorage.getItem('userRightMenuID');
    this.userService.getUserMenuDetails(userID, userRightMenuID).subscribe( val => {
      if (val.status === '200') {
        this.userRightMenuData = val.data[0].userRightTabModelList;
      }
    });
  }

  getPurchaseList(dates) {
    this.transactionSerivices.getTransactionList('1', dates).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.purchaseList = res.data;
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
        const downloadUrl = BASEURL + 'ReportDownload/DownloadReportPDF?ReportFileName=' + fileName;
        window.location.href = downloadUrl;
      } else if ( res.status === '500') {
        alert('Download Report Failed !');
      }
      });
  }

}
