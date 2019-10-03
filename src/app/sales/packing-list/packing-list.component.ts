import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionServices } from '../../transactionsShared/transaction.service';
import { BASEURL } from '../../../utils/app.urls';
import { UsersService } from '../../users/service/user.service';


@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss']
})
export class PackingListComponent implements OnInit, OnDestroy {
  public packingList = [];
  public userRightMenuData = {};
  constructor(
    private transComService: TransactionServices, private router: Router, private userService: UsersService
  ) { }

  ngOnInit() {
    // this.getSalesOrderList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'false');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'true');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'true');
    localStorage.setItem('showSupplier', 'false');
    localStorage.setItem('transactionTypeId', '11');
    localStorage.setItem('FormHeader', 'Packing List Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'true');
    localStorage.setItem('showLocation', 'false');
    localStorage.setItem('showBarcode', 'true');
    localStorage.setItem('showActionBtn', 'true');
    localStorage.setItem('showBarcode4Pl', 'true');
    localStorage.setItem('showScannedQty', 'true');
    
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
    this.transComService.getTransactionList('11', dates).subscribe( res => {
      if (res && res.status === '200') {
        this.packingList = res.data;
      }
    });
  }

  addPackingList() {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    this.router.navigate(['/sales/addEditsales']);
    localStorage.setItem('transactionID', '0');
  }

  editPackingList(id) {
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

  ngOnDestroy() {
    // localStorage.setItem('showBarcode', 'false');
  }
}
