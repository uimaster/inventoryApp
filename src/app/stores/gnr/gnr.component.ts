import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionServices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';
import { BASEURL } from '../../../utils/app.urls';
import { UsersService } from '../../users/service/user.service';

@Component({
  selector: 'app-gnr',
  templateUrl: './gnr.component.html',
  styleUrls: ['./gnr.component.scss']
})
export class GnrComponent implements OnInit, OnDestroy {
  grnList = [];
  public userRightMenuData = {};
  constructor( private transactionSerivices: TransactionServices, private router: Router, private userService: UsersService ) { }

  ngOnInit() {
    // this.getTransactionList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'true');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'true');
    localStorage.setItem('transGRNTerms', 'true');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'false');
    localStorage.setItem('showSupplier', 'true');
    localStorage.setItem('FormHeader', 'Good Receipt Note Edit/Create Form');
    localStorage.setItem('transactionTypeId', '3');
    localStorage.setItem('transationLinkRef', 'false');
    localStorage.setItem('showLocation', 'true');
    localStorage.setItem('showBarcode', 'true');
    localStorage.setItem('transationLinkRefNamePO', 'true');
    localStorage.setItem('GrnInput', 'true');
    localStorage.setItem('showActionBtn', 'true');
    localStorage.setItem('showBarcode4Grn', 'true');
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


  getTransactionList(dates) {
    this.transactionSerivices.getTransactionList(3, dates).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.grnList = res.data;
        }
      }
    });
  }

  addNote() {
    let backUrl = this.router.url;
    localStorage.setItem('rollBackUrl', backUrl);

    this.router.navigate(['/stores/addEditStore']);
    localStorage.setItem('transactionID', '0');
  }

  editNote(id) {
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

  ngOnDestroy() {
    // localStorage.setItem('showBarcode', 'false');
  }
}
