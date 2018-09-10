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
  companyId = localStorage.getItem('companyID');
  userId = localStorage.getItem('userID');
  resData = {} ;
  ItemData = [];
  ledgerData = [];
  POData = [];
  constructor(
    private fb: FormBuilder,
    private poService: PurchaseService
  )  {this.createPurchaseOrder(); }

  ngOnInit() {
    this.getPurchaseList();
  }

  getPurchaseList() {
    this.poService.getPurchaseList().subscribe( res => {
      if (res) {
        if (res.status === '200') {
          this.resData = res.data;
          console.log(this.resData);
          // if(this.resData.transItemDetails.length > 0) {
          //   this.ItemData = this.resData.transItemDetails;
          // }
          // if(this.resData.transLedgerDetails.length > 0) {
          //   this.ItemData = this.resData.transLedgerDetails;
          // }
          // if(this.resData.transPOTerms.length > 0) {
          //   this.ItemData = this.resData.transPOTerms;
          // }
        }
      }
    });
  }

  createPurchaseOrder() {
    this.purchaseOrderForm = this.fb.group ({
      transactionID: [0],
      transactionDate: [''],
      transactionNo: [''],
      transactionTypeId: [0],
      transactionSeriesID: [0],
      transactionSerialNo: [0],
      ledgerID: [0],
      transactionLinkID: [0],
      transactionLinkRef: [''],
      companyID: [JSON.parse(this.companyId)],
      locationID: [0],
      transaction_Remarks: [''],
      transaction_Amount: [0],
      transaction_PendingAmount: [0],
      currencyID: [0],
      transactionDueDate: [''],
      userID: [JSON.parse(this.userId)],
      transItemDetails: this.fb.array([this.createItemDetails()]),
      transLedgerDetails: this.fb.array([this.createLedgerDetails()]),
      transBoxDetails: this.fb.array([]),
      transPOTerms: this.fb.array([this.createPOTerms()]),
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
      stockitemID: [0],
      transactionItem_AdditionalDesciption: [0],
      locationID: [0],
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
        transactionID: [0],
        stockitemID: [0],
        transactionItem_AdditionalDesciption: [0],
        locationID: [0],
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
    )
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
      ledgerID: [0],
      taxRate: [0],
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

  SavePurchaseOrder(formData) {
    if (this.purchaseOrderForm.valid) {
      this.poService.addPurchaseOrder(formData).subscribe (
        res => {
          if (res && res.status === 200) {
            alert(res.message);
          } else {
            alert(res.message);
          }
        }
      );
    }
  }
}
