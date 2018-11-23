import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as urls from '../../utils/app.urls';
import { map } from 'rxjs/operators';

@Injectable()

export class SalesService {
  constructor(private http: HttpClient) {}

  getSalesOrderVerification(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(urls.GETSALESORDERVERIFICATIONLIST, {params})
    .pipe(
      map( res => {
        return res;
      })
    );
  }

  getSalesGeneration(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(urls.GETSALESGENERATIONLIST, {params})
    .pipe(
      map( res => {
        return res;
      })
    );
  }

  authoriseSalesOrder(payload: any): Observable<any> {
    return this.http.post(urls.POSTSALESORDERVERIFICATION, payload).pipe(
      map( res => {
        return res;
      })
    );
  }

  authoriseSalesInvoice(payload: any): Observable<any> {
    return this.http.post(urls.POSTINVOICEGENERATION, payload).pipe(
      map( res => {
        return res;
      })
    );
  }

}
