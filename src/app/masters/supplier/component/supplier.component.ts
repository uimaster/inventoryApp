import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {SupplierService} from '../services/supplier.service';
import {SupplierResponse} from '../models/supplier.model';
import { LedgerService } from '../../ledger/services/ledger.service';
import { StockService } from '../../stock/services/stock.service';
import { CustomerService } from '../../customer/services/customer.service';


@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit, OnDestroy {

    public supplierList;
    public supplierID;
    public locationList = [];
    public currencyList = [];
    public supplierDataSubscription: Subscription;
    public supplier;
    public suForm;
    ledgerList = [];
    showError = false;
    showSuccess = false;
    companyId = JSON.parse(localStorage.getItem('companyID'));
    userId = JSON.parse(localStorage.getItem('userID'));
    public stateList = [];

    constructor(
      private supplierService: SupplierService,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private router: Router,
      private ledgerService: LedgerService,
      private stockService: StockService,
      private customerService: CustomerService
    ) { }
    ngOnInit() {
      this.supplierForm();
      this.getLedgers();
      this.getLocation();
      this.getCurrency();
      this.getStates();
      this._route.params.subscribe((params) => {
        this.supplierID = params.id;
      });
      setTimeout(() => {
        this.getSupplierData(this.supplierID);
      }, 500);
    }

    getSupplierData(supplierID) {
        this.supplierDataSubscription = this.supplierService.getSupplierData(this.supplierID).subscribe((res: SupplierResponse) => {
            this.supplier = res.data[0];

            if (this.supplierID && this.supplier) {
                this.suForm.controls['supplier_ID'].setValue(this.supplier['supplier_ID']);
                this.suForm.controls['supplierName'].setValue(this.supplier['supplierName']);
                this.suForm.controls['uSerID'].setValue(this.supplier['uSerID']);
                this.suForm.controls['companyID'].setValue(this.supplier['companyID']);
                this.suForm.controls['emailID'].setValue(this.supplier['emailID']);
                this.suForm.controls['contactperson'].setValue(this.supplier['contactperson']);
                this.suForm.controls['contactMobile'].setValue(this.supplier['contactMobile']);
                this.suForm.controls['landLineNos'].setValue(this.supplier['landLineNos']);

                const controlArray = <FormArray> this.suForm.get('supplierTaxes');
                 for ( var i = 0; i < this.supplier.supplierTaxes.length; i++) {
                  controlArray.push(
                    this._formBuilder.group({
                      taxLedgerID: [this.supplier.supplierTaxes[i].taxLedgerID],
                      taxLedgerName: [this.supplier.supplierTaxes[i].taxLedgerName],
                      taxRate: [this.supplier.supplierTaxes[i].taxRate],
                      calculatedOn: [this.supplier.supplierTaxes[i].calculatedOn]
                    })
                  );
                 }

                 if (controlArray.length > 0) {
                  controlArray.removeAt(0);
                }


                const controlArrayAddress = <FormArray> this.suForm.get('supplierAddressList');
                  for ( var i = 0; i < this.supplier.supplierAddressList.length; i ++ ) {
                    controlArrayAddress.push(
                      this._formBuilder.group({
                        locationName: [this.supplier.supplierAddressList[i].locationName],
                        address1: [this.supplier.supplierAddressList[i].address1],
                        address2: [this.supplier.supplierAddressList[i].address2],
                        address3: [this.supplier.supplierAddressList[i].address3],
                        state: [this.supplier.supplierAddressList[i].stateCode],
                        gstincode: [this.supplier.supplierAddressList[i].gstincode],
                        stateCode: [this.supplier.supplierAddressList[i].stateCode],
                        ledaddid: [this.supplier.supplierAddressList[i].ledaddid]
                      })
                    );
                  }

                  if (controlArrayAddress.length > 0) {
                    controlArrayAddress.removeAt(0);
                  }


                const controlArrayTerms = <FormArray> this.suForm.get('supplierTerms');
                  for ( var i = 0; i < this.supplier.supplierTerms.length ; i++ ) {
                    controlArrayTerms.push(
                      this._formBuilder.group({
                        paymentTerms: [this.supplier.supplierTerms[i].paymentTerms],
                        currency: [this.supplier.supplierTerms[i].currency],
                        transporters: [this.supplier.supplierTerms[i].transporters],
                        packing: [this.supplier.supplierTerms[i].packing],
                        freight: [this.supplier.supplierTerms[i].freight],
                        deliveryTerms: [this.supplier.supplierTerms[i].deliveryTerms]
                      })
                    );
                  }

                  if (controlArrayTerms.length > 0) {
                    controlArrayTerms.removeAt(0);
                  }
            }
        });


    }

    supplierForm() {
        this.suForm = this._formBuilder.group({
            supplier_ID: [0],
            supplierName: ['', [Validators.required, Validators.minLength(4)]],
            uSerID: [JSON.parse(this.userId)],
            companyID: [JSON.parse(this.companyId)],
            contactperson: [null, Validators.required],
            contactMobile: [null, Validators.required],
            landLineNos: [null, Validators.required],
            emailID: [null, Validators.required],
            supplierTaxes:  this._formBuilder.array([this.createSupplierTaxes()]),
            supplierAddressList:  this._formBuilder.array([this.createSupplierAddressList()]),
            supplierTerms:  this._formBuilder.array([this.createSupplierTerms()]),

        });
    }

    get supplierName() { return this.suForm.get('supplierName'); }
    get contactperson() { return this.suForm.get('contactperson'); }
    get contactMobile() { return this.suForm.get('contactMobile'); }
    get landLineNos() { return this.suForm.get('landLineNos'); }
    get emailID() { return this.suForm.get('emailID'); }
    get locationName() { return this.suForm.get(['supplierAddressList'], 0, ['locationName']); }
    get address1() { return this.suForm.get(['supplierAddressList'], 0, ['address1']); }
    get address2() { return this.suForm.get(['supplierAddressList'], 0, ['address2']); }
    get address3() { return this.suForm.get(['supplierAddressList'], 0, ['address3']); }
    get state() { return this.suForm.get(['supplierAddressList'], 0, ['state']); }
    get gstincode() { return this.suForm.get(['supplierAddressList'], 0, ['gstincode']); }
    get stateCode() { return this.suForm.get(['supplierAddressList'], 0, ['stateCode']); }

    get paymentTerms() { return this.suForm.get(['supplierTerms'], 0, ['paymentTerms']); }
    get currency() { return this.suForm.get(['supplierTerms'], 0, ['currency']); }
    get transporters() { return this.suForm.get(['supplierTerms'], 0, ['transporters']); }
    get packing() { return this.suForm.get(['supplierTerms'], 0, ['packing']); }
    get freight() { return this.suForm.get(['supplierTerms'], 0, ['freight']); }
    get deliveryTerms() { return this.suForm.get(['supplierTerms'], 0, ['deliveryTerms']); }


    get taxLedgerID() { return this.suForm.get(['supplierTaxes'], 0, ['taxLedgerID']); }
    get taxLedgerName() { return this.suForm.get(['supplierTaxes'], 0, ['taxLedgerName']); }
    get taxRate() { return this.suForm.get(['supplierTaxes'], 0, ['taxRate']); }
    get calculatedOn() { return this.suForm.get(['supplierTaxes'], 0, ['calculatedOn']); }

    createSupplierTaxes() {
        return this._formBuilder.group({
            taxLedgerID: [0],
            taxLedgerName: [''],
            taxRate: [0],
            calculatedOn: ['NA']
        });
    }

    addTaxes() {
      const stockItemArray = <FormArray>this.suForm.get('supplierTaxes');
      stockItemArray.push(
        this._formBuilder.group({
          taxLedgerID: [0],
          taxLedgerName: [''],
          taxRate: [0],
          calculatedOn: ['NA']
        })
      );
    }

    removeTaxes(index) {
      const stockItemArray = <FormArray>this.suForm.get('supplierTaxes');
      stockItemArray.removeAt(index);
    }



    createSupplierAddressList() {
        return this._formBuilder.group({
            locationName: [''],
            address1: [''],
            address2: [''],
            address3: [''],
            state: [''],
            gstincode: [''],
            stateCode: [0],
            ledaddid: [0]
        });
    }

    addAddress() {
      const stockItemArray = <FormArray>this.suForm.get('supplierAddressList');
      stockItemArray.push(
        this._formBuilder.group({
          locationName: [''],
            address1: [''],
            address2: [''],
            address3: [''],
            state: [''],
            gstincode: [''],
            stateCode: [0],
            ledaddid: [0]
        })
      );
    }

    removeAddress(index) {
      const stockItemArray = <FormArray>this.suForm.get('supplierAddressList');
      stockItemArray.removeAt(index);
    }

    createSupplierTerms() {
        return this._formBuilder.group({
            paymentTerms: [''],
            currency: [''],
            transporters: [''],
            packing: ['NA'],
            freight: [''],
            deliveryTerms: [0]
        });
    }

    ngOnDestroy() {
        this.supplierDataSubscription.unsubscribe();
    }

    saveSupplier(form: any) {
        this.supplierService.updateSupplier(form).subscribe((res: SupplierResponse) => {
            if (res.status === '200') {
              this.showSuccess = true;
              setTimeout(() => {
                  this.router.navigate(['/masters/suppliers']);
              }, 3000);
            } else {
              this.showError = true;
            }
        });
    }

    getLedgers() {
      this.customerService.getTaxType().subscribe( res => {
        if (res && res.status === '200') {
          let data = res.data;
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
                this.ledgerList.push({label: data[key].ledgerName, value: data[key].ledger_ID});
            }
          }
        }
      });
    }

    getLocation() {
      this.stockService.getLocation().subscribe( res => {
        if (res && res.status === '200') {
         // this.locationList = res.data;
          let data = res.data;
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
                this.locationList.push({label: data[key].locationName, value: data[key].locationName});
            }
          }
        }
      });
    }

    getCurrency() {
      this.stockService.getCurrency().subscribe( res => {
        if (res && res.status === '200') {
          let data = res.data;
          for ( let key in data) {
            if(data.hasOwnProperty(key)) {
              this.currencyList.push({label: data[key].currencyName, value: data[key].currencyID});
            }
          }
        }
      });
    }

    getStates() {
      this.supplierService.getStates().subscribe( res => {
        if(res && res.status === '200') {
          let data = res.data;
          for ( let key in data) {
            if (data.hasOwnProperty(key)) {
              this.stateList.push({label: data[key].stateName, value: data[key].stateCode});
            }
          }
        }
      });
    }

    getStateSelect(state, frmArray) {
      const stateCode = state.value;
      const supplierArray = <FormArray>this.suForm.get('supplierAddressList');
      supplierArray.controls[frmArray].get('stateCode').setValue(stateCode);
    }

}
