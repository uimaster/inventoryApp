import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import * as urls from '../../../utils/app.urls';

@Injectable()
export class ReportsService {

    constructor(private http: HttpClient) {}

    getPOReportList(ReportTypeID,StockItemID,LedgerID,FromDate,ToDate): Observable<any> {
      const params = new HttpParams().set('ReportTypeID', ReportTypeID)
        .set('StockitemID', StockItemID).set('LedgerID', LedgerID)
        .set('FromDate', FromDate).set('ToDate', ToDate);
      return this.http.get(urls.POREPORT, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }

    getSOReportList(ReportTypeID,StockItemID,LedgerID,FromDate,ToDate): Observable<any> {
        const params = new HttpParams().set('ReportTypeID', ReportTypeID)
            .set('StockitemID', StockItemID).set('LedgerID', LedgerID)
            .set('FromDate', FromDate).set('ToDate', ToDate);
        return this.http.get(urls.SOREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getStockSummaryList(ReportTypeID,CompanyID,FromDate,ToDate): Observable<any> {
        const params = new HttpParams().set('REPORTTYPE', ReportTypeID)
            .set('CompanyID', CompanyID).set('FromDate', FromDate).set('ToDate', ToDate);
        return this.http.get(urls.STOCKSUMMARYREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getMSLReportList(CompanyID): Observable<any> {
        const params = new HttpParams().set('CompanyID', CompanyID);
        return this.http.get(urls.MSLREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getSalesRegisterList(CompanyID,FromDate,ToDate): Observable<any> {
        const params = new HttpParams().set('CompanyID', CompanyID).set('FromDate', FromDate).set('ToDate', ToDate);
        return this.http.get(urls.SALESREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getGRNRegisterList(CompanyID,FromDate,ToDate): Observable<any> {
        const params = new HttpParams().set('CompanyID', CompanyID).set('FromDate', FromDate).set('ToDate', ToDate);
        return this.http.get(urls.GRNREGISTER, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }
    
    getStockIssueRegisterList(CompanyID,FromDate,ToDate): Observable<any> {
        const params = new HttpParams().set('CompanyID', CompanyID).set('FromDate', FromDate).set('ToDate', ToDate);
        return this.http.get(urls.STOCKISSUEREGISTER, {params}).pipe(
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

    getAllSuppliers(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(urls.GETSUPPLIERLIST, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getAllCustomers(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(urls.GETCUSTOMERLIST, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }
}
