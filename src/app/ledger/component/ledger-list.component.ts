import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LedgerResponse} from "../models/ledger.model";
import {LedgerService} from "../services/ledger.service";

@Component({
    selector: 'app-unit-list',
    templateUrl: './ledger-list.component.html',
    styleUrls: ['./ledger-list.component.scss']
})
export class LedgerListComponent implements OnInit {

    public ledgerList;
    constructor( private ledgerService: LedgerService) { }

    ngOnInit() {
        this.getLedgerList();
    }

    getLedgerList() {
        this.ledgerService.getAllLedgers().subscribe((res: LedgerResponse) => {
            if (res && res.status == '200')  {
                this.ledgerList = res.data;
                //console.log(this.unitList);

            }
        });
    }


}
