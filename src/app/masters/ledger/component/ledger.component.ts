import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LedgerResponse, Ledger} from '../models/ledger.model';
import {LedgerService} from '../services/ledger.service';
import {Subscription} from 'rxjs/Subscription';
import {SharedLedgerService} from '../services/shared-ledger.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {returnLabel} from "../../../generic_function";
import { UsersService } from '../../../users/service/user.service';
import { CommonService } from '../../../shared/services/common.services';

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
    public calculatedOnList: any = [];
    public taxTypeList: any = [];
    public ledgerGroupList: any = [];
    companyId = localStorage.getItem('companyID');
    userId = localStorage.getItem('userID');
    showError = false;
    showSuccess = false;
    public userRightMenuData = {};
    constructor(
      private ledgerService: LedgerService,
      private ledgerSharedService: SharedLedgerService,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private router: Router,
      private userService: UsersService,
      private commonService: CommonService
    ) { }


    ngOnInit() {
        this.getCalculatedIn();
        this.getTaxType();
        this.ledgerForm();
        setTimeout(() => {
          this._route.params.subscribe((params) => {
            this.ledger_ID = params.id;
            this.getLedgerData();
          });
        }, 1000);

        this.getLedgerGroupList();
    }

    back(url){
      this.commonService.getNavigate(url);
    }

    getLedgerGroupList() {
      this.ledgerService.getLedgerGroupList().subscribe( res => {
        if (res.status === '200') {
          let data = res.data;
          for ( let i = 0; i < data.length; i++) {
            this.ledgerGroupList.push({label: data[i].ledgerGroupName, value: data[i].ledgerGroupID});
          }

        }
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
                this.lForm.controls['ledger_ID'].setValue(JSON.parse(this.ledger_ID));
                this.lForm.controls['gstRate'].setValue(this.ledger['gstRate']);
            }



            // console.log(this.ledger);

        });


    }

    ledgerForm() {
        this.lForm = this._formBuilder.group({
            ledger_ID: [0],
            ledgerName: ['', [Validators.required, Validators.minLength(4)]],
            ledgerGroupID: [0],
            rateofTax: [0, Validators.required],
            calculatedOn: ['', Validators.required],
            taxType: ['', Validators.required],
            company_ID: [this.companyId],
            uSerID: [this.userId],
            gstRate: [0],
        });
    }


    get ledgerName() { return this.lForm.get('ledgerName'); }
    get ledgerGroupID() { return this.lForm.get('ledgerGroupID'); }
    get rateofTax() { return this.lForm.get('rateofTax'); }
    get calculatedOn() { return this.lForm.get('calculatedOn'); }
    get taxType() { return this.lForm.get('taxType'); }
    get company_ID() { return this.lForm.get('company_ID'); }
    get uSerID() { return this.lForm.get('uSerID'); }
    get gstRate() { return this.lForm.get('gstRate'); }



    ngOnDestroy() {
        // this.ledgerDataSubscription.unsubscribe();
    }


    saveLedger(form: Ledger) {
        this.ledgerService.updateLedger(form).subscribe((res: LedgerResponse) => {
            if (res.status === '200') {
                this.showSuccess = true;
                setTimeout(() => {
                  this.router.navigate(['/masters/ledgers']);
                }, 3000);
            } else {
              this.showError = true;
            }
        });
    }

    getCalculatedIn() {
        this.ledgerService.getCalculatedOnList().subscribe(res => {
            if (res.status === '200') {
               this.calculatedOnList = returnLabel(res.data);
            }
        });
    }

    getTaxType() {
        this.ledgerService.getTaxtype().subscribe(res => {
            if (res.status === '200') {
                let data = res.data;
                for (let i = 0; i <  data.length; i++) {
                    // the property after data[i]. needs to match the exact name that is on your JSON file... So,
                    // name is a different property than Name
                    this.taxTypeList.push({label: data[i].taxtype, value: data[i].taxTypeID});
                }
               // this.taxTypeList = returnLabel(res.data);
            }
        });
    }

}
