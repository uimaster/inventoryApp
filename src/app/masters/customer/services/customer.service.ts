import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {GETCUSTOMERLIST, GETCUSTOMERDETAIL, UPDATECUSTOMER, GETTAXTYPE, GETSTATEURL} from '../../../../utils/app.urls';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) {}

    getAllCustomers(): Observable<any> {
      const params = new HttpParams().set('CompanyID', '1');
      return this.http.get(GETCUSTOMERLIST, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }

    getCustomerData(customerId): Observable<any> {
      const params = new HttpParams().set('CustomerID', customerId);
      return this.http.get(GETCUSTOMERDETAIL, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }


    updateCustomer(payload: any): Observable<any> {
      return this.http.post(UPDATECUSTOMER, payload);
    }

    // GET CURRENCY LIST //
    getTaxType(): Observable<any> {
      const params = new HttpParams().set('CompanyID', '1');
      return this.http.get(GETTAXTYPE, {params})
      .map((res: any) => {
          return res;
      })
      .catch((error) => Observable.throw('server Error.'));
    }

    getStates() {
      return this.http.get(GETSTATEURL).pipe(
        map((res: any) => {
          return res;
        })
      );
    }
}
