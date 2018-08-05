import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {GETLEDGERLIST} from '../../shared/app.urls';


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


}
