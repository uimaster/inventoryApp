import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LedgerResponse, Ledger} from "../models/ledger.model";
import {LedgerService} from "../services/ledger.service";
import {Subscription} from "rxjs/Subscription";
import {SharedLedgerService} from "../services/shared-ledger.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-ledger',
    templateUrl: './ledger.component.html',
    styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit, OnDestroy {

    public ledgerList;
    public ledgerID;
    public ledgerDataSubscription: Subscription;
    constructor( private ledgerService: LedgerService, private ledgerSharedService: SharedLedgerService,private _route: ActivatedRoute, private _formBuilder: FormBuilder) { }
    public ledger;
    public lForm;
    ngOnInit() {
        this.ledgerForm();
        this._route.params.subscribe((params) => {
            this.ledgerID = params.id;
            this.getLedgerData();
        });


    }

    getLedgerData() {
        this.ledgerDataSubscription = this.ledgerService.getAllLedgers().subscribe((res: LedgerResponse) => {
            let dataV = res.data;

            let arrValues = Object.values( dataV) ;


            for(let i =0; i< arrValues.length;  i++){
               if(dataV[i].ledger_ID == this.ledgerID){
                   this.ledger = dataV[i];

               }


           }


            if (this.ledgerID && this.ledger) {

                this.lForm.controls['ledgerName'].setValue(this.ledger['ledgerName']);

                this.lForm.controls['ledgerGroupID'].setValue(this.ledger['ledgerGroupID']);

                this.lForm.controls['rateofTax'].setValue(this.ledger['rateofTax']);

                this.lForm.controls['calculatedOn'].setValue(this.ledger['calculatedOn']);

                this.lForm.controls['taxType'].setValue(this.ledger['taxType']);

                this.lForm.controls['company_ID'].setValue(this.ledger['company_ID']);

                this.lForm.controls['uSerID'].setValue(this.ledger['uSerID']);

                this.lForm.controls['ledgerId'].setValue(this.ledgerID);

            }



            //console.log(this.ledger);

        });


    }

    ledgerForm(){
        this.lForm = this._formBuilder.group({
            ledgerId: [0],
            ledgerName: ['', Validators.required],
            ledgerGroupID: ['', Validators.required],
            rateofTax: ['', Validators.required],
            calculatedOn: ['', Validators.required],
            taxType: ['', Validators.required],
            company_ID: ['', Validators.required],
            uSerID: ['', Validators.required]

        });
    }

    ngOnDestroy() {
        //this.ledgerDataSubscription.unsubscribe();
    }


    saveLedger(form:Ledger){

        this.ledgerService.updateLedger(form).subscribe()



    }

}
