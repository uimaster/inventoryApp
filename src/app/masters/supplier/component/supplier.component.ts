import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {SupplierService} from '../services/supplier.service';
import {SupplierResponse} from '../models/supplier.model';


@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit, OnDestroy {

    public supplierList;
    public supplierID;
    public supplierDataSubscription: Subscription;
    public supplier;
    public suForm;
    showError = false;
    showSuccess = false;
    companyId = JSON.parse(localStorage.getItem('companyID'));
    userId = JSON.parse(localStorage.getItem('userID'));

    constructor(
      private supplierService: SupplierService,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private router: Router
    ) { }
    ngOnInit() {
        this.supplierForm();
        this._route.params.subscribe((params) => {
            this.supplierID = params.id;
            this.getSupplierData(this.supplierID);
        });


    }

    getSupplierData(supplierID) {
        this.supplierDataSubscription = this.supplierService.getSupplierData(this.supplierID).subscribe((res: SupplierResponse) => {
            this.supplier = res.data[0];

            if (this.supplierID && this.supplier) {
                this.suForm.controls['supplier_ID'].setValue(this.supplier['supplier_ID']);
                this.suForm.controls['supplierName'].setValue(this.supplier['supplierName']);
                this.suForm.controls['uSerID'].setValue(this.supplier['uSerID']);
                this.suForm.controls['companyID'].setValue(this.supplier['companyID']);
                this.suForm.controls['contactperson'].setValue(this.supplier['contactperson']);
                this.suForm.controls['contactMobile'].setValue(this.supplier['contactMobile']);
                this.suForm.controls['landLineNos'].setValue(this.supplier['landLineNos']);
                const controlArray = <FormArray> this.suForm.get('supplierTaxes');
                controlArray.controls[0].get('taxLedgerID').setValue(this.supplier['supplierTaxes'][0].taxLedgerID);
                controlArray.controls[0].get('taxLedgerName').setValue(this.supplier['supplierTaxes'][0].taxLedgerName);
                controlArray.controls[0].get('taxRate').setValue(this.supplier['supplierTaxes'][0].taxRate);
                controlArray.controls[0].get('calculatedOn').setValue(this.supplier['supplierTaxes'][0].calculatedOn);
                const controlArrayAddress = <FormArray> this.suForm.get('supplierAddressList');
                controlArrayAddress.controls[0].get('locationName').setValue(this.supplier['supplierAddressList'][0].locationName);
                controlArrayAddress.controls[0].get('address1').setValue(this.supplier['supplierAddressList'][0].address1);
                controlArrayAddress.controls[0].get('address2').setValue(this.supplier['supplierAddressList'][0].address2);
                controlArrayAddress.controls[0].get('address3').setValue(this.supplier['supplierAddressList'][0].address3);
                controlArrayAddress.controls[0].get('state').setValue(this.supplier['supplierAddressList'][0].state);
                controlArrayAddress.controls[0].get('gstincode').setValue(this.supplier['supplierAddressList'][0].gstincode);
                controlArrayAddress.controls[0].get('stateCode').setValue(this.supplier['supplierAddressList'][0].stateCode);
                const controlArrayTerms = <FormArray> this.suForm.get('supplierTerms');
                controlArrayTerms.controls[0].get('paymentTerms').setValue(this.supplier['supplierTerms'][0].paymentTerms);
                controlArrayTerms.controls[0].get('currency').setValue(this.supplier['supplierTerms'][0].currency);
                controlArrayTerms.controls[0].get('transporters').setValue(this.supplier['supplierTerms'][0].transporters);
                controlArrayTerms.controls[0].get('packing').setValue(this.supplier['supplierTerms'][0].packing);
                controlArrayTerms.controls[0].get('freight').setValue(this.supplier['supplierTerms'][0].freight);
                controlArrayTerms.controls[0].get('deliveryTerms').setValue(this.supplier['supplierTerms'][0].deliveryTerms);
            }





        });


    }

    supplierForm(){
        this.suForm = this._formBuilder.group({
            supplier_ID: [0],
            supplierName: ['', [Validators.required, Validators.minLength(4)]],
            uSerID: [this.userId],
            companyID: [this.companyId],
            contactperson: [null, Validators.required],
            contactMobile: [null, Validators.required],
            landLineNos: [null, Validators.required],
            supplierTaxes:  this._formBuilder.array([this.createSupplierTaxes()]),
            supplierAddressList:  this._formBuilder.array([this.createSupplierAddressList()]),
            supplierTerms:  this._formBuilder.array([this.createSupplierTerms()]),

        });
    }

    get supplierName() { return this.suForm.get('supplierName'); }
    get contactperson() { return this.suForm.get('contactperson'); }
    get contactMobile() { return this.suForm.get('contactMobile'); }
    get landLineNos() { return this.suForm.get('landLineNos'); }
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
            taxLedgerID: ['', Validators.required],
            taxLedgerName: ['', Validators.required],
            taxRate: ['', Validators.required],
            calculatedOn: ['NA', Validators.required]
        });
    }


    createSupplierAddressList() {
        return this._formBuilder.group({
            locationName: ['', Validators.required],
            address1: ['', Validators.required],
            address2: [''],
            address3: [''],
            state: ['', Validators.required],
            gstincode: ['', Validators.required],
            stateCode: ['', Validators.required]
        });
    }

    createSupplierTerms() {
        return this._formBuilder.group({
            paymentTerms: ['', Validators.required],
            currency: ['', Validators.required],
            transporters: ['', Validators.required],
            packing: ['NA'],
            freight: [''],
            deliveryTerms: ['']
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

}
