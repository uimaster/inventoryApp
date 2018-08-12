import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {GETSTOCKGROUP_URL, UPDATESTOCKGROUPLIST} from '../../../../utils/app.urls';
import {StockGroup} from '../models/stock-group.model';


@Injectable()
export class StockGroupService {

    constructor(private http: HttpClient) {}

    getAllStockGroups(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(GETSTOCKGROUP_URL, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }



    updateStockGroup(payload: StockGroup): Observable<any> {
        // const params = new HttpParams().set('CompanyID', '1');
        return this.http.post(UPDATESTOCKGROUPLIST, payload);


    }



}
