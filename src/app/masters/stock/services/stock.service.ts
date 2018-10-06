import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';


import * as urls from '../../../../utils/app.urls';


@Injectable()
export class StockService {

  constructor(private http: HttpClient) {}

  getAllStocks(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(urls.GETSTOCK_URL, {params}).pipe(
      map(res => {
        return res;
      })
    );
  }


  getStock(stockId: any): Observable<any> {
    const params = new HttpParams().set('StockItemID', stockId);
    return this.http.get(urls.GETSTOCKITEM, {params}).pipe(
        map(res => {
          return res;
        })
    );
  }


  updateStock(payload: any): Observable<any> {
      // const params = new HttpParams().set('CompanyID', '1');
      return this.http.post(urls.UPDATESTOCK, payload)
      .map((res: any) => {
          return res;
      })
      .catch((error) => Observable.throw('server Error.'));
  }

  getLocation(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(urls.LOCATIONURL, {params})
    .map((res: any) => {
        return res;
    })
    .catch((error) => Observable.throw('server Error.'));
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
