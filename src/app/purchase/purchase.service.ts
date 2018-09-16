import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { GETTRANSACTION, POSTTRANSACTION, GETTRANSACTIONDETAILS} from './../../utils/app.urls';

@Injectable()

export class PurchaseService {

  constructor(  private http: HttpClient) {}

  getPurchaseList(): Observable<any> {

    var date = new Date();
    var today = [
      ('0' + date.getDate()).slice(-2),
      ('0' + (date.getMonth() + 1)).slice(-2),
      date.getFullYear(),
    ].join('-');

    const params = new HttpParams().set('CompanyID', '1').set('TransactionTypeID', '1').set('FromDate', '20/07/2018').set('ToDate', today);
    return this.http.get(GETTRANSACTION, {params}).pipe(
      map(res => {
        return res;
      })
    );
  }

  addPurchaseOrder(payload: any): Observable<any> {
    return this.http.post(POSTTRANSACTION, payload)
      .map((res: any) =>  {
        if (res.status_code === '200') {
          return res;
        } else {
          return res;
        }

      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  getPurchaseDetails(id: any): Observable<any> {
    const params = new HttpParams().set('TransactionID', id);
    return this.http.get(GETTRANSACTIONDETAILS, {params})
      .map((res: any) => {
        if (res.status === 200) {
          return res;
        } else {
          return res;
        }
      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

}
