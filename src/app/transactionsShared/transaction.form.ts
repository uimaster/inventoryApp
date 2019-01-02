import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PurchaseService } from '../purchase/purchase.service';
import { StockService } from '../masters/stock/services/stock.service';
import { LedgerService } from '../masters/ledger/services/ledger.service';
import { TransactionSerivices } from './transaction.service';
import { SupplierService } from '../masters/supplier/services/supplier.service';
import { SelectItem } from 'primeng/primeng';
import { CustomerService } from '../masters/customer/services/customer.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction.form.html',
  styleUrls: ['./transaction.form.scss']
})

export class TransactionFormComponent implements OnInit, OnDestroy {
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
  public customerList = [];
  public salesOrderPendingList = [];
  public POpendingList = [];
  public transactionTypeSeriesList = [];
  public boxDetailData = [];
  public batchDetailData = [];
  public GRNTermsData = [];
  public invoiceTermData = [];
  public workCompletionData = [];
  public supplierList = [];
  transItemDetails = true;
  transLedgerDetails = true;
  transPOTerms = true;
  transBoxDetails = true;
  transBatchDetails = true;
  transGRNTerms = true;
  transInvoiceTerms = true;
  transWorkCompletionDetails = true;
  showCurrency = true;
  showLocation = true;
  totalAmount = 0;

  date3 = new Date();
  date5 = new Date();
  date4 = new Date();

  showSupplier = false;
  showLedger = true;
  transationLinkRef = false;
  transactionTypeId: number;
  gstTaxList = [];
  selectedCar3: any;
  selectedCity: any;
  showLoader = false;
  filteredItems = [];
  itemName: string;
  barcodeFields: boolean;
  showTransactionSeries: boolean;
  showPO: boolean;
  showBarcode: boolean;
  transationLinkRefInput: boolean;
  transationLinkRefNamePO: boolean;
  // @ViewChild('taxSelect') taxSelect: ElementRef;

  constructor(
    private fb: FormBuilder,
    private poService: PurchaseService,
    private stockService: StockService,
    private ledgerService: LedgerService,
    private trasactionService: TransactionSerivices,
    private supplierService: SupplierService,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.transItemDetails = JSON.parse(localStorage.getItem('transItemDetails'));
    this.transLedgerDetails = JSON.parse(localStorage.getItem('transLedgerDetails'));
    this.transPOTerms = JSON.parse(localStorage.getItem('transPOTerms'));
    this.transBoxDetails = JSON.parse(localStorage.getItem('transBoxDetails'));
    this.transBatchDetails = JSON.parse(localStorage.getItem('transBatchDetails'));
    this.transGRNTerms = JSON.parse(localStorage.getItem('transGRNTerms'));
    this.transInvoiceTerms = JSON.parse(localStorage.getItem('transInvoiceTerms'));
    this.transWorkCompletionDetails = JSON.parse(localStorage.getItem('transWorkCompletionDetails'));
    this.showCurrency = JSON.parse(localStorage.getItem('showCurrency'));

    this.showLedger = JSON.parse(localStorage.getItem('showLedger'));
    this.showSupplier = JSON.parse(localStorage.getItem('showSupplier'));
    this.transationLinkRef = JSON.parse(localStorage.getItem('transationLinkRef'));
    this.showLocation = JSON.parse(localStorage.getItem('showLocation'));
    this.transactionTypeId = JSON.parse(localStorage.getItem('transactionTypeId'));
    this.barcodeFields = JSON.parse(localStorage.getItem('barcodeFields'));
    this.showTransactionSeries = JSON.parse(localStorage.getItem('showTransactionSeries'));
    this.showPO = JSON.parse(localStorage.getItem('showPO'));
    this.showBarcode = JSON.parse(localStorage.getItem('showBarcode'));
    this.transationLinkRefInput = JSON.parse(localStorage.getItem('transationLinkRefInput'));
    this.transationLinkRefNamePO = JSON.parse(localStorage.getItem('transationLinkRefNamePO'));

    // setTimeout(() => {
      this.showLoader = true;
      this.getItemList();
      this.getCurrency();
      // this.getItemMasterList();
      this.getLocation();
      this.getLedgers();
      this.createTransactionForm();
      this.getSupplier();
      this.getGstRate();
      // this.getPendingSalesOrderList();
      this.getPOPendingList();
      this.getCustomers();
      this.getTransactionTypeSeries();
      setTimeout(() => {
        this.getTrasactionDetails(this.transactionId);
      }, 4000);

    // }, 0);

  }
  createTransactionForm() {
    this.transactionForm = this.fb.group ({
      transactionID: [0],
      transactionDate: [0],
      transactionNo: [''],
      transactionTypeId: [this.transactionTypeId],
      transactionSeriesID: [this.transactionTypeId],
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
    if (this.transBoxDetails) {
        return this.fb.group({
        stockitemID: [0],
        stockItemDesc: '',
        itemQty: [0],
        itemRate: [0],
        itemAmount: [0],
        transactionBoxSerialNo: [0],
        boxPosition: [0],
        SCHREF: [0]
      });
    } else {
      return this.fb.group([]);
    }
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
    if (this.transBatchDetails) {
      return this.fb.group({
        batchNo: [0],
        stockitemID: [0],
        batchID: [0]
      });
    } else {
      return this.fb.group([]);
    }
  }

  addBatch() {
    const stockItemArray = <FormArray>this.transactionForm.get('transBatchDetails');
    stockItemArray.push(
      this.fb.group({
        batchNo: [0],
        stockitemID: [0],
        batchID: [0]
      })
    );
  }

  removeBatch(index) {
    const stockItemArray = <FormArray>this.transactionForm.get('transBatchDetails');
    stockItemArray.removeAt(index);
  }

  get batchNo() {
    return this.transactionForm.get(['transBatchDetails'], 0, ['batchNo']);
  }
  get batchID() {
    return this.transactionForm.get(['transBatchDetails'], 0, ['batchID']);
  }

  createGRNTerms() {
    if (this.transGRNTerms) {
      return this.fb.group({
        inwardNo: [1],
        inwardDate: [0],
        transporter : [0],
        dcNo: [0],
        dcDate: [0],
        invoiceNo: [0],
        invoiceDate: [0]
      });
    } else {
      return this.fb.group([]);
    }
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
    if (this.transInvoiceTerms) {
      return this.fb.group({
        transporterLedgerID: [1],
        transporterLRNO: [0],
        transporterLRDate: [0],
        transporterGSTIN: [0],
        GSTEwayBillNo: [0],
        GSTEWayBillDate: [0]
      });
    } else {
      return this.fb.group([]);
    }
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
    if (this.transWorkCompletionDetails) {
      return this.fb.group({
        jobCompletionDate: [1],
        departmentName: [0],
        transctionJobWorkRemarks: [0],
        location: [0],
        billAmount: [0],
        materialAmount: [0],
        labourAmount: [0]
      });
    } else {
      return this.fb.group([]);
    }
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

  get transactionLinkID() {
    return this.transactionForm.get('transactionLinkID');
  }

  createItemDetails() {
    if (this.transItemDetails) {
      return this.fb.group({
        transactionID: [0],
        stockitemID: [0],
        transactionItem_AdditionalDesciption: [''],
        locationID: [1],
        stockItemDesc: '',
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
    } else {
      return this.fb.group([]);
    }
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
        stockItemDesc: [''],
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
    this.getAmount();
  }


  get stockitemID() {
    return this.transactionForm.get(['transItemDetails'], 0, ['stockitemID']);
  }

  get stockItemDesc() {
    return this.transactionForm.get(['transItemDetails'], 0, ['stockItemDesc']);
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
    if (this.transLedgerDetails) {
      return this.fb.group ({
        transactionID: [0],
        ledgerID: [1],
        taxRate: [0],
        ledgerAmount: [0]
      });
    } else {
      return this.fb.group([]);
    }
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
    if (this.transPOTerms) {
      return this.fb.group({
        transactionDueDate : [''],
        transactionTransporter : [''],
        transctionSupplierRef : [''],
        transactionDeilveryTerms : [''],
        transactionPaymentTerms : [''],
        transactionPackingTerms : [''],
        transactionFreightTerms : [''],
      });
    } else {
      return this.fb.group([]);
    }
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
      var datedata = Datestr.split('-');
      var formatedDateString =
        datedata[0] + '-' + datedata[1] + '-' + datedata[2];
        console.log(formatedDateString);
      return formatedDateString;
    }
  }

  getTrasactionDetails(id) {
    if (id > 0) {
    this.trasactionService.getTransactionDetails(id).subscribe( res => {

        if (res.status === '200') {
          this.detailsData = res.data;

          // if (this.detailsData[0].length > 0) {
            this.transactionForm.controls['transactionID'].setValue(this.detailsData[0].transactionID);
            this.transactionForm.controls['transactionDate'].setValue(this.convertToDateFormat(this.detailsData[0].transactionDate));
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
            this.totalAmount = this.detailsData[0].transaction_Amount;
         // }

          if (this.detailsData[0].transItemDetails.length > 0 && this.transItemDetails) {

            const formArray = <FormArray>this.transactionForm.get('transItemDetails');
            formArray.removeAt(0);

            for (let i = 0; i < this.detailsData[0].transItemDetails.length; i++) {
              formArray.push(
                this.fb.group ({
                  transactionID: [this.detailsData[0].transItemDetails[i].transactionID],
                  stockitemID: [this.detailsData[0].transItemDetails[i].stockitemID],
                  stockItemDesc: [this.detailsData[0].transItemDetails[i].stockItemDesc],
                  transactionItem_AdditionalDesciption: [this.detailsData[0].transItemDetails[i].transactionItem_AdditionalDesciption],
                  locationID: [1],
                  itemQty: [this.detailsData[0].transItemDetails[i].itemQty],
                  itemReceived_Qty: [this.detailsData[0].transItemDetails[i].itemReceived_Qty],
                  itemChallan_Qty: [this.detailsData[0].transItemDetails[i].itemChallan_Qty],
                  itemPending_Qty: [this.detailsData[0].transItemDetails[i].itemPending_Qty],
                  itemRate: [this.detailsData[0].transItemDetails[i].itemRate],
                  itemAmount: [this.detailsData[0].transItemDetails[i].itemAmount],
                  itemStops: [this.detailsData[0].transItemDetails[i].itemStops],
                  itemLength: [this.detailsData[0].transItemDetails[i].itemLength],
                  itemBatchApplicable: [this.detailsData[0].transItemDetails[i].itemBatchApplicable],
                  packingBoxStockItemID: [this.detailsData[0].transItemDetails[i].packingBoxStockItemID],
                  transactionItemSerialNo: [this.detailsData[0].transItemDetails[i].transactionItemSerialNo]
                })
              );

            }
          }
          if (this.detailsData[0].transPOTerms.length > 0 && this.transPOTerms) {
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
          if (this.detailsData[0].transLedgerDetails.length > 0 && this.transLedgerDetails) {
            const ledgerArray = <FormArray>this.transactionForm.get('transLedgerDetails');
            ledgerArray.removeAt(0);
            for (let i = 0; i < this.detailsData[0].transLedgerDetails.length; i++) {
              ledgerArray.push(
                this.fb.group ({
                  transactionID: [this.detailsData[0].transLedgerDetails[i].transactionID],
                  ledgerID: [this.detailsData[0].transLedgerDetails[i].ledgerID],
                  taxRate: [this.detailsData[0].transLedgerDetails[i].taxRate],
                  ledgerAmount: [this.detailsData[0].transLedgerDetails[i].ledgerAmount]
                })
              );
            }
          }




          if (this.detailsData[0].transBoxDetails.length > 0 && this.transBoxDetails) {
            this.boxDetailData = this.detailsData[0].transBoxDetails;
            const controlArray = <FormArray>this.transactionForm.get('transBoxDetails');

            controlArray.controls[0].get('stockitemID').setValue(this.boxDetailData[0].stockitemID);
            controlArray.controls[0].get('stockItemDesc').setValue(this.boxDetailData[0].stockItemDesc);
            controlArray.controls[0].get('itemQty').setValue(this.boxDetailData[0].itemQty);
            controlArray.controls[0].get('itemRate').setValue(this.boxDetailData[0].itemRate);
            controlArray.controls[0].get('itemAmount').setValue(this.boxDetailData[0].itemAmount);
            controlArray.controls[0].get('transactionBoxSerialNo').setValue(this.boxDetailData[0].transactionBoxSerialNo);
            controlArray.controls[0].get('boxPosition').setValue(this.boxDetailData[0].boxPosition);
            controlArray.controls[0].get('SCHREF').setValue(this.boxDetailData[0].SCHREF);
          }

          if (this.detailsData[0].transBatchDetails.length > 0 && this.transBatchDetails) {
            this.batchDetailData = this.detailsData[0].transBatchDetails;
            const controlArray = <FormArray>this.transactionForm.get('transBatchDetails');
            controlArray.controls[0].get('batchNo').setValue(this.batchDetailData[0].batchNo);
            controlArray.controls[0].get('stockitemID').setValue(this.batchDetailData[0].stockitemID);
            // controlArray.controls[0].get('stockItemDesc').setValue(this.batchDetailData[0].stockItemDesc);
            controlArray.controls[0].get('batchID').setValue(this.batchDetailData[0].batchID);
          }

          if (this.detailsData[0].transGRNTerms.length > 0 && this.transGRNTerms) {
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

          if (this.detailsData[0].transInvoiceTerms.length > 0 && this.transInvoiceTerms) {
            this.invoiceTermData = this.detailsData[0].transInvoiceTerms;
            const controlArray = <FormArray>this.transactionForm.get('transInvoiceTerms');

            controlArray.controls[0].get('transporterLedgerID').setValue(this.invoiceTermData[0].transporterLedgerID);
            controlArray.controls[0].get('transporterLRNO').setValue(this.invoiceTermData[0].transporterLRNO);
            controlArray.controls[0].get('transporterLRDate').setValue(this.invoiceTermData[0].transporterLRDate);
            controlArray.controls[0].get('transporterGSTIN').setValue(this.invoiceTermData[0].transporterGSTIN);
            controlArray.controls[0].get('GSTEwayBillNo').setValue(this.invoiceTermData[0].GSTEwayBillNo);
            controlArray.controls[0].get('GSTEWayBillDate').setValue(this.invoiceTermData[0].GSTEWayBillDate);
          }

          if (this.detailsData[0].transWorkCompletionDetails.length > 0 && this.transWorkCompletionDetails) {
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
        this.showLoader = false;
    });

    }
    this.showLoader = false;
  }


  saveTransation(formData) {
    if (this.transactionForm.valid) {
      this.showLoader = true;

      let tDate = formData.transactionDate;

      let dDate = new Date(tDate);
      let year = dDate.getFullYear();
      var month: any = dDate.getMonth() + 1;
      if(month < 10) {
        month = '0' + month;
      }
      var day: any = dDate.getDate();
      if(day < 10) {
        day = '0' + day;
      }
      let fDate = year + '-' + month + '-' + day;
      formData.transactionDate = fDate;

      this.trasactionService.AddTransaction(formData).subscribe (
        res => {
          if (res && res.status === '200') {
            this.successMsg = res.message;
            this.showSuccess = true;
            // localStorage.setItem('rollBackUrl', 'this.router.url');
            let rollBackUrl = localStorage.getItem('rollBackUrl');
            setTimeout(() => {
              this.router.navigate(['/' + rollBackUrl]);
            }, 3000);
          } else {
            this.errorMsg = res.message;
            this.showError = true;
            // setTimeout(() => {
            //   this.router.navigate(['/purchaseOrder']);
            // }, 3000);
            this.showLoader = false;
          }
        }
      );
    }
  }

  getCurrency() {
    this.poService.getCurrency().subscribe( res => {
      if (res && res.status === '200') {
        // this.currencyList = res.data;

        let data = res.data;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
              this.currencyList.push({label: data[key].currencyName, value: data[key].currencyID});
          }
        }
      }
    });
  }

  getSupplier() {
    this.supplierService.getAllSuppliers().subscribe( res => {
      if (res && res.status === '200') {
        // this.currencyList = res.data;

        let data = res.data;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            this.supplierList.push({label: data[key].supplierName, value: data[key].supplier_ID});
          }
        }
      }
    });


  }

  // getItemMasterList() {
  //   this.stockService.getAllStocks().subscribe( res => {
  //     if (res && res.status === '200') {
  //       // this.itemMasterList = res.data;
  //       let data = res.data;
  //       for (let key in data) {
  //         if (data.hasOwnProperty(key)) {
  //             this.itemMasterList.push({label: data[key].itemCode + ', ' + data[key].itemName, value: data[key].stockItemID});
  //         }
  //       }
  //     }

  //   });
  // }

  getItemList() {
    this.trasactionService.getItemList().subscribe( res => {
      let data = res.data;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
              this.itemMasterList.push({label: data[key].stockItemDesc, value: data[key].stockItemID});
          }
        }
    });
  }

  filterItems(event) {
      this.filteredItems = [];
      for (let i = 0; i < this.itemMasterList.length; i++) {
          let itemName = this.itemMasterList[i].label;
          if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
              this.filteredItems.push(itemName);
          }
      }
  }

  getSelectedVal(event, elem) {
    for ( var i = 0; i < this.itemMasterList.length; i++) {
      if (this.itemMasterList[i].label === event) {
        this.transactionForm.get(elem).controls[0].get('stockitemID').setValue(this.itemMasterList[i].value);
      }
    }
  }



  getLocation() {
    this.stockService.getLocation().subscribe( res => {
      if (res && res.status === '200') {
        // this.locationList = res.data;

        let data = res.data;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
              this.locationList.push({label: data[key].locationName, value: data[key].locationID});
          }
        }
      }
    });
  }

  getGstRate() {
    this.trasactionService.getTaxType().subscribe( res => {
      if (res && res.status === '200') {
        // this.ledgerList = res.data;

        let data = res.data;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
              this.gstTaxList.push({label: data[key].ledgerName, value: data[key].ledger_ID, rateofTax: data[key].rateofTax });
          }
        }
      }
    });
  }

  getLedgers() {
    this.ledgerService.getAllLedgers().subscribe( res => {
      if (res && res.status === '200') {
        // this.ledgerList = res.data;

        let data = res.data;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
              this.ledgerList.push({label: data[key].ledgerName, value: data[key].ledger_ID});
          }
        }
      }
    });
  }

  getCustomers() {
    this.customerService.getAllCustomers().subscribe( res => {
      if (res && res.status === '200') {
        // this.ledgerList = res.data;

        let data = res.data;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
              this.customerList.push({label: data[key].customerName, value: data[key].customer_ID});
          }
        }
      }
    });
  }

  getPOPendingList() {
    this.trasactionService.getPendingPOList().subscribe( res => {
      if (res && res.status === '200') {
        // this.ledgerList = res.data;

        let data = res.data;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
              this.POpendingList.push({label: data[key].transactionNo, value: data[key].transactionID});
          }
        }
      }
    });
  }

  // getPendingSalesOrderList() {
  //   this.trasactionService.getPendingSalesOrderList().subscribe( res => {
  //     if (res && res.status === '200') {
  //       // this.ledgerList = res.data;

  //       let data = res.data;
  //       for (let key in data) {
  //         if (data.hasOwnProperty(key)) {
  //             this.salesOrderPendingList.push({label: data[key].ledgerName, value: data[key].transactionID});
  //         }
  //       }
  //     }
  //   });
  // }

  getTaxRate(data, i) {
    const ledgerfrmArray = <FormArray>this.transactionForm.get('transLedgerDetails');
    ledgerfrmArray.controls[i].get('taxRate').setValue(data.selectedOption.rateofTax);
    this.getAmount();
  }



  // GET TOTAL AMOUNT //
  getAmount() {
    const itemfrmArray = <FormArray>this.transactionForm.get('transItemDetails');
    var itemTotalAmount = 0;

    for (let i = 0; i < itemfrmArray.length; i++) {
    const itemRate = itemfrmArray.controls[i].get('itemRate').value;
    const itemQnt = itemfrmArray.controls[i].get('itemQty').value;
    const itemAmount = itemRate * itemQnt;
    itemfrmArray.controls[i].get('itemAmount').setValue(itemAmount);
    itemTotalAmount = itemTotalAmount + itemAmount;
    }


    const ledgerfrmArray = <FormArray>this.transactionForm.get('transLedgerDetails');
    var ledgerAmnt = 0;
    var grantLedgerAmnt = 0;
    for (let i = 0; i < ledgerfrmArray.length; i++) {
    const taxRate = ledgerfrmArray.controls[i].get('taxRate').value;
    const onePercnt = itemTotalAmount / 100;
    ledgerAmnt = taxRate * onePercnt;
    ledgerfrmArray.controls[i].get('ledgerAmount').setValue(ledgerAmnt);
    grantLedgerAmnt = grantLedgerAmnt + ledgerAmnt;
    }
    this.totalAmount = itemTotalAmount + grantLedgerAmnt;
    this.transactionForm.controls['transaction_Amount'].setValue(this.totalAmount);

  }

  getSelectLinkRef(event) {
    if (event.value !== undefined ) {
      this.trasactionService.getTransactionDetails(event.value).subscribe( res => {
        if (res.status === '200') {
          this.detailsData = res.data;
          this.totalAmount = this.detailsData[0].transaction_Amount;
          this.transactionForm.controls['transaction_Amount'].setValue(this.detailsData[0].transaction_Amount);
          this.transactionForm.controls['ledgerID'].setValue(this.detailsData[0].ledgerID);
          if (this.detailsData[0].transItemDetails.length > 0 && this.transItemDetails) {
            this.ItemData = this.detailsData[0].transItemDetails;
            const controlArray = <FormArray>this.transactionForm.get('transItemDetails');
            for( var i = 0; i < this.ItemData.length; i++) {
              controlArray.push(
                this.fb.group({
                  transactionID: [this.ItemData[i].transactionID],
                  stockitemID: [this.ItemData[i].stockitemID],
                  stockItemDesc: [this.ItemData[i].stockItemDesc],
                  transactionItem_AdditionalDesciption: [this.ItemData[i].transactionItem_AdditionalDesciption],
                  itemQty: [this.ItemData[i].itemQty],
                  itemReceived_Qty: [this.ItemData[i].itemReceived_Qty],
                  itemChallan_Qty: [this.ItemData[i].itemChallan_Qty],
                  itemPending_Qty: [this.ItemData[i].itemPending_Qty],
                  itemRate: [this.ItemData[i].itemRate],
                  itemAmount: [this.ItemData[i].itemAmount],
                  itemStops: [this.ItemData[i].itemStops],
                  itemLength: [this.ItemData[i].itemLength],
                  itemBatchApplicable: [this.ItemData[i].itemBatchApplicable],
                  packingBoxStockItemID: [this.ItemData[i].packingBoxStockItemID],
                  transactionItemSerialNo: [this.ItemData[i].transactionItemSerialNo],
                  locationID: [this.ItemData[i].locationID]
                })
              );
            }

            if (controlArray.length > 0) {
              controlArray.removeAt(0);
            }
          }
          if (this.detailsData[0].transLedgerDetails.length > 0 && this.transLedgerDetails) {
            this.ledgerData = this.detailsData[0].transLedgerDetails;
            const controlArray = <FormArray>this.transactionForm.get('transLedgerDetails');
            for ( var i = 0; i < this.ledgerData.length; i++) {
              controlArray.push(
                this.fb.group({
                  transactionID: [this.ledgerData[i].transactionID],
                  ledgerID: [this.ledgerData[i].ledgerID],
                  taxRate: [this.ledgerData[i].taxRate],
                  ledgerAmount: [this.ledgerData[i].ledgerAmount],
                })
              );
            }
            if (controlArray.length > 0) {
              controlArray.removeAt(0);
            }
          }
        }
      });
    }
  }

  getBarcode(data) {
    var barcode = data.target.value.split('-');
    var inputItemCode;
    if (barcode !== 0 && barcode !== undefined) {
      inputItemCode = barcode[0].trim();
    }
    var stockItem = 0;
    var splitedStockItem = 0;
    const controlArray = <FormArray>this.transactionForm.get('transItemDetails');
    for( var i = 0; i < controlArray.length; i++) {
      let itemCode = controlArray.controls[i].get('stockItemDesc').value;
      if (itemCode !== 0 && itemCode !== undefined) {
        splitedStockItem = itemCode.split('|');
        stockItem = splitedStockItem[0].trim();
      }

      if (inputItemCode === stockItem) {
        let scanQty = controlArray.controls[i].get('itemReceived_Qty').value;
        let qty = controlArray.controls[i].get('itemQty').value;
        if (scanQty < qty) {
          scanQty += 1;
        } else {
          alert('Scanned quantity can not be greater quantity, Please try again.');
        }
        controlArray.controls[i].get('itemReceived_Qty').setValue(scanQty);
        if (barcode !== 0 && barcode !== undefined) {
          this.validateBatch(barcode[0].trim(), barcode[1].trim());
        }
      }
    }

  }

  validateBatch(itemcode, batchcode) {
    this.trasactionService.validateBatch(itemcode, batchcode).subscribe( res => {
      if (res.status === '200') {
        let data = res.data;
        const formArray = <FormArray>this.transactionForm.get('transBatchDetails');
          formArray.push(this.fb.group({
            batchNo: [data[0].batchno],
            stockitemID: [data[0].stockItemID],
            batchID: [data[0].batchid]
          }));
        if (formArray.controls[0].get('batchNo').value === 0) {
          formArray.removeAt(0);
        }
      }
    });
  }

  getTransactionTypeSeries() {
    this.trasactionService.getTransactionTypeSeries().subscribe( res => {
      if (res && res.status === '200') {
        let data = res.data;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            this.transactionTypeSeriesList.push({label: data[key].seriesName, value: data[key].transactionSeriesID});
          }
        }
      }
    });
    console.log('transactionTypeSeriesList', this.transactionTypeSeriesList);
  }

  ngOnDestroy() {
    localStorage.setItem('barcodeFields', 'false');
    localStorage.setItem('showTransactionSeries', 'false');
    localStorage.setItem('showPO', 'false');
    localStorage.setItem('showBarcode', 'false');
    localStorage.setItem('transationLinkRefInput', 'false');
    localStorage.setItem('transationLinkRefNamePO', 'false');

  }

}
