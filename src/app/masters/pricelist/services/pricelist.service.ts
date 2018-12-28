import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {GETPRICELISTLIST, GETPRICELISTDETAIL, UPDATEPRICELIST, GETTAXTYPE,GETSTOCK_URL, GETCUSTOMERLIST} from '../../../../utils/app.urls';

@Injectable()
export class PricelistService {

    constructor(private http: HttpClient) {}

    getAllPricelists(PriceListTypeId,LedgerID): Observable<any> {
      const params = new HttpParams().set('CompanyID', '1')
        .set('PriceListTypeId', PriceListTypeId)
        .set('LedgerID', LedgerID);
      
      return this.http.get(GETPRICELISTLIST, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }

    getPricelistData(priceListId): Observable<any> {
      const params = new HttpParams().set('PriceListID', priceListId);
      return this.http.get(GETPRICELISTDETAIL, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }


    updatePricelist(payload: any): Observable<any> {
      return this.http.post(UPDATEPRICELIST, payload);
    }

    getTaxType(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(GETTAXTYPE, {params})
        .map((res: any) => {
            return res;
        }).catch((error) => Observable.throw('server Error.'));
    }
    getAllStocks(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(GETSTOCK_URL, {params}).pipe(
            map(res => {
            return res;
            })
        );
    }
    getAllCustomers(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(GETCUSTOMERLIST, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }
}
