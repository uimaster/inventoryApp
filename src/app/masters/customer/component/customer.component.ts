import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {CustomerService} from "../services/customer.service";
import {CustomerResponse} from "../models/customer.model";

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

    public customerList;
    public customerID;
    public customerDataSubscription: Subscription;
    constructor(private customerService: CustomerService, private _route: ActivatedRoute,
                 private _formBuilder: FormBuilder,private router : Router) { }
    public customer;
    public cForm;
    ngOnInit() {
        this.customerForm();
        this._route.params.subscribe((params) => {
            this.customerID = params.id;
            this.getCustomerData(this.customerID);
        });


    }

    getCustomerData(customerId) {
        this.customerDataSubscription = this.customerService.getCustomerData(this.customerID).subscribe((res: CustomerResponse) => {
            this.customer = res.data[0];



            if (this.customerID && this.customer) {

                this.cForm.controls['customerName'].setValue(this.customer['customerName']);

                this.cForm.controls['uSerID'].setValue(this.customer['uSerID']);

                this.cForm.controls['companyID'].setValue(this.customer['companyID']);

                this.cForm.controls['contactperson'].setValue(this.customer['contactperson']);

                
                this.cForm.controls['contactMobile'].setValue(this.customer['contactMobile']);

                this.cForm.controls['landLineNos'].setValue(this.customer['landLineNos']);

                this.cForm.controls['companyID'].setValue(this.customer['companyID']);

                this.cForm.controls['contactperson'].setValue(this.customer['contactperson']);


                const controlArray = <FormArray> this.suForm.get('customerTaxes');
                controlArray.controls[0].get('taxLedgerID').setValue(this.customer['customerTaxes'][0].taxLedgerID);
                controlArray.controls[0].get('taxLedgerName').setValue(this.customer['customerTaxes'][0].taxLedgerName);
                controlArray.controls[0].get('taxRate').setValue(this.customer['customerTaxes'][0].taxRate);
                controlArray.controls[0].get('calculatedOn').setValue(this.customer['customerTaxes'][0].calculatedOn);


                const controlArrayAddress = <FormArray> this.suForm.get('customerAddList');
                controlArrayAddress.controls[0].get('locationName').setValue(this.customer['customerAddList'][0].locationName);
                controlArrayAddress.controls[0].get('address1').setValue(this.customer['customerAddList'][0].address1);
                controlArrayAddress.controls[0].get('address2').setValue(this.customer['customerAddList'][0].address2);
                controlArrayAddress.controls[0].get('address3').setValue(this.customer['customerAddList'][0].address3);
                controlArrayAddress.controls[0].get('state').setValue(this.customer['customerAddList'][0].state);
                controlArrayAddress.controls[0].get('gstincode').setValue(this.customer['customerAddList'][0].gstincode);
                controlArrayAddress.controls[0].get('stateCode').setValue(this.customer['customerAddList'][0].stateCode);


                const controlArrayTerms = <FormArray> this.suForm.get('customerTerms');
                controlArrayTerms.controls[0].get('paymentTerms').setValue(this.customer['customerTerms'][0].paymentTerms);
                controlArrayTerms.controls[0].get('currency').setValue(this.customer['customerTerms'][0].currency);
                controlArrayTerms.controls[0].get('transporters').setValue(this.customer['customerTerms'][0].transporters);
                controlArrayTerms.controls[0].get('packing').setValue(this.customer['customerTerms'][0].packing);
                controlArrayTerms.controls[0].get('freight').setValue(this.customer['customerTerms'][0].freight);
                controlArrayTerms.controls[0].get('deliveryTerms').setValue(this.customer['customerTerms'][0].deliveryTerms);



            }



            // console.log(this.ledger);

        });


    }

    customerForm(){
        this.cForm = this._formBuilder.group({
            customer_ID: [0],
            customerName: ['', [Validators.required, Validators.minLength(4)]],
            uSerID: ['', Validators.required],
            companyID: ['', Validators.required],
            contactperson: ['', Validators.required],
            contactMobile: ['', Validators.required],
            landLineNos: ['', Validators.required],
            customerTaxes:  this._formBuilder.array([this.createcustomerTaxes()]),
            customerAddList:  this._formBuilder.array([this.createCustomerAddList()]),
            customerTerms:  this._formBuilder.array([this.createCustomerTerms()]),



        });
    }

    get customerName() { return this.cForm.get('customerName'); }
    get uSerID() { return this.cForm.get('uSerID'); }
    get companyID() { return this.cForm.get('companyID'); }
    get contactperson() { return this.cForm.get('contactperson'); }
    get contactMobile() { return this.cForm.get('contactMobile'); }
    get landLineNos() { return this.cForm.get('landLineNos'); }
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
            taxLedgerID: ['', Validators.required],
            taxLedgerName: ['', Validators.required],
            taxRate: ['', Validators.required],
            calculatedOn: ['', Validators.required]
        });
    }


    createCustomerAddList() {
        return this._formBuilder.group({
            locationName: [''],
            address1: [''],
            address2: [''],
            address3: [''],
            state: [''],
            gstincode: [''],
            stateCode: ['']
        });
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


    saveCustomer(form:any){

        this.customerService.updateCustomer(form).subscribe((res:CustomerResponse)=>{
            if(res.status == '200'){
                alert('Updated');
                this.router.navigate(['/masters/customers'])
            }
        });



    }

}
