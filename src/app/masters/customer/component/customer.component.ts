import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {CustomerService} from '../services/customer.service';
import {CustomerResponse} from '../models/customer.model';
import { LedgerService } from '../../ledger/services/ledger.service';
import { StockService } from '../../stock/services/stock.service';
import { CommonService } from '../../../shared/services/common.services';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

    public customerList;
    public customerID;
    public ledgerList = [];
    public locationList = [];
    public currencyList = [];
    public customerDataSubscription: Subscription;
    showError = false;
    showSuccess = false;
    companyId = localStorage.getItem('companyID');
    userId = localStorage.getItem('userID');
    public stateList = [];
    constructor(
      private customerService: CustomerService,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private router: Router,
      private ledgerService: LedgerService,
      private stockService: StockService,
      private commonService: CommonService

    ) { }
    public customer;
    public cForm;
    ngOnInit() {
      this.customerForm();
      this.getStates();
      this.getLedgers();
      this.getLocation();
      this.getCurrency();
      this._route.params.subscribe((params) => {
        this.customerID = params.id;
      });

      setTimeout(() => {
        this.getCustomerData(this.customerID);
      }, 500);
    }

    back(url){
      this.commonService.getNavigate(url);
    }


    getCustomerData(customerId) {
        this.customerDataSubscription = this.customerService.getCustomerData(this.customerID).subscribe((res: CustomerResponse) => {
            this.customer = res.data[0];
            if (this.customerID && this.customer) {

                this.cForm.controls['customerName'].setValue(this.customer['customerName']);
                this.cForm.controls['contactperson'].setValue(this.customer['contactperson']);
                this.cForm.controls['contactMobile'].setValue(this.customer['contactMobile']);
                this.cForm.controls['landLineNos'].setValue(this.customer['landLineNos']);
                this.cForm.controls['contactperson'].setValue(this.customer['contactperson']);
                this.cForm.controls['customer_ID'].setValue(this.customer['customer_ID']);
                this.cForm.controls['emailID'].setValue(this.customer['emailID']);

                const controlArray = <FormArray> this.cForm.get('customerTaxes');

                for ( var i = 0; i <  this.customer.customerTaxes.length; i++) {
                  controlArray.push(
                    this._formBuilder.group({
                      taxLedgerID: [this.customer.customerTaxes[i].taxLedgerID],
                      taxLedgerName: [this.customer.customerTaxes[i].taxLedgerName],
                      taxRate: [this.customer.customerTaxes[i].taxRate],
                      calculatedOn: [this.customer.customerTaxes[i].calculatedOn]
                    })
                  );
                }

                if (controlArray.length > 0) {
                  controlArray.removeAt(0);
                }

                const controlArrayAddress = <FormArray> this.cForm.get('customerAddList');
                for ( var i = 0; i < this.customer.customerAddList.length; i ++ ) {
                  controlArrayAddress.push(
                    this._formBuilder.group({
                      locationName: [this.customer.customerAddList[i].locationName],
                      address1: [this.customer.customerAddList[i].address1],
                      address2: [this.customer.customerAddList[i].address2],
                      address3: [this.customer.customerAddList[i].address3],
                      state: [this.customer.customerAddList[i].stateCode],
                      gstincode: [this.customer.customerAddList[i].gstincode],
                      stateCode: [this.customer.customerAddList[i].stateCode],
                      ledaddid: [this.customer.customerAddList[i].ledaddid]
                    })
                  );
                }

                if (controlArrayAddress.length > 0) {
                  controlArrayAddress.removeAt(0);
                }

                const controlArrayTerms = <FormArray> this.cForm.get('customerTerms');
                for ( var i = 0; i < this.customer.customerTerms.length ; i++ ) {
                  controlArrayTerms.push(
                    this._formBuilder.group({
                      paymentTerms: [this.customer.customerTerms[i].paymentTerms],
                      currency: [this.customer.customerTerms[i].currency],
                      transporters: [this.customer.customerTerms[i].transporters],
                      packing: [this.customer.customerTerms[i].packing],
                      freight: [this.customer.customerTerms[i].freight],
                      deliveryTerms: [this.customer.customerTerms[i].deliveryTerms]
                    })
                  );
                }

                if (controlArrayTerms.length > 0) {
                  controlArrayTerms.removeAt(0);
                }
            }
        });
    }

    customerForm() {
      this.cForm = this._formBuilder.group({
          customer_ID: [0],
          customerName: ['', [Validators.required, Validators.minLength(4)]],
          uSerID: [JSON.parse(this.userId)],
          companyID: [JSON.parse(this.companyId)],
          emailID: ['', Validators.required],
          contactperson: ['', Validators.required],
          contactMobile: ['', Validators.required],
          landLineNos: ['', Validators.required],
          customerTaxes:  this._formBuilder.array([this.createcustomerTaxes()]),
          customerAddList:  this._formBuilder.array([this.createCustomerAddList()]),
          customerTerms:  this._formBuilder.array([this.createCustomerTerms()]),
      });
    }

    get customerName() { return this.cForm.get('customerName'); }
    get contactperson() { return this.cForm.get('contactperson'); }
    get contactMobile() { return this.cForm.get('contactMobile'); }
    get landLineNos() { return this.cForm.get('landLineNos'); }
    get emailID() { return this.cForm.get('emailID'); }
    get locationName() { return this.cForm.get(['customerAddList'], 0, ['locationName']); }
    get address1() { return this.cForm.get(['customerAddList'], 0, ['address1']); }
    get address2() { return this.cForm.get(['customerAddList'], 0, ['address2']); }
    get address3() { return this.cForm.get(['customerAddList'], 0, ['address3']); }
    get state() { return this.cForm.get(['customerAddList'], 0, ['state']); }
    get gstincode() { return this.cForm.get(['customerAddList'], 0, ['gstincode']); }
    get stateCode() { return this.cForm.get(['customerAddList'], 0, ['stateCode']); }

    get paymentTerms() { return this.cForm.get(['customerTerms'], 0, ['paymentTerms']); }
    get currency() { return this.cForm.get(['customerTerms'], 0, ['currency']); }
    get transporters() { return this.cForm.get(['customerTerms'], 0, ['transporters']); }
    get packing() { return this.cForm.get(['customerTerms'], 0, ['packing']); }
    get freight() { return this.cForm.get(['customerTerms'], 0, ['freight']); }
    get deliveryTerms() { return this.cForm.get(['customerTerms'], 0, ['deliveryTerms']); }


    get taxLedgerID() { return this.cForm.get(['customerTaxes'], 0, ['taxLedgerID']); }
    get taxLedgerName() { return this.cForm.get(['customerTaxes'], 0, ['taxLedgerName']); }
    get taxRate() { return this.cForm.get(['customerTaxes'], 0, ['taxRate']); }
    get calculatedOn() { return this.cForm.get(['customerTaxes'], 0, ['calculatedOn']); }


    createcustomerTaxes() {
        return this._formBuilder.group({
            taxLedgerID: ['0'],
            taxLedgerName: [''],
            taxRate: [0],
            calculatedOn: ['']
        });
    }

    addTaxes() {
      const stockItemArray = <FormArray>this.cForm.get('customerTaxes');
      stockItemArray.push(
        this._formBuilder.group({
          taxLedgerID: ['0'],
            taxLedgerName: [''],
            taxRate: [0],
            calculatedOn: ['']
        })
      );
    }

    removeTaxes(index) {
      const stockItemArray = <FormArray>this.cForm.get('customerTaxes');
      stockItemArray.removeAt(index);
    }


    createCustomerAddList() {
        return this._formBuilder.group({
            locationName: [''],
            address1: [''],
            address2: [''],
            address3: [''],
            state: [''],
            gstincode: [0],
            stateCode: [0],
            ledaddid: [0]
        });
    }


    addAddress() {
      const stockItemArray = <FormArray>this.cForm.get('customerAddList');
      stockItemArray.push(
        this._formBuilder.group({
          locationName: [''],
          address1: [''],
          address2: [''],
          address3: [''],
          state: [''],
          gstincode: ['0'],
          stateCode: [0],
          ledaddid: [0]
        })
      );
    }

    removeAddress(index) {
      const stockItemArray = <FormArray>this.cForm.get('customerAddList');
      stockItemArray.removeAt(index);
    }

    createCustomerTerms() {
        return this._formBuilder.group({
            paymentTerms: [''],
            currency: [''],
            transporters: [''],
            packing: [''],
            freight: [''],
            deliveryTerms: ['']
        });
    }



    ngOnDestroy() {
        this.customerDataSubscription.unsubscribe();
    }


    saveCustomer (form: any) {
        this.customerService.updateCustomer(form).subscribe((res: CustomerResponse) => {
            if (res.status === '200') {
                this.showSuccess = true;
                setTimeout(() => {
                  this.router.navigate(['/masters/customers']);
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
              this.currencyList.push({label: data[key].currencyName});
            }
          }
        }
      });
    }

    getStates() {
      this.customerService.getStates().subscribe( res => {
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
      const supplierArray = <FormArray>this.cForm.get('customerAddList');
      supplierArray.controls[frmArray].get('stateCode').setValue(stateCode);
    }

}
