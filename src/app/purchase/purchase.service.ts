import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { GETTRANSACTION, POSTTRANSACTION} from './../../utils/app.urls';

@Injectable()

export class PurchaseService {
  constructor(  private http: HttpClient) {}

  getPurchaseList(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1').set('TransactionTypeID', '1');
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

}
