import { Component, OnInit } from '@angular/core';
import { TransactionServices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';
import { BASEURL } from '../../../utils/app.urls';
import { UsersService } from '../../users/service/user.service';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent implements OnInit {
  public salesOrderList = [];
  public userRightMenuData = {};
  constructor(
    private transComService: TransactionServices, private router: Router, private userService: UsersService
  ) { }

  ngOnInit() {
    // this.getSalesOrderList();
    localStorage.setItem('t_searchText','');
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'true');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'true');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'true');
    localStorage.setItem('showSupplier', 'false');
    localStorage.setItem('transactionTypeId', '10');
    localStorage.setItem('FormHeader', 'Sales Order Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'false');
    localStorage.setItem('showLocation', 'false');
    localStorage.setItem('showPO', 'true');
    localStorage.setItem('transationLinkRefInput', 'true');
    localStorage.setItem('showBoxCode', 'true');
    localStorage.setItem('showLength4So', 'true');
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


  getSalesOrderList(dates) {
    this.transComService.getTransactionList('10', dates).subscribe( res => {
      if (res && res.status === '200') {
        this.salesOrderList = res.data;
      }
    });
  }

  addSalesOrder() {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    this.router.navigate(['/sales/addEditsales']);
    localStorage.setItem('transactionID', '0');
  }

  editSalesOrder(id) {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    localStorage.setItem('transactionID', id);
    this.router.navigate(['/sales/addEditsales']);
  }

  generateReport(id) {
    this.transComService.generateReport(id).subscribe( res => {
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
