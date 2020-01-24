import { Component, OnInit } from '@angular/core';
import { TransactionServices } from '../../transactionsShared/transaction.service';
import { Router } from '@angular/router';
import { BASEURL } from '../../../utils/app.urls';
import { UsersService } from '../../users/service/user.service';

@Component({
  selector: 'app-stock-note',
  templateUrl: './stock-note.component.html',
  styleUrls: ['./stock-note.component.scss']
})
export class StockNoteComponent implements OnInit {
  stockIssueList = [];
  public userRightMenuData = {};
  constructor( private transactionSerivices: TransactionServices, private router: Router, private userService: UsersService ) { }

  ngOnInit() {
    // this.getTransactionList();
    localStorage.setItem('t_searchText','');
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'false');
    localStorage.setItem('transPOTerms', 'false');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'true');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'false');
    localStorage.setItem('showSupplier', 'false');
    localStorage.setItem('transactionTypeId', '4');
    localStorage.setItem('FormHeader', 'Stock Issue Note Edit/Create Form');
    localStorage.setItem('transationLinkRef', 'false');
    localStorage.setItem('showLocation', 'false');
    localStorage.setItem('showBarcode4Grn', 'true');
    localStorage.setItem('GrnInput', 'false');
    localStorage.setItem('showBarcode', 'true');
    localStorage.setItem('showGRNFIFOList','true');
    this.getUserMenuDetails()
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
    this.transactionSerivices.getTransactionList(4, dates).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.stockIssueList = res.data;
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
