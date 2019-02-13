import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import * as urls from './../../utils/app.urls';

@Injectable()

export class PurchaseService {
  date = new Date();
  today = [
    ('0' + this.date.getDate()).slice(-2),
    ('0' + (this.date.getMonth() + 1)).slice(-2),
    this.date.getFullYear(),
  ].join('/');

  constructor(  private http: HttpClient) {}

  getPurchaseList(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1').set('TransactionTypeID', '1').set('FromDate', '20/07/2018')
    .set('ToDate', this.today);
    return this.http.get(urls.GETTRANSACTION, {params}).pipe(
      map(res => {
        return res;
      })
    );
  }

  addPurchaseOrder(payload: any): Observable<any> {
    return this.http.post(urls.POSTTRANSACTION, payload)
    .map((res: any) => {
      return res;
    })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  getPurchaseDetails(id: any): Observable<any> {
    const params = new HttpParams().set('TransactionID', id);
    return this.http.get(urls.GETTRANSACTIONDETAILS, {params})
    .map((res: any) => {
      return res;
    })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  getPOAuthList(dates): Observable<any> {
    var starDate = '';
    var toDate = '';

    if (dates !== '') {
      starDate = dates[0];
    } else {
      starDate = this.today;
    }
    if (dates !== '') {
      toDate = dates[1];
    } else {
      toDate = this.today;
    }

    const params = new HttpParams().set('CompanyID', '1').set('FromDate', starDate).set('ToDate', toDate);

    return this.http.get(urls.GETPOAUTHLIST, {params})
      .map((res: any) => {
        return res;
      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  pOAuthrize(payload: any): Observable<any> {
    return this.http.post(urls.POSTPOAUTHLIST, payload).map ((res: any) => {
      return res;
    })
    .catch((error) => Observable.throw(error.json() || 'Server Error'));
  }

  getCurrency(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(urls.CURRENCYLISTURL, {params})
    .map((res: any) => {
        return res;
    })
    .catch((error) => Observable.throw('server Error.'));
  }

}
