import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import * as urls from './../../utils/app.urls';
import { DOWNLOADREPORT } from '../../utils/app.urls';

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
    var starDate = '';
    var toDate = '';

    if (localStorage.getItem('fromDate') !== '') {
      starDate = JSON.parse(localStorage.getItem('fromDate'));
    } else {
      starDate = this.today;
    }
    if (localStorage.getItem('toDate') !== '') {
      toDate = JSON.parse(localStorage.getItem('toDate'));
    } else {
      toDate = this.today;
    }
    const params = new HttpParams().set('CompanyID', '1').set('TransactionTypeID', typeId).set('FromDate', starDate)
    .set('ToDate', toDate);
    return this.http.get(urls.GETTRANSACTION, {params}).pipe(
      map(res => {
        return res;
      })
    );
  }


  // GET TRANSACTION LIST //
  getItemList(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(urls.GETITEMLIST, {params}).pipe(
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

  generateReport(id) {
    const transactionType = localStorage.getItem('transactionTypeId');
    const params = new HttpParams().set('TransactionID', id).set('ReportTypeID', transactionType);
    return this.http.get(urls.GENERATEREPORT, {params}).pipe(
      map((res: any) => {
        return res;
      })
    ).catch((error) => Observable.throw(error.JSON || 'Server Error !'));
  }

  validateBatch(itemcode, batchcode) {
    const params = new HttpParams().set('ITEMCODE', itemcode).set('BATCHNO', batchcode).set('TRTRYPE', '2');
    return this.http.get(urls.VALIDATEBATCH, {params}).pipe(
      map((res: any)  => {
        return res;
      })
    );
  }

  // StockItem/GetValidateBatch?ITEMCODE=91HW0007&BATCHNO=0000118&TRTRYPE=2

}
