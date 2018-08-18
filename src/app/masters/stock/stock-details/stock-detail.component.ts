import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {StockService} from '../services/stock.service';
import {StockDetailResponse} from '../models/stock-detail.model';
import {LedgerResponse} from '../../ledger/models/ledger.model';
import {LedgerService} from '../../ledger/services/ledger.service';
import {UnitService} from '../../unit/services/unit.service';
import {UnitResponse} from '../../unit/models/unit.model';
import {StockResponse} from "../models/stock.model";

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit, OnDestroy {


  public stockItemId;
  public stockItemSubscription: Subscription;
  public stockGroupDataSubscription: Subscription;

  public ledgerDataSubscription: Subscription;
  public unitDataSubscription: Subscription;
  public stock;
  public sForm;
  public ledgerData;
  public unitData;
  public stockData;


  constructor( private stockService: StockService, private ledgerService: LedgerService, private unitService: UnitService,
     private _route: ActivatedRoute, private _formBuilder: FormBuilder, private router: Router) {
      this.stockForm();
     }

  ngOnInit() {

    this._route.params.subscribe((params) => {
      this.stockItemId = params.id;
     // this.getLedgerData();
        this.getStockData(this.stockItemId);
    });

      this.getLedgerData();
      this.getUnitData();



  }

  getStockData(stockId) {



    this.stockItemSubscription = this.stockService.getStock(stockId).subscribe((res: StockDetailResponse) => {
      this.stock = res.data[0];

        console.log(this.stock);


      if (this.stockItemId && this.stock) {

        this.sForm.controls['itemName'].setValue(this.stock['itemName']);

        this.sForm.controls['itemCode'].setValue(this.stock['itemCode']);

        this.sForm.controls['stockGroup_ID'].setValue(this.stock['stockGroup_ID']);

          this.sForm.controls['stockGroupName'].setValue(this.stock['stockGroupName']);

          this.sForm.controls['unit_ID'].setValue(this.stock['unit_ID']);

          this.sForm.controls['unitName'].setValue(this.stock['unitName']);

          this.sForm.controls['minimum_Order_Level'].setValue(this.stock['minimum_Order_Level']);

          this.sForm.controls['minimum_Order_Qty'].setValue(this.stock['minimum_Order_Qty']);


          this.sForm.controls['bufferQty'].setValue(this.stock['bufferQty']);

          this.sForm.controls['hsnCode'].setValue(this.stock['hsnCode']);

          this.sForm.controls['taxrate'].setValue(this.stock['taxrate']);

          this.sForm.controls['barcodeapplicable'].setValue(this.stock['barcodeapplicable']);

          this.sForm.controls['barcodelength'].setValue(this.stock['barcodelength']);

          this.sForm.controls['branchName'].setValue(this.stock['branchName']);

          this.sForm.controls['activeStatus'].setValue(this.stock['activeStatus']);

          this.sForm.controls['company_ID'].setValue(this.stock['company_ID']);

          this.sForm.controls['userID'].setValue(this.stock['userID']);

          this.sForm.controls['unit_ID'].setValue(this.stock['unit_ID']);

          this.sForm.controls['unitName'].setValue(this.stock['unitName']);



          const controlArray = <FormArray> this.sForm.get('stockItemOpeningBal');
          controlArray.controls[0].get('stockItemOPID').setValue(this.stock['stockItemOpeningBal'][0].stockItemOPID);
          controlArray.controls[0].get('stockitem_ID').setValue(this.stock['stockItemOpeningBal'][0].stockitem_ID);
          controlArray.controls[0].get('location_ID').setValue(this.stock['stockItemOpeningBal'][0].location_ID);
          controlArray.controls[0].get('locationName').setValue(this.stock['stockItemOpeningBal'][0].locationName);
          controlArray.controls[0].get('qty').setValue(this.stock['stockItemOpeningBal'][0].qty);
          controlArray.controls[0].get('rate').setValue(this.stock['stockItemOpeningBal'][0].rate);
          controlArray.controls[0].get('amount').setValue(this.stock['stockItemOpeningBal'][0].amount);



          const ControlStockItemSupplier = <FormArray> this.sForm.get('stockItemSuppliers');
          ControlStockItemSupplier.controls[0].get('stokItemSupplierID').setValue(this.stock['stockItemSuppliers'][0].stokItemSupplierID);
          ControlStockItemSupplier.controls[0].get('stockitem_ID').setValue(this.stock['stockItemSuppliers'][0].stockitem_ID);
          ControlStockItemSupplier.controls[0].get('ledger_ID').setValue(this.stock['stockItemSuppliers'][0].ledger_ID);
          ControlStockItemSupplier.controls[0].get('ledgerName').setValue(this.stock['stockItemSuppliers'][0].ledgerName);
          ControlStockItemSupplier.controls[0].get('orderPercentage').setValue(this.stock['stockItemSuppliers'][0].orderPercentage);
          ControlStockItemSupplier.controls[0].get('leadTime').setValue(this.stock['stockItemSuppliers'][0].leadTime);


      }



      //console.log(this.ledger);

    });


  }

  stockForm() {
    this.sForm = this._formBuilder.group({
      stockItemID: [0],
      itemName: ['', [Validators.required, Validators.minLength(4)]],
      itemCode: ['', Validators.required],
      stockGroup_ID: ['', Validators.required],
      stockGroupName: ['', Validators.required],
        unit_ID: ['', Validators.required],
        unitName: ['', Validators.required],
      minimum_Order_Level: ['', Validators.required],
      minimum_Order_Qty: ['', Validators.required],
      bufferQty: ['', Validators.required],
      hsnCode: ['', Validators.required],
      taxrate: ['', Validators.required],
      barcodeapplicable: ['', Validators.required],
      barcodelength: ['', Validators.required],
      branchName: ['', Validators.required],
      activeStatus: ['', Validators.required],
      company_ID: ['', Validators.required],
      userID:   ['', Validators.required],
      stockItemOpeningBal:  this._formBuilder.array([this.createStockItemOpeningBalance()]),
      stockItemSuppliers:  this._formBuilder.array([this.createStockItemSupplier()])
    });
  }

  createStockItemOpeningBalance() {
    return this._formBuilder.group({
      stockItemOPID: [''],
      stockitem_ID: [''],
      location_ID: [''],
      locationName: ['', Validators.required],
      qty: ['', Validators.required],
      rate: ['', Validators.required],
      amount: ['']
    });
  }

  createStockItemSupplier() {
    return this._formBuilder.group({
      stokItemSupplierID: [0],
      stockitem_ID: [0],
      ledger_ID: [0],
      ledgerName: ['', Validators.required],
      orderPercentage: ['' , Validators.required],
      leadTime: ['']
    });
  }

  get itemName() { return this.sForm.get('itemName'); }
  get itemCode() { return this.sForm.get('itemCode'); }
  get stockGroup_ID() { return this.sForm.get('stockGroup_ID'); }
  get stockGroupName() { return this.sForm.get('stockGroupName'); }
    get unit_ID() { return this.sForm.get('unit_ID'); }
    get unitName() { return this.sForm.get('unitName'); }
  get minimum_Order_Level() { return this.sForm.get('minimum_Order_Level'); }
  get minimum_Order_Qty() { return this.sForm.get('minimum_Order_Qty'); }
  get bufferQty() { return this.sForm.get('bufferQty'); }
  get hsnCode() { return this.sForm.get('hsnCode'); }
  get taxrate() { return this.sForm.get('taxrate'); }
  get barcodeapplicable() { return this.sForm.get('barcodeapplicable'); }
  get barcodelength() { return this.sForm.get('barcodelength'); }
  get branchName() { return this.sForm.get('branchName'); }
  get activeStatus() { return this.sForm.get('activeStatus'); }
  get company_ID() { return this.sForm.get('company_ID'); }
  get userID() { return this.sForm.get('userID'); }
  get locationName() { return this.sForm.get(['stockItemOpeningBal'], 0, ['locationName']); }
  get qty() { return this.sForm.get(['stockItemOpeningBal'], 0, ['qty']); }
  get rate() { return this.sForm.get(['stockItemOpeningBal'], 0, ['rate']); }
  get amount() { return this.sForm.get(['stockItemOpeningBal'], 0, ['amount']); }

    get ledger_ID() { return this.sForm.get(['stockItemSuppliers'], 0, ['ledger_ID']); }

    get ledgerName() { return this.sForm.get(['stockItemSuppliers'], 0, ['ledgerName']); }
  get orderPercentage() { return this.sForm.get(['stockItemSuppliers'], 0, ['orderPercentage']); }
  get leadTime() { return this.sForm.get(['stockItemSuppliers'], 0, ['leadTime']); }


  getLedgerData() {
      this.ledgerDataSubscription = this.ledgerService.getAllLedgers().subscribe((res: LedgerResponse) => {
          this.ledgerData = res.data;

      });
  }

  getStockGrupData(){

    this.stockGroupDataSubscription = this.stockService.getAllStocks().subscribe((res:StockResponse) =>{
        this.stockData = res.data;
    });
  }


    getUnitData() {
        this.unitDataSubscription = this.unitService.getAllUnits().subscribe((res: UnitResponse) => {
            this.unitData = res.data;
        });
    }


  ngOnDestroy() {
    this.stockItemSubscription.unsubscribe();
      this.ledgerDataSubscription.unsubscribe();
      this.unitDataSubscription.unsubscribe();
  }


  saveStockItem(formData) {
    if (this.sForm.valid) {
      this.stockService.updateStock(formData).subscribe((res:StockResponse)=>{
            if(res.status == '200'){
                alert('Updated');
                this.router.navigate(['/masters/stockItems'])
            }
        });
    } else {
      
      return false;
    }
  }

}
