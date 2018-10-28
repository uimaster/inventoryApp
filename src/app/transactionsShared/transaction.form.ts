import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PurchaseService } from '../purchase/purchase.service';
import { StockService } from '../masters/stock/services/stock.service';
import { LedgerService } from '../masters/ledger/services/ledger.service';
import { TransactionSerivices } from './transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction.form.html',
  styleUrls: ['./transaction.form.scss']
})

export class TransactionFormComponent implements OnInit {
  public transactionForm: any;
  public showError =  false;
  public showSuccess = false;
  public successMsg = '';
  public errorMsg = '';
  public companyId = localStorage.getItem('companyID');
  public userId = localStorage.getItem('userID');
  public transactionId = localStorage.getItem('transactionID');
  public detailsData = {} ;
  public ItemData = [];
  public ledgerData = [];
  public POData = [];
  public currencyList = [];
  public itemMasterList = [];
  public locationList = [];
  public ledgerList = [];

  public boxDetailData = [];
  public batchDetailData = [];
  public GRNTermsData = [];
  public invoiceTermData = [];
  public workCompletionData = [];
  transItemDetails: boolean;
  transLedgerDetails: boolean;
  transPOTerms: boolean;
  transBoxDetails: boolean;
  transBatchDetails: boolean;
  transGRNTerms: boolean;
  transInvoiceTerms: boolean;
  transWorkCompletionDetails: boolean;

  date3 = new Date();
  date5 = new Date();
  date4 = new Date();

  constructor(
    private fb: FormBuilder,
    private poService: PurchaseService,
    private stockService: StockService,
    private ledgerService: LedgerService,
    private trasactionService: TransactionSerivices,
    private router: Router
  )  {this.createTransactionForm(); }

  ngOnInit() {
    this.getTrasactionDetails(this.transactionId);
    this.getCurrency();
    this.getItemMasterList();
    this.getLocation();
    this.getLedgers();

    this.transItemDetails = JSON.parse(localStorage.getItem('transItemDetails'));
    this.transLedgerDetails = JSON.parse(localStorage.getItem('transLedgerDetails'));
    this.transPOTerms = JSON.parse(localStorage.getItem('transPOTerms'));
    this.transBoxDetails = JSON.parse(localStorage.getItem('transBoxDetails'));
    this.transBatchDetails = JSON.parse(localStorage.getItem('transBatchDetails'));
    this.transGRNTerms = JSON.parse(localStorage.getItem('transGRNTerms'));
    this.transInvoiceTerms = JSON.parse(localStorage.getItem('transInvoiceTerms'));
    this.transWorkCompletionDetails = JSON.parse(localStorage.getItem('transWorkCompletionDetails'));
  }
  createTransactionForm() {
    this.transactionForm = this.fb.group ({
      transactionID: [0],
      transactionDate: [],
      transactionNo: [''],
      transactionTypeId: [1],
      transactionSeriesID: [1],
      ledgerID: [1],
      transactionLinkID: [0],
      transactionLinkRef: [''],
      companyID: [JSON.parse(this.companyId)],
      locationID: [1],
      transaction_Remarks: [''],
      transaction_Amount: [0],
      transaction_PendingAmount: [0],
      currencyID: [1],
      transactionDueDate: [''],
      userID: [JSON.parse(this.userId)],
      transItemDetails: this.fb.array([this.createItemDetails()]),
      transLedgerDetails: this.fb.array([this.createLedgerDetails()]),
      transBoxDetails: this.fb.array([this.createBoxDetails()]),
      transBatchDetails: this.fb.array([this.createBatchDetails()]),
      transGRNTerms: this.fb.array([this.createGRNTerms()]),
      transPOTerms: this.fb.array([this.createPOTerms()]),
      transInvoiceTerms: this.fb.array([this.createInvoiceTerms()]),
      transWorkCompletionDetails: this.fb.array([this.createWorkCompletionDetails()])
    });
  }

  createBoxDetails() {
    return this.fb.group({
      stockitemID: [1],
      itemQty: [0],
      itemRate: [0],
      itemAmount: [0],
      transactionBoxSerialNo: [0],
      boxPosition: [0],
      SCHREF: [0]
    });
  }

  get transactionBoxSerialNo() {
    return this.transactionForm.get(['transBoxDetails'], 0, ['transactionBoxSerialNo']);
  }
  get boxPosition() {
    return this.transactionForm.get(['transBoxDetails'], 0, ['boxPosition']);
  }
  get SCHREF() {
    return this.transactionForm.get(['transBoxDetails'], 0, ['SCHREF']);
  }

  createBatchDetails() {
    return this.fb.group({
      batchNo: [0],
      batchID: [0]
    });
  }

  get batchNo() {
    return this.transactionForm.get(['transBatchDetails'], 0, ['batchNo']);
  }
  get batchID() {
    return this.transactionForm.get(['transBatchDetails'], 0, ['batchID']);
  }

  createGRNTerms() {
    return this.fb.group({
      inwardNo: [1],
      inwardDate: [0],
      transporter : [0],
      dcNo: [0],
      dcDate: [0],
      invoiceNo: [0],
      invoiceDate: [0]
    });
  }
  get inwardNo() {
    return this.transactionForm.get(['transGRNTerms'], 0, ['inwardNo']);
  }
  get batcInwardDatehID() {
    return this.transactionForm.get(['transGRNTerms'], 0, ['inwardDate']);
  }
  get transporter() {
    return this.transactionForm.get(['transGRNTerms'], 0, ['transporter']);
  }
  get dcNo() {
    return this.transactionForm.get(['transGRNTerms'], 0, ['dcNo']);
  }
  get dcDate() {
    return this.transactionForm.get(['transGRNTerms'], 0, ['dcDate']);
  }
  get invoiceNo() {
    return this.transactionForm.get(['transGRNTerms'], 0, ['invoiceNo']);
  }
  get invoiceDate() {
    return this.transactionForm.get(['transGRNTerms'], 0, ['invoiceDate']);
  }

  createInvoiceTerms() {
    return this.fb.group({
      transporterLedgerID: [1],
      transporterLRNO: [0],
      transporterLRDate: [0],
      transporterGSTIN: [0],
      GSTEwayBillNo: [0],
      GSTEWayBillDate: [0]
    });
  }
  get transporterLedgerID() {
    return this.transactionForm.get(['transInvoiceTerms'], 0, ['transporterLedgerID']);
  }
  get transporterLRNO() {
    return this.transactionForm.get(['transInvoiceTerms'], 0, ['transporterLRNO']);
  }
  get transporterLRDate() {
    return this.transactionForm.get(['transInvoiceTerms'], 0, ['transporterLRDate']);
  }
  get transporterGSTIN() {
    return this.transactionForm.get(['transInvoiceTerms'], 0, ['transporterGSTIN']);
  }
  get GSTEwayBillNo() {
    return this.transactionForm.get(['transInvoiceTerms'], 0, ['GSTEwayBillNo']);
  }
  get GSTEWayBillDate() {
    return this.transactionForm.get(['transInvoiceTerms'], 0, ['GSTEWayBillDate']);
  }

  createWorkCompletionDetails() {
    return this.fb.group({
      jobCompletionDate: [1],
      departmentName: [0],
      transctionJobWorkRemarks: [0],
      location: [0],
      billAmount: [0],
      materialAmount: [0],
      labourAmount: [0]
    });
  }
  get jobCompletionDate() {
    return this.transactionForm.get(['transWorkCompletionDetails'], 0, ['jobCompletionDate']);
  }
  get departmentName() {
    return this.transactionForm.get(['transWorkCompletionDetails'], 0, ['departmentName']);
  }
  get transctionJobWorkRemarks() {
    return this.transactionForm.get(['transWorkCompletionDetails'], 0, ['transctionJobWorkRemarks']);
  }
  get location() {
    return this.transactionForm.get(['transWorkCompletionDetails'], 0, ['location']);
  }
  get billAmount() {
    return this.transactionForm.get(['transWorkCompletionDetails'], 0, ['billAmount']);
  }
  get materialAmount() {
    return this.transactionForm.get(['transWorkCompletionDetails'], 0, ['materialAmount']);
  }
  get labourAmount() {
    return this.transactionForm.get(['transWorkCompletionDetails'], 0, ['labourAmount']);
  }


  get transactionID() {
    return this.transactionForm.get('transactionID');
  }
  get transactionDate() {
    return this.transactionForm.get('transactionDate');
  }
  get transactionNo() {
    return this.transactionForm.get('transactionNo');
  }
  get ledgerID() {
    return this.transactionForm.get('ledgerID');
  }
  get transaction_Amount() {
    return this.transactionForm.get('transaction_Amount');
  }
  get transaction_PendingAmount() {
    return this.transactionForm.get('transaction_PendingAmount');
  }
  get currencyID() {
    return this.transactionForm.get('currencyID');
  }
  get transactionDueDate() {
    return this.transactionForm.get('transactionDueDate');
  }
  createItemDetails() {
    return this.fb.group({
      transactionID: [0],
      stockitemID: [1],
      transactionItem_AdditionalDesciption: [''],
      locationID: [1],
      itemQty: [0],
      itemReceived_Qty: [0],
      itemChallan_Qty: [0],
      itemPending_Qty: [0],
      itemRate: [0],
      itemAmount: [0],
      itemStops: [0],
      itemLength: [0],
      itemBatchApplicable: [0],
      packingBoxStockItemID: [0],
      transactionItemSerialNo: [0]
    });
  }

  addItemDetails() {
    const stockItemArray = <FormArray>this.transactionForm.get('transItemDetails');
    stockItemArray.push(
      this.fb.group({
        transactionID: [1],
        stockitemID: [1],
        transactionItem_AdditionalDesciption: [],
        locationID: [1],
        itemQty: [0],
        itemReceived_Qty: [0],
        itemChallan_Qty: [0],
        itemPending_Qty: [0],
        itemRate: [0],
        itemAmount: [0],
        itemStops: [0],
        itemLength: [0],
        itemBatchApplicable: [0],
        packingBoxStockItemID: [0],
        transactionItemSerialNo: [0]
      })
    );
  }

  deleteItemDetails(index) {
    const stockItemArray = <FormArray>this.transactionForm.get('transItemDetails');
    stockItemArray.removeAt(index);
  }


  get stockitemID() {
    return this.transactionForm.get(['transItemDetails'], 0, ['stockitemID']);
  }
  get transactionItem_AdditionalDesciption() {
    return this.transactionForm.get(['transItemDetails'], 0, ['transactionItem_AdditionalDesciption']);
  }
  get itemQty() {
    return this.transactionForm.get(['transItemDetails'], 0, ['itemQty']);
  }

  get itemRate() {
    return this.transactionForm.get(['transItemDetails'], 0, ['itemRate']);
  }
  get itemAmount() {
    return this.transactionForm.get(['transItemDetails'], 0, ['itemAmount']);
  }

  createLedgerDetails() {
    return this.fb.group ({
      transactionID: [0],
      ledgerID: [1],
      taxRate: [1],
      ledgerAmount: [0]
    });
  }

  addItemLedger() {
    const ledgerArray = <FormArray>this.transactionForm.get('transLedgerDetails');
    ledgerArray.push(
      this.fb.group ({
        transactionID: [0],
        ledgerID: [0],
        taxRate: [0],
        ledgerAmount: [0]
      })
    );
  }
  deleteItemLedger(index) {
    const ledgerArray = <FormArray>this.transactionForm.get('transLedgerDetails');
    ledgerArray.removeAt(index);
  }

  get taxRate() {
    return this.transactionForm.get(['transLedgerDetails'], 0, ['taxRate']);
  }
  get ledgerAmount() {
    return this.transactionForm.get(['transLedgerDetails'], 0, ['ledgerAmount']);
  }

  createPOTerms() {
    return this.fb.group({
      transactionDueDate : [''],
      transactionTransporter : [''],
      transctionSupplierRef : [''],
      transactionDeilveryTerms : [''],
      transactionPaymentTerms : [''],
      transactionPackingTerms : [''],
      transactionFreightTerms : [''],
    });
  }
  get transactionTransporter() {
    return this.transactionForm.get(['transPOTerms'], 0, ['transactionTransporter']);
  }
  get transctionSupplierRef() {
    return this.transactionForm.get(['transPOTerms'], 0, ['transctionSupplierRef']);
  }
  get transactionDeilveryTerms() {
    return this.transactionForm.get(['transPOTerms'], 0, ['transactionDeilveryTerms']);
  }
  get transactionPaymentTerms() {
    return this.transactionForm.get(['transPOTerms'], 0, ['transactionPaymentTerms']);
  }
  get transactionPackingTerms() {
    return this.transactionForm.get(['transPOTerms'], 0, ['transactionPackingTerms']);
  }
  get transactionFreightTerms() {
    return this.transactionForm.get(['transPOTerms'], 0, ['transactionFreightTerms']);
  }

  convertToDateFormat(Datestr) {
    if (Datestr != '') {
      // Datestr='03/08/2016'
      var datedata = Datestr.split('/');
      var formatedDateString =
        datedata[2] + '-' + datedata[1] + '-' + datedata[0] + 'T00:00:00.000Z';
      return formatedDateString;
    }
  }

  getTrasactionDetails(id) {
    if(id > 0) {
    this.trasactionService.getTransactionDetails(id).subscribe( res => {
      if (res) {
        if (res.status === '200') {
          this.detailsData = res.data;
          console.log('purchaseDetails:', this.detailsData);
          if (this.detailsData[0].length > 0) {
            this.transactionForm.controls['transactionID'].setValue(this.detailsData[0].transactionID);
            this.transactionForm.controls['transactionDate'].setValue(this.detailsData[0].transactionDate);
            this.transactionForm.controls['transactionNo'].setValue(this.detailsData[0].transactionNo);
            this.transactionForm.controls['transactionTypeId'].setValue(this.detailsData[0].transactionTypeId);
            this.transactionForm.controls['transactionSeriesID'].setValue(this.detailsData[0].transactionSeriesID);
            this.transactionForm.controls['ledgerID'].setValue(this.detailsData[0].ledgerID);
            this.transactionForm.controls['transactionLinkID'].setValue(this.detailsData[0].transactionLinkID);
            this.transactionForm.controls['transactionLinkRef'].setValue(this.detailsData[0].transactionLinkRef);
            this.transactionForm.controls['companyID'].setValue(this.detailsData[0].companyID);
            this.transactionForm.controls['locationID'].setValue(this.detailsData[0].locationID);
            this.transactionForm.controls['transaction_Remarks'].setValue(this.detailsData[0].transaction_Remarks);
            this.transactionForm.controls['transaction_Amount'].setValue(this.detailsData[0].transaction_Amount);
            this.transactionForm.controls['transaction_PendingAmount'].setValue(this.detailsData[0].transaction_PendingAmount);
            this.transactionForm.controls['currencyID'].setValue(this.detailsData[0].currencyID);
            this.transactionForm.controls['transactionDueDate'].setValue(this.detailsData[0].transactionDueDate);
          }

          if (this.detailsData[0].transItemDetails.length > 0) {
            this.ItemData = this.detailsData[0].transItemDetails;
            const controlArray = <FormArray>this.transactionForm.get('transItemDetails');

            controlArray.controls[0].get('transactionID').setValue(this.ItemData[0].transactionID);
            controlArray.controls[0].get('stockitemID').setValue(this.ItemData[0].stockitemID);
            controlArray.controls[0].get('transactionItem_AdditionalDesciption')
            .setValue(this.ItemData[0].transactionItem_AdditionalDesciption);
            controlArray.controls[0].get('itemQty').setValue(this.ItemData[0].itemQty);
            controlArray.controls[0].get('itemReceived_Qty').setValue(this.ItemData[0].itemReceived_Qty);
            controlArray.controls[0].get('itemChallan_Qty').setValue(this.ItemData[0].itemChallan_Qty);
            controlArray.controls[0].get('itemPending_Qty').setValue(this.ItemData[0].itemPending_Qty);
            controlArray.controls[0].get('itemRate').setValue(this.ItemData[0].itemRate);
            controlArray.controls[0].get('itemAmount').setValue(this.ItemData[0].itemAmount);
            controlArray.controls[0].get('itemStops').setValue(this.ItemData[0].itemStops);
            controlArray.controls[0].get('itemLength').setValue(this.ItemData[0].itemLength);
            controlArray.controls[0].get('itemBatchApplicable').setValue(this.ItemData[0].itemBatchApplicable);
            controlArray.controls[0].get('packingBoxStockItemID').setValue(this.ItemData[0].packingBoxStockItemID);
            controlArray.controls[0].get('transactionItemSerialNo').setValue(this.ItemData[0].transactionItemSerialNo);
            controlArray.controls[0].get('locationID').setValue(this.ItemData[0].locationID);
          }
          if (this.detailsData[0].transPOTerms.length > 0) {
            this.POData = this.detailsData[0].transPOTerms;
            const controlArray = <FormArray>this.transactionForm.get('transPOTerms');
            controlArray.controls[0].get('transactionDeilveryTerms').setValue(this.POData[0].transactionDeilveryTerms);
            controlArray.controls[0].get('transactionTransporter').setValue(this.POData[0].transactionTransporter);
            controlArray.controls[0].get('transctionSupplierRef').setValue(this.POData[0].transctionSupplierRef);
            controlArray.controls[0].get('transactionPackingTerms').setValue(this.POData[0].transactionPackingTerms);
            controlArray.controls[0].get('transactionPaymentTerms').setValue(this.POData[0].transactionPaymentTerms);
            controlArray.controls[0].get('transactionFreightTerms').setValue(this.POData[0].transactionFreightTerms);
            // var dueDate = this.convertToDateFormat(this.POData[0].transactionDueDate);
            // controlArray.controls[0].get('transactionDueDate').setValue(dueDate);
          }
          if (this.detailsData[0].transLedgerDetails.length > 0) {
            this.ledgerData = this.detailsData[0].transLedgerDetails;
            const controlArray = <FormArray>this.transactionForm.get('transLedgerDetails');

            controlArray.controls[0].get('transactionID').setValue(this.ledgerData[0].transactionID);
            controlArray.controls[0].get('ledgerID').setValue(this.ledgerData[0].ledgerID);
            controlArray.controls[0].get('taxRate').setValue(this.ledgerData[0].taxRate);
            controlArray.controls[0].get('ledgerAmount').setValue(this.ledgerData[0].ledgerAmount);
          }




          if (this.detailsData[0].transBoxDetails.length > 0) {
            this.boxDetailData = this.detailsData[0].transBoxDetails;
            const controlArray = <FormArray>this.transactionForm.get('transBoxDetails');

            controlArray.controls[0].get('stockitemID').setValue(this.boxDetailData[0].stockitemID);
            controlArray.controls[0].get('itemQty').setValue(this.boxDetailData[0].itemQty);
            controlArray.controls[0].get('itemRate').setValue(this.boxDetailData[0].itemRate);
            controlArray.controls[0].get('itemAmount').setValue(this.boxDetailData[0].itemAmount);
            controlArray.controls[0].get('transactionBoxSerialNo').setValue(this.boxDetailData[0].transactionBoxSerialNo);
            controlArray.controls[0].get('boxPosition').setValue(this.boxDetailData[0].boxPosition);
            controlArray.controls[0].get('SCHREF').setValue(this.boxDetailData[0].SCHREF);
          }

          if (this.detailsData[0].transBatchDetails.length > 0) {
            this.batchDetailData = this.detailsData[0].transBatchDetails;
            const controlArray = <FormArray>this.transactionForm.get('transBatchDetails');

            controlArray.controls[0].get('batchNo').setValue(this.batchDetailData[0].batchNo);
            controlArray.controls[0].get('batchID').setValue(this.batchDetailData[0].batchID);
          }

          if (this.detailsData[0].transGRNTerms.length > 0) {
            this.GRNTermsData = this.detailsData[0].transGRNTerms;
            const controlArray = <FormArray>this.transactionForm.get('transGRNTerms');

            controlArray.controls[0].get('inwardNo').setValue(this.GRNTermsData[0].inwardNo);
            controlArray.controls[0].get('transporter').setValue(this.GRNTermsData[0].transporter);
            controlArray.controls[0].get('dcNo').setValue(this.GRNTermsData[0].dcNo);
            controlArray.controls[0].get('dcDate').setValue(this.GRNTermsData[0].dcDate);
            controlArray.controls[0].get('invoiceNo').setValue(this.GRNTermsData[0].invoiceNo);
            controlArray.controls[0].get('invoiceDate').setValue(this.GRNTermsData[0].invoiceDate);
            controlArray.controls[0].get('inwardDate').setValue(this.GRNTermsData[0].inwardDate);
          }

          if (this.detailsData[0].transInvoiceTerms.length > 0) {
            this.invoiceTermData = this.detailsData[0].transInvoiceTerms;
            const controlArray = <FormArray>this.transactionForm.get('transInvoiceTerms');

            controlArray.controls[0].get('transporterLedgerID').setValue(this.invoiceTermData[0].transporterLedgerID);
            controlArray.controls[0].get('transporterLRNO').setValue(this.invoiceTermData[0].transporterLRNO);
            controlArray.controls[0].get('transporterLRDate').setValue(this.invoiceTermData[0].transporterLRDate);
            controlArray.controls[0].get('transporterGSTIN').setValue(this.invoiceTermData[0].transporterGSTIN);
            controlArray.controls[0].get('GSTEwayBillNo').setValue(this.invoiceTermData[0].GSTEwayBillNo);
            controlArray.controls[0].get('GSTEWayBillDate').setValue(this.invoiceTermData[0].GSTEWayBillDate);
          }

          if (this.detailsData[0].transWorkCompletionDetails.length > 0) {
            this.workCompletionData = this.detailsData[0].transWorkCompletionDetails;
            const controlArray = <FormArray>this.transactionForm.get('transWorkCompletionDetails');

            controlArray.controls[0].get('jobCompletionDate').setValue(this.workCompletionData[0].jobCompletionDate);
            controlArray.controls[0].get('departmentName').setValue(this.workCompletionData[0].departmentName);
            controlArray.controls[0].get('transctionJobWorkRemarks').setValue(this.workCompletionData[0].transctionJobWorkRemarks);
            controlArray.controls[0].get('location').setValue(this.workCompletionData[0].location);
            controlArray.controls[0].get('bllAmount').setValue(this.workCompletionData[0].billAmount);
            controlArray.controls[0].get('materialAmount').setValue(this.workCompletionData[0].materialAmount);
            controlArray.controls[0].get('labourAmount').setValue(this.workCompletionData[0].labourAmount);
          }

        }
      }
    });
    }
  }


  saveTransation(formData) {
    if (this.transactionForm.valid) {
      this.trasactionService.AddTransaction(formData).subscribe (
        res => {
          if (res && res.status === '200') {
            this.successMsg = res.message;
            this.showSuccess = true;
            setTimeout(() => {
              this.router.navigate(['/purchaseOrder']);
            }, 3000);
          } else {
            this.errorMsg = res.message;
            this.showError = true;
            setTimeout(() => {
              this.router.navigate(['/purchaseOrder']);
            }, 3000);
          }
        }
      );
    }
  }

  getCurrency() {
    this.poService.getCurrency().subscribe( res => {
      if (res && res.status === '200') {
        this.currencyList = res.data;
      }
    });
  }

  getItemMasterList() {
    this.stockService.getAllStocks().subscribe( res => {
      if (res && res.status === '200') {
        this.itemMasterList = res.data;
      }
    });
  }

  getLocation() {
    this.stockService.getLocation().subscribe( res => {
      if (res && res.status === '200') {
        this.locationList = res.data;
      }
    });
  }

  getLedgers() {
    this.ledgerService.getAllLedgers().subscribe( res => {
      if (res && res.status === '200') {
        this.ledgerList = res.data;
      }
    });
  }
}
