import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {StockService} from "../services/stock.service";
import {StockDetailResponse} from "../models/stock-detail.model";
import {LedgerResponse} from "../../ledger/models/ledger.model";
import {LedgerService} from "../../ledger/services/ledger.service";
import {UnitService} from "../../unit/services/unit.service";
import {UnitResponse} from "../../unit/models/unit.model";

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit, OnDestroy {


  public stockItemId;
  public stockItemSubscription: Subscription;
  public ledgerDataSubscription: Subscription;
  public unitDataSubscription: Subscription;

  constructor( private stockService: StockService,private ledgerService: LedgerService, private unitService: UnitService, private _route: ActivatedRoute, private _formBuilder: FormBuilder,private router : Router) { }
  public stock;
  public sForm;
  public ledgerData;
  public unitData;
  ngOnInit() {
    this.stockForm();
    this._route.params.subscribe((params) => {
      this.stockItemId = params.id;
     // this.getLedgerData();
    });

      this.getLedgerData();
      this.getUnitData();


  }

  getStockData() {
    // this.stockItemSubscription = this.stockService.getAllLedgers().subscribe((res: StockDetailResponse) => {
    //   let dataV = res.data;
    //
    //   let arrValues = Object.values( dataV) ;
    //
    //
    //   for(let i =0; i< arrValues.length;  i++){
    //     if(dataV[i].ledger_ID == this.ledgerID){
    //       this.ledger = dataV[i];
    //
    //     }
    //
    //
    //   }
    //
    //
    //   if (this.ledgerID && this.ledger) {
    //
    //     this.lForm.controls['ledgerName'].setValue(this.ledger['ledgerName']);
    //
    //     this.lForm.controls['ledgerGroupID'].setValue(this.ledger['ledgerGroupID']);
    //
    //     this.lForm.controls['rateofTax'].setValue(this.ledger['rateofTax']);
    //
    //     this.lForm.controls['calculatedOn'].setValue(this.ledger['calculatedOn']);
    //
    //     this.lForm.controls['taxType'].setValue(this.ledger['taxType']);
    //
    //     this.lForm.controls['company_ID'].setValue(this.ledger['company_ID']);
    //
    //     this.lForm.controls['uSerID'].setValue(this.ledger['uSerID']);
    //
    //     this.lForm.controls['ledgerId'].setValue(this.ledgerID);
    //
    //   }
    //
    //
    //
    //   //console.log(this.ledger);
    //
    // });


  }

  stockForm(){
    this.sForm = this._formBuilder.group({
      stockItemID: [0],
      itemName: ['', [Validators.required, Validators.minLength(4)]],
      itemCode: ['', Validators.required],
      stockGroup: ['', Validators.required],
      unit: ['', Validators.required],
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
        stockItemOpeningBal:  this._formBuilder.group({
            stockItemOPID: [''],
            stockitem_ID: [''],
            location_ID: [''],
            locationName: [''],
            qty: [''],
            rate: [''],
            amount: [''],
            modifiedDateTime: ['']
        }),

        stockItemSuppliers:  this._formBuilder.group({
            stokItemSupplierID: [''],
            stockitem_ID: [''],
            ledger: [''],
            orderPercentage: [''],
            leadTime: [''],
            modifiedDateTime: ['']
        }),




    });
  }


  get itemName() { return this.sForm.get('itemName'); }

  get itemCode() { return this.sForm.get('itemCode'); }

  get stockGroup() { return this.sForm.get('stockGroup'); }


  get unit() { return this.sForm.get('unit'); }


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

    get stockItemOPID() { return this.sForm.get('stockItemOpeningBal').get('stockItemOPID'); }

    getLedgerData() {
        this.ledgerDataSubscription = this.ledgerService.getAllLedgers().subscribe((res: LedgerResponse) => {
            this.ledgerData = res.data;

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
  //
  //
  // saveLedger(form:Ledger){
  //
  //   this.ledgerService.updateLedger(form).subscribe((res:LedgerResponse)=>{
  //     if(res.status == '200'){
  //       alert("Updated");
  //       this.router.navigate(['/masters/ledgers'])
  //     }
  //   });
  //
  //
  //
  // }

}
