import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {SupplierService} from "../services/supplier.service";
import {SupplierResponse} from "../models/supplier.model";


@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit, OnDestroy {

    public supplierList;
    public supplierID;
    public supplierDataSubscription: Subscription;
    constructor(private supplierService: SupplierService, private _route: ActivatedRoute,
                private _formBuilder: FormBuilder,private router : Router) { }
    public supplier;
    public suForm;
    ngOnInit() {
        this.customerForm();
        this._route.params.subscribe((params) => {
            this.supplierID = params.id;
            this.getSupplierData(this.supplierID);
        });


    }

    getSupplierData(supplierID) {
        this.supplierDataSubscription = this.supplierService.getSupplierData(this.supplierID).subscribe((res: SupplierResponse) => {
            this.supplier = res.data[0];



            // if (this.customerID && this.customer) {
            //
            //     this.cForm.controls['customerName'].setValue(this.customer['customerName']);
            //
            //     this.cForm.controls['uSerID'].setValue(this.customer['uSerID']);
            //
            //     this.cForm.controls['companyID'].setValue(this.customer['companyID']);
            //
            //     this.cForm.controls['contactperson'].setValue(this.customer['contactperson']);
            //
            //
            //     this.cForm.controls['contactMobile'].setValue(this.customer['contactMobile']);
            //
            //     this.cForm.controls['landLineNos'].setValue(this.customer['landLineNos']);
            //
            //     this.cForm.controls['companyID'].setValue(this.customer['companyID']);
            //
            //     this.cForm.controls['contactperson'].setValue(this.customer['contactperson']);
            //
            // }



            // console.log(this.ledger);

        });


    }

    supplierForm(){
        this.suForm = this._formBuilder.group({
            supplier_ID: [0],
            supplierName: ['', [Validators.required, Validators.minLength(4)]],
            uSerID: ['', Validators.required],
            companyID: ['', Validators.required],
            contactperson: [null, Validators.required],
            contactMobile: [null, Validators.required],
            landLineNos: [null, Validators.required],
            supplierTaxes:  this._formBuilder.array([this.createSupplierTaxes()]),
            supplierAddressList:  this._formBuilder.array([this.createSupplierAddressList()]),
            supplierTerms:  this._formBuilder.array([this.createSupplierTerms()]),

        });
    }

    get supplierName() { return this.suForm.get('supplierName'); }
    get uSerID() { return this.suForm.get('uSerID'); }
    get companyID() { return this.suForm.get('companyID'); }
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
        this.customerDataSubscription.unsubscribe();
    }


    saveSupplier(form:any){

        // this.ledgerService.updateLedger(form).subscribe((res:LedgerResponse)=>{
        //     if(res.status == '200'){
        //         alert('Updated');
        //         this.router.navigate(['/masters/ledgers'])
        //     }
        // });



    }

}
