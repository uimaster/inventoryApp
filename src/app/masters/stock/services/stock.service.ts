import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {GETSTOCK_URL, GETSTOCKITEM, UPDATESTOCK} from '../../../../utils/app.urls';

@Injectable()
export class StockService {

  constructor(private http: HttpClient) {}

  getAllStocks(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(GETSTOCK_URL, {params}).pipe(
      map(res => {
        return res;
      })
    );
  }


  getStock(stockId: any): Observable<any> {
    const params = new HttpParams().set('StockItemID',stockId);
    return this.http.get(GETSTOCKITEM, {params}).pipe(
        map(res => {
          return res;
        })
    );
  }


    updateStock(payload: any): Observable<any> {
        // const params = new HttpParams().set('CompanyID', '1');
        return this.http.post(UPDATESTOCK, payload);
        // .map((res: LedgerResponse) => {
        //     if (res) {
        //         return res;
        //     }
        // })
        // .catch((error) => Observable.throw('server Error.'));
    }


}
