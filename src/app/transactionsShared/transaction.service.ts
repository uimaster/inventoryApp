import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import * as urls from './../../utils/app.urls';

@Injectable()

export class TransactionSerivices {
  date = new Date();
  today = [
    ('0' + this.date.getDate()).slice(-2),
    ('0' + (this.date.getMonth() + 1)).slice(-2),
    this.date.getFullYear(),
  ].join('/');

  constructor(  private http: HttpClient) {}

  // GET TRANSACTION LIST //
  getTransactionList(typeId): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1').set('TransactionTypeID', typeId).set('FromDate', '20/07/2018')
    .set('ToDate', this.today);
    return this.http.get(urls.GETTRANSACTION, {params}).pipe(
      map(res => {
        return res;
      })
    );
  }

  // ADD TRANSACTION DETAILS//
  AddTransaction(payload: any): Observable<any> {
    return this.http.post(urls.POSTTRANSACTION, payload)
    .map((res: any) => {
      return res;
    })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  // GET TRANSACTION DETAILS //
  getTransactionDetails(id: any): Observable<any> {
    const params = new HttpParams().set('TransactionID', id);
    return this.http.get(urls.GETTRANSACTIONDETAILS, {params})
    .map((res: any) => {
      return res;
    })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  // GET CURRENCY LIST //
  getCurrency(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(urls.CURRENCYLISTURL, {params})
    .map((res: any) => {
        return res;
    })
    .catch((error) => Observable.throw('server Error.'));
  }

  // GET CURRENCY LIST //
  getTaxType(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(urls.GETTAXTYPE, {params})
    .map((res: any) => {
        return res;
    })
    .catch((error) => Observable.throw('server Error.'));
  }

   // GET getPendingPOList LIST //
   getPendingPOList(): Observable<any> {

    let url = '';
    const rollbackurl = localStorage.getItem('rollBackUrl');

    if (rollbackurl === '/sales/packingList') {
      url = urls.GETPENDINGSALESORDERLIST;
    } else {
      url = urls.GETPENDINGPOLIST;
    }

    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(url, {params})
    .map((res: any) => {
        return res;
    })
    .catch((error) => Observable.throw('server Error.'));
  }

   // GET getPendingSalesOrderList LIST //
  //  getPendingSalesOrderList(): Observable<any> {
  //   const params = new HttpParams().set('CompanyID', '1');
  //   return this.http.get(urls.GETPENDINGSALESORDERLIST, {params})
  //   .map((res: any) => {
  //       return res;
  //   })
  //   .catch((error) => Observable.throw('server Error.'));
  // }

}
