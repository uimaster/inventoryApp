import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {GETLEDGERLIST, UPDATELEDGERLIST} from '../../shared/app.urls';
import {Ledger, LedgerResponse} from "../models/ledger.model";


@Injectable()
export class LedgerService {

    constructor(private http: HttpClient) {}

    getAllLedgers(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(GETLEDGERLIST, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }


    updateLedger(payload:Ledger): Observable<any> {
       // const params = new HttpParams().set('CompanyID', '1');
        return this.http.post(UPDATELEDGERLIST, payload);
            // .map((res: LedgerResponse) => {
            //     if (res) {
            //         return res;
            //     }
            // })
            // .catch((error) => Observable.throw('server Error.'));
    }


}
