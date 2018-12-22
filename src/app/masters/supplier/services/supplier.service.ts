import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {GETSUPPLIERLIST, GETSUPPLIERDETAIL, UPDATESUPPLIER} from '../../../../utils/app.urls';

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

    getSupplierData(supplierID): Observable<any> {

        const params = new HttpParams().set('SupplierID', supplierID);
        return this.http.get(GETSUPPLIERDETAIL, {params}).pipe(
            map(res => {
                return res;
            })
        );


    }


    updateSupplier(payload: any): Observable<any> {
        return this.http.post(UPDATESUPPLIER, payload);
    }





}
