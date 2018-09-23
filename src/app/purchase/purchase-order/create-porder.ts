import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './create-porder.html',
  styleUrls: ['./purchase-order.scss']
})

export class CreatePOrderComponent implements OnInit {
  public purchaseOrderForm: any;
  showError =  false;
  showSuccess = false;
  successMsg = '';
  errorMsg = '';
  companyId = localStorage.getItem('companyID');
  userId = localStorage.getItem('userID');
  transactionId = localStorage.getItem('transactionID');
  detailsData = {} ;
  ItemData = [];
  ledgerData = [];
  POData = [];
  constructor(
    private fb: FormBuilder,
    private poService: PurchaseService
  )  {this.createPurchaseOrder(); }

  ngOnInit() {
    this.getPurchaseDetails(this.transactionId);
  }
  createPurchaseOrder() {
    this.purchaseOrderForm = this.fb.group ({
      transactionID: [0],
      transactionDate: [''],
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
      transBoxDetails: this.fb.array([]),
      transBatchDetails: this.fb.array([]),
      transGRNTerms: this.fb.array([]),
      transPOTerms: this.fb.array([this.createPOTerms()]),
      transInvoiceTerms: this.fb.array([]),
      transWorkCompletionDetails: this.fb.array([])
    });
  }

  get transactionID() {
    return this.purchaseOrderForm.get('transactionID');
  }
  get transactionDate() {
    return this.purchaseOrderForm.get('transactionDate');
  }
  get transactionNo() {
    return this.purchaseOrderForm.get('transactionNo');
  }
  get ledgerID() {
    return this.purchaseOrderForm.get('ledgerID');
  }
  get transaction_Amount() {
    return this.purchaseOrderForm.get('transaction_Amount');
  }
  get transaction_PendingAmount() {
    return this.purchaseOrderForm.get('transaction_PendingAmount');
  }
  get currencyID() {
    return this.purchaseOrderForm.get('currencyID');
  }
  get transactionDueDate() {
    return this.purchaseOrderForm.get('transactionDueDate');
  }
  createItemDetails() {
    return this.fb.group({
      transactionID: [0],
      stockitemID: [1],
      transactionItem_AdditionalDesciption: [0],
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
    const stockItemArray = <FormArray>this.purchaseOrderForm.get('transItemDetails');
    stockItemArray.push(
      this.fb.group({
        transactionID: [1],
        stockitemID: [1],
        transactionItem_AdditionalDesciption: [0],
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
    const stockItemArray = <FormArray>this.purchaseOrderForm.get('transItemDetails');
    stockItemArray.removeAt(index);
  }


  get stockitemID() {
    return this.purchaseOrderForm.get(['transItemDetails'], 0, ['stockitemID']);
  }
  get transactionItem_AdditionalDesciption() {
    return this.purchaseOrderForm.get(['transItemDetails'], 0, ['transactionItem_AdditionalDesciption']);
  }
  get itemQty() {
    return this.purchaseOrderForm.get(['transItemDetails'], 0, ['itemQty']);
  }

  get itemRate() {
    return this.purchaseOrderForm.get(['transItemDetails'], 0, ['itemRate']);
  }
  get itemAmount() {
    return this.purchaseOrderForm.get(['transItemDetails'], 0, ['itemAmount']);
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
    const ledgerArray = <FormArray>this.purchaseOrderForm.get('transLedgerDetails');
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
    const ledgerArray = <FormArray>this.purchaseOrderForm.get('transLedgerDetails');
    ledgerArray.removeAt(index);
  }

  get taxRate() {
    return this.purchaseOrderForm.get(['transLedgerDetails'], 0, ['taxRate']);
  }
  get ledgerAmount() {
    return this.purchaseOrderForm.get(['transLedgerDetails'], 0, ['ledgerAmount']);
  }

  createPOTerms() {
    return this.fb.group({
      TransactionDueDate : [''],
      TransactionTransporter : [''],
      TransctionSupplierRef : [''],
      TransactionDeilveryTerms : [''],
      TransactionPaymentTerms : [''],
      TransactionPackingTerms : [''],
      TransactionFreightTerms : [''],
    });
  }

  get TransactionDueDate() {
    return this.purchaseOrderForm.get(['transPOTerms'], 0, ['TransactionDueDate']);
  }
  get TransactionTransporter() {
    return this.purchaseOrderForm.get(['transPOTerms'], 0, ['TransactionTransporter']);
  }
  get TransctionSupplierRef() {
    return this.purchaseOrderForm.get(['transPOTerms'], 0, ['TransctionSupplierRef']);
  }
  get TransactionDeilveryTerms() {
    return this.purchaseOrderForm.get(['transPOTerms'], 0, ['TransactionDeilveryTerms']);
  }
  get TransactionPaymentTerms() {
    return this.purchaseOrderForm.get(['transPOTerms'], 0, ['TransactionPaymentTerms']);
  }
  get TransactionPackingTerms() {
    return this.purchaseOrderForm.get(['transPOTerms'], 0, ['TransactionPackingTerms']);
  }
  get TransactionFreightTerms() {
    return this.purchaseOrderForm.get(['transPOTerms'], 0, ['TransactionFreightTerms']);
  }

  getPurchaseDetails(id) {
    if(id > 0){
    this.poService.getPurchaseDetails(id).subscribe( res => {
      if (res) {
        if (res.status === '200') {
          this.detailsData = res.data;
          console.log('purchaseDetails:', this.detailsData);
          if (this.detailsData[0].length > 0) {
            this.purchaseOrderForm.controls['transactionID'].setValue(this.detailsData[0].transactionID);
            this.purchaseOrderForm.controls['transactionDate'].setValue(this.detailsData[0].transactionDate);
            this.purchaseOrderForm.controls['transactionNo'].setValue(this.detailsData[0].transactionNo);
            this.purchaseOrderForm.controls['transactionTypeId'].setValue(this.detailsData[0].transactionTypeId);
            this.purchaseOrderForm.controls['transactionSeriesID'].setValue(this.detailsData[0].transactionSeriesID);
            this.purchaseOrderForm.controls['ledgerID'].setValue(this.detailsData[0].ledgerID);
            this.purchaseOrderForm.controls['transactionLinkID'].setValue(this.detailsData[0].transactionLinkID);
            this.purchaseOrderForm.controls['transactionLinkRef'].setValue(this.detailsData[0].transactionLinkRef);
            this.purchaseOrderForm.controls['companyID'].setValue(this.detailsData[0].companyID);
            this.purchaseOrderForm.controls['locationID'].setValue(this.detailsData[0].locationID);
            this.purchaseOrderForm.controls['transaction_Remarks'].setValue(this.detailsData[0].transaction_Remarks);
            this.purchaseOrderForm.controls['transaction_Amount'].setValue(this.detailsData[0].transaction_Amount);
            this.purchaseOrderForm.controls['transaction_PendingAmount'].setValue(this.detailsData[0].transaction_PendingAmount);
            this.purchaseOrderForm.controls['currencyID'].setValue(this.detailsData[0].currencyID);
            this.purchaseOrderForm.controls['transactionDueDate'].setValue(this.detailsData[0].transactionDueDate);
          }

          if (this.detailsData[0].transItemDetails.length > 0) {
            this.ItemData = this.detailsData[0].transItemDetails;
            const controlArray = <FormArray>this.purchaseOrderForm.get('transItemDetails');

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
          if (this.detailsData[0].transLedgerDetails.length > 0) {
            this.ledgerData = this.detailsData[0].transLedgerDetails;
            const controlArray = <FormArray>this.purchaseOrderForm.get('transLedgerDetails');

            controlArray.controls[0].get('transactionID').setValue(this.ledgerData[0].transactionID);
            controlArray.controls[0].get('ledgerID').setValue(this.ledgerData[0].ledgerID);
            controlArray.controls[0].get('taxRate').setValue(this.ledgerData[0].taxRate);
            controlArray.controls[0].get('ledgerAmount').setValue(this.ledgerData[0].ledgerAmount);
          }
          if (this.detailsData[0].transPOTerms.length > 0) {
            this.POData = this.detailsData[0].transPOTerms;
            const controlArray = <FormArray>this.purchaseOrderForm.get('transPOTerms');

            controlArray.controls[0].get('TransactionDueDate').setValue(this.POData[0].TransactionDueDate);
            controlArray.controls[0].get('TransactionTransporter').setValue(this.POData[0].TransactionTransporter);
            controlArray.controls[0].get('TransctionSupplierRef').setValue(this.POData[0].TransctionSupplierRef);
            controlArray.controls[0].get('TransactionDeilveryTerms').setValue(this.POData[0].TransactionDeilveryTerms);
            controlArray.controls[0].get('TransactionPackingTerms').setValue(this.POData[0].TransactionPackingTerms);
            controlArray.controls[0].get('TransactionPaymentTerms').setValue(this.POData[0].TransactionPaymentTerms);
            controlArray.controls[0].get('TransactionFreightTerms').setValue(this.POData[0].TransactionFreightTerms);
          }
        }
      }
    });
    }  
  }


  SavePurchaseOrder(formData) {
    if (this.purchaseOrderForm.valid) {
      this.poService.addPurchaseOrder(formData).subscribe (
        res => {
          if (res && res.status === '200') {
            this.successMsg = res.message;
            this.showSuccess = true;
          } else {
            this.errorMsg = res.message;
            this.showError = true;
          }
        }
      );
    }
  }

}
