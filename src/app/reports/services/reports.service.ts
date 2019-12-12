import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import * as urls from '../../../utils/app.urls';

@Injectable()
export class ReportsService {

    constructor(private http: HttpClient) {}

    getPOReportList(ReportTypeID,StockItemID,LedgerID,FromDate,ToDate,SearchText): Observable<any> {
      const params = new HttpParams().set('ReportTypeID', ReportTypeID)
        .set('StockitemID', StockItemID).set('LedgerID', LedgerID)
        .set('FromDate', FromDate).set('ToDate', ToDate).set('SearchText', SearchText);
      return this.http.get(urls.POREPORT, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }

    getSOReportList(ReportTypeID,StockItemID,LedgerID,FromDate,ToDate,TransactionSeriesID,SearchText): Observable<any> {
        const params = new HttpParams().set('ReportTypeID', ReportTypeID)
            .set('StockitemID', StockItemID).set('LedgerID', LedgerID)
            .set('TransactionSeriesID', TransactionSeriesID)
            .set('SearchText', SearchText)
            .set('FromDate', FromDate).set('ToDate', ToDate);
        return this.http.get(urls.SOREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getDespatchDetailsReportList(FromDate,ToDate,TransactionSeriesID,SearchText,DespatchReportsTypeID): Observable<any> {
        const params = new HttpParams().set('FromDate', FromDate).set('ToDate', ToDate)
            .set('TransactionSeriesID', TransactionSeriesID)
            .set('SearchText', SearchText)
            .set('ReportTypeID',DespatchReportsTypeID);
        return this.http.get(urls.DESPATCHDETAILSREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getDespatchSummaryReportList(FromDate,ToDate,TransactionSeriesID,SearchText,DespatchReportsTypeID): Observable<any> {
        const params = new HttpParams().set('FromDate', FromDate).set('ToDate', ToDate)
            .set('TransactionSeriesID', TransactionSeriesID)
            .set('SearchText', SearchText)
            .set('ReportTypeID',DespatchReportsTypeID);
        return this.http.get(urls.DESPATCHSUMMARYREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getPCBDetailsReportList(FromDate,ToDate): Observable<any> {
        const params = new HttpParams().set('FromDate', FromDate).set('ToDate', ToDate);
        return this.http.get(urls.PCBDETAILSREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getSupplierReviewDueReportList(FromDate,ToDate): Observable<any> {
        const params = new HttpParams().set('FromDate', FromDate).set('ToDate', ToDate);
        return this.http.get(urls.SUPPLIERDUEFORREVIEWREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getSODetailsReportList(FromDate,ToDate,ReportTypeID,TransactionSeriesID,SearchText): Observable<any> {
        const params = new HttpParams().set('FromDate', FromDate).set('ToDate', ToDate)
            .set('ReportTypeID', ReportTypeID)
            .set('TransactionSeriesID', TransactionSeriesID)
            .set('SearchText', SearchText);
        return this.http.get(urls.SODETAILSREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getStockSummaryList(ReportTypeID,CompanyID,FromDate,ToDate,StockItemID,LocationID): Observable<any> {
        const params = new HttpParams().set('REPORTTYPE', ReportTypeID)
            .set('CompanyID', CompanyID).set('FromDate', FromDate)
            .set('ToDate', ToDate)
            .set('StockItemID', StockItemID)
            .set('LocationID', LocationID);
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

    getSalesRegisterList(CompanyID,FromDate,ToDate,LedgerID,SearchText): Observable<any> {
        const params = new HttpParams().set('CompanyID', CompanyID)
            .set('FromDate', FromDate)
            .set('ToDate', ToDate)
            .set('LedgerID', LedgerID)
            .set('SearchText', SearchText);
        return this.http.get(urls.SALESREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getGRNRegisterList(CompanyID,FromDate,ToDate,StockItemID,LedgerID,SearchText): Observable<any> {
        const params = new HttpParams().set('CompanyID', CompanyID)
            .set('FromDate', FromDate).set('ToDate', ToDate)
            .set('StockItemID', StockItemID)
            .set('LedgerID', LedgerID)
            .set('SearchText', SearchText);
        return this.http.get(urls.GRNREGISTER, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getStockItemDetailsList(CompanyID,FromDate,ToDate,StockItemID,ReportTypeID,SearchText): Observable<any> {
        const params = new HttpParams().set('CompanyID', CompanyID)
            .set('FromDate', FromDate).set('ToDate', ToDate)
            .set('StockItemID', StockItemID)
            .set('ReportType', ReportTypeID)
            .set('SearchText', SearchText);
        return this.http.get(urls.STOCKITEMDETAILSREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getBatchDetailsList(CompanyID,FromDate,ToDate,StockItemID,ReportTypeID,SearchText): Observable<any> {
        const params = new HttpParams().set('CompanyID', CompanyID)
            .set('FromDate', FromDate).set('ToDate', ToDate)
            .set('StockItemID', StockItemID)
            .set('ReportType', ReportTypeID)
            .set('BatchNo', SearchText);
           // .set('SearchText', SearchText);
        return this.http.get(urls.BATCHDETAILSREPORT, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }
    
    getStockIssueRegisterList(CompanyID,FromDate,ToDate,StockItemID,SearchText): Observable<any> {
        const params = new HttpParams().set('CompanyID', CompanyID).set('FromDate', FromDate)
            .set('ToDate', ToDate)
            .set('StockItemID', StockItemID)
            .set('SearchText', SearchText);
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

    getAllLocations(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(urls.LOCATIONURL, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }
}
