import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Ledger} from "../models/ledger.model";
@Injectable()
export class SharedLedgerService {
    public ledger = new Subject<any>();
    setLedger(value: Ledger) {
        this.ledger.next(value); //it is publishing this value to all the subscribers that have already subscribed to this message
    }
}