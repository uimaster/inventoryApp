import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
// import { PurchaseService } from '../purchase.service';
// import { StockService } from '../../masters/stock/services/stock.service';
// import { LedgerService } from '../../masters/ledger/services/ledger.service';
// import { SupplierService } from '../../masters/supplier/services/supplier.service';
import { TransactionSerivices } from '../../transactionsShared/transaction.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './create-porder.html',
  styleUrls: ['./purchase-order.scss']
})

export class CreatePOrderComponent implements OnInit {
  // public purchaseOrderForm: any;
  // public showError =  false;
  // public showSuccess = false;
  // public successMsg = '';
  // public errorMsg = '';
  // public companyId = localStorage.getItem('companyID');
  // public userId = localStorage.getItem('userID');
  // public transactionId = localStorage.getItem('transactionID');
  // public detailsData = {} ;
  // public ItemData = [];
  // public ledgerData = [];
  // public POData = [];
  // public currencyList = [];
  // public itemMasterList = [];
  // public locationList = [];
  // public ledgerList = [];
  // public supplierList = [];

  // date3 = new Date();
  // date5 = new Date();
  // constructor(
  //   private fb: FormBuilder,
  //   private poService: PurchaseService,
  //   private stockService: StockService,
  //   private ledgerService: LedgerService,
  //   private router: Router,
  //   private supplierService: SupplierService
  // )  {this.createPurchaseOrder(); }

  // ngOnInit() {
  //   this.getPurchaseDetails(this.transactionId);
  //   this.getCurrency();
  //   this.getItemMasterList();
  //   this.getLocation();
  //   this.getLedgers();
  //   this.getSupplier();
  // }

  grnList = [];
  constructor( private transactionSerivices: TransactionSerivices, private router: Router ) { }

  ngOnInit() {
    this.getTransactionList();
    localStorage.setItem('transItemDetails', 'true');
    localStorage.setItem('transLedgerDetails', 'true');
    localStorage.setItem('transPOTerms', 'true');
    localStorage.setItem('transBoxDetails', 'false');
    localStorage.setItem('transBatchDetails', 'false');
    localStorage.setItem('transGRNTerms', 'false');
    localStorage.setItem('transInvoiceTerms', 'false');
    localStorage.setItem('transWorkCompletionDetails', 'false');
    localStorage.setItem('showCurrency', 'false');
    localStorage.setItem('showLedger', 'false');
    localStorage.setItem('showSupplier', 'true');
    localStorage.setItem('transationLinkRef', 'false');
  }

  getTransactionList() {
    this.transactionSerivices.getTransactionList(3).subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.grnList = res.data;
          console.log(this.grnList);
        }
      }
    });
  }

  addNote() {
    this.router.navigate(['/stores/addEditStore']);
    localStorage.setItem('transactionID', '0');
    console.log('========', this.router.url);
    debugger;
  }

  editNote(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/stores/addEditStore']);
  }

}
