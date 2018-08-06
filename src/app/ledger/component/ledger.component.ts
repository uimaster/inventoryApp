import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LedgerResponse, Ledger} from "../models/ledger.model";
import {LedgerService} from "../services/ledger.service";
import {Subscription} from "rxjs/Subscription";
import {SharedLedgerService} from "../services/shared-ledger.service";

@Component({
    selector: 'app-ledger',
    templateUrl: './ledger.component.html',
    styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit, OnDestroy {

    public ledgerList;
    public ledgerDataSubscription: Subscription;
    constructor( private ledgerService: LedgerService, private ledgerSharedService: SharedLedgerService) { }

    ngOnInit() {
       // this.getLedgerData();
    }

    getLedgerData() {
        // this.ledgerDataSubscription = this.ledgerSharedService.ledger.subscribe((res: Ledger) => {
        //    console.log(res);
        // });
    }

    ngOnDestroy() {
        //this.ledgerDataSubscription.unsubscribe();
    }


}
