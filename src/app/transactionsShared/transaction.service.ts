import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import * as urls from './../../utils/app.urls';
import { DOWNLOADREPORT } from '../../utils/app.urls';

@Injectable()

export class TransactionServices {
  date = new Date();
  today = [
    ('0' + this.date.getDate()).slice(-2),
    ('0' + (this.date.getMonth() + 1)).slice(-2),
    this.date.getFullYear(),
  ].join('/');

  constructor(  private http: HttpClient) {}

  // GET TRANSACTION LIST //
  getTransactionList(typeId, dates, searchtxt?): Observable<any> {
    var starDate = '';
    var toDate = '';
    var SearchText = localStorage.getItem('t_searchText') || '';

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
    const params = new HttpParams().set('CompanyID', '1').set('TransactionTypeID', typeId).set('FromDate', starDate)
    .set('ToDate', toDate).set('SearchText', SearchText);
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

  getPendingGRNList(LedgerID,TransactionID): Observable<any> {
    let url = '';
    const rollbackurl = localStorage.getItem('rollBackUrl');
    url = urls.GETPENDINGGRNLIST;
    const params = new HttpParams().set('LedgerID', LedgerID).set('TransactionID', TransactionID);
    return this.http.get(url, {params})
    .map((res: any) => {
        return res;
    })
    .catch((error) => Observable.throw('server Error.'));
  }

  getPendingReturanbleDCList(): Observable<any> {
    let url = '';
    url = urls.GETPENDINGRETURANBLEDCLIST;
    const params = new HttpParams().set('CompanyID', '1');
    //.set('TransactionID', TransactionID);
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

  validateBatch(itemcode, batchcode, type) {
    const params = new HttpParams().set('ITEMCODE', itemcode).set('BATCHNO', batchcode).set('TRTRYPE', type);
    return this.http.get(urls.VALIDATEBATCH, {params}).pipe(
      map((res: any)  => {
        return res;
      })
    );
  }

  getTransactionTypeSeries() {
    const transactionType = localStorage.getItem('transactionTypeId');
    const params = new HttpParams().set('TransactionTypeID', transactionType);
    return this.http.get(urls.GETTRANSACTIONTYPESERIES, {params}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getItemRate(stockItemId, ledgerId) {
    const params = new HttpParams().set('LedgerID', ledgerId).set('StockItemID', stockItemId);
    return this.http.get(urls.GETITEMSRATE, {params}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getItemBarcodeStatus(ItemCode, ledgerId) {
    const params = new HttpParams().set('LedgerID', ledgerId).set('ItemCode', ItemCode);
    return this.http.get(urls.GETBARCODESTATUS, {params}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  getLedgerLocation(ledgerId) {
    const params = new HttpParams().set('LedgerID', ledgerId);
    return this.http.get(urls.GETLEDGERLOCATION, {params}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getTransactionLinkItems(payload: any): Observable<any> {
    return this.http.post(urls.GETTRANSACTIONLINKITEMS, payload)
    .map((res: any) => {
      return res;
    })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  UpdateTransactionPurchase(payload: any): Observable<any> {
    return this.http.post(urls.UPDATETRANSACTIONPURCHASE, payload)
    .map((res: any) => {
      return res;
    })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  deleteTransaction(payload: any): Observable<any> {

    const params = new HttpParams().set('TransactionID', payload.TransactionID).set('DeleteRemarks', 'delete').set('UserID', payload.UserID);

    return this.http.delete(urls.DELETETRANSACTION, {params})
    .map((res: any) => {
      return res;
    })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

}
