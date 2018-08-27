import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LedgerResponse, Ledger} from '../models/ledger.model';
import {LedgerService} from '../services/ledger.service';
import {Subscription} from 'rxjs/Subscription';
import {SharedLedgerService} from '../services/shared-ledger.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-ledger',
    templateUrl: './ledger.component.html',
    styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit, OnDestroy {

    public ledgerList;
    public ledger_ID;
    public ledgerDataSubscription: Subscription;
    public ledger;
    public lForm;
    private calculatedOn:any;
    companyId = localStorage.getItem('companyID');
    userId = localStorage.getItem('userID');
    showError = false;
    showSuccess = false;
    constructor(
      private ledgerService: LedgerService,
      private ledgerSharedService: SharedLedgerService,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private router: Router
    ) { }


    ngOnInit() {
        this.getCalculatedIn();
        this.ledgerForm();
        this._route.params.subscribe((params) => {
            this.ledger_ID = params.id;
            this.getLedgerData();
        });


    }

    getLedgerData() {
        this.ledgerDataSubscription = this.ledgerService.getAllLedgers().subscribe((res: LedgerResponse) => {
            let dataV = res.data;

            let arrValues = Object.values( dataV) ;
            for (let i = 0; i < arrValues.length;  i++) {
               if(dataV[i].ledger_ID == this.ledger_ID) {
                   this.ledger = dataV[i];
               }
           }


            if (this.ledger_ID && this.ledger) {
                this.lForm.controls['ledgerName'].setValue(this.ledger['ledgerName']);
                this.lForm.controls['ledgerGroupID'].setValue(this.ledger['ledgerGroupID']);
                this.lForm.controls['rateofTax'].setValue(this.ledger['rateofTax']);
                this.lForm.controls['calculatedOn'].setValue(this.ledger['calculatedOn']);
                this.lForm.controls['taxType'].setValue(this.ledger['taxType']);
                this.lForm.controls['company_ID'].setValue(this.ledger['company_ID']);
                this.lForm.controls['uSerID'].setValue(this.ledger['uSerID']);
                this.lForm.controls['ledger_ID'].setValue(this.ledger_ID);
            }



            // console.log(this.ledger);

        });


    }

    ledgerForm() {
        this.lForm = this._formBuilder.group({
            ledger_ID: [0],
            ledgerName: ['', [Validators.required, Validators.minLength(4)]],
            ledgerGroupID: [0],
            rateofTax: ['', Validators.required],
            calculatedOn: ['', Validators.required],
            taxType: ['', Validators.required],
            company_ID: [this.companyId],
            uSerID: [this.userId]

        });
    }


    get ledgerName() { return this.lForm.get('ledgerName'); }

    get ledgerGroupID() { return this.lForm.get('ledgerGroupID'); }

    get rateofTax() { return this.lForm.get('rateofTax'); }


    get calculatedOn() { return this.lForm.get('calculatedOn'); }


    get taxType() { return this.lForm.get('taxType'); }

    get company_ID() { return this.lForm.get('company_ID'); }

    get uSerID() { return this.lForm.get('uSerID'); }



    ngOnDestroy() {
        // this.ledgerDataSubscription.unsubscribe();
    }


    saveLedger(form: Ledger) {
        this.ledgerService.updateLedger(form).subscribe((res: LedgerResponse) => {
            if(res.status === '200') {
                this.showSuccess = true;
                setTimeout(() => {
                  this.router.navigate(['/masters/ledgers']);
                }, 3000);
            } else {
              this.showError = true;
            }
        });
    }

    getCalculatedIn(){
        this.ledgerService.getCalculatedOnList().subscribe((res:any)=>{

            if(res.status === '200') {

                this.calculatedOn = res.data;

            }

        });
    }

}
