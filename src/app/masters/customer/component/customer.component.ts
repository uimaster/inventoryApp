import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
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
            this.getCustomerData();
        });


    }

    getCustomerData() {
        this.customerDataSubscription = this.customerService.getCustomerData(this.customerID).subscribe((res: CustomerResponse) => {
            this.customer = res.data;


            //
            // if (this.customerID && this.customer) {
            //
            //     this.cForm.controls['ledgerName'].setValue(this.ledger['ledgerName']);
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
            // }



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
            customerAddList:  this._formBuilder.group({
                locationName: [''],
                address1: [''],
                address2: [''],
                address3: [''],
                state: [''],
                gstincode: [''],
                stateCode: ['']
            }),

            customerTerms:  this._formBuilder.group({
                paymentTerms: [''],
                currency: [''],
                transporters: [''],
                packing: [''],
                freight: [''],
                deliveryTerms: ['']
            }),



        });
    }

    //
    // get ledgerName() { return this.lForm.get('ledgerName'); }
    //
    // get ledgerGroupID() { return this.lForm.get('ledgerGroupID'); }
    //
    // get rateofTax() { return this.lForm.get('rateofTax'); }
    //
    //
    // get calculatedOn() { return this.lForm.get('calculatedOn'); }
    //
    //
    // get taxType() { return this.lForm.get('taxType'); }
    //
    // get company_ID() { return this.lForm.get('company_ID'); }
    //
    // get uSerID() { return this.lForm.get('uSerID'); }



    ngOnDestroy() {
        this.customerDataSubscription.unsubscribe();
    }


    saveCustomer(form:any){

        // this.ledgerService.updateLedger(form).subscribe((res:LedgerResponse)=>{
        //     if(res.status == '200'){
        //         alert('Updated');
        //         this.router.navigate(['/masters/ledgers'])
        //     }
        // });



    }

}
