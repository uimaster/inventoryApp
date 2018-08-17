import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {GETSUPPLIERLIST} from '../../../../utils/app.urls';

@Injectable()
export class SupplierService {

    constructor(private http: HttpClient) {}

    getAllSuppliers(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(GETSUPPLIERLIST, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    // getCustomerData(customerId): Observable<any> {
    //
    //     const params = new HttpParams().set('CustomerID', customerId);
    //     return this.http.get(GETCUSTOMERDETAIL, {params}).pipe(
    //         map(res => {
    //             return res;
    //         })
    //     );
    //
    //
    // }





}
