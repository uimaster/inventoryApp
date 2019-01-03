import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import * as urls from '../../../utils/app.urls';

@Injectable()
export class ReportsService {

    constructor(private http: HttpClient) {}

    getPOReportList(ReportTypeID,StockitemID,LedgerID,FromDate,ToDate): Observable<any> {
      const params = new HttpParams().set('ReportTypeID', ReportTypeID)
        .set('StockitemID', StockitemID).set('LedgerID', LedgerID)
        .set('FromDate', FromDate).set('ToDate', ToDate);
      return this.http.get(urls.POREPORT, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }

    getStockItemList(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1').set('TransactionTypeID', '1');
        return this.http.get(urls.STOCKITEMLIST, {params}).pipe(
            map(res => {
            return res;
            })
        );
    }
}
