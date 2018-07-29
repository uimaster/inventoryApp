import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { GETSTOCK_URL } from '../../shared/app.urls';


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


}
