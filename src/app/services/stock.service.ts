import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {InterceptorSkipHeader} from './token.interceptor';


@Injectable()
export class StockService {
  private BASE_URL = 'http://apietrax.iflotech.in/api';

  constructor(private http: HttpClient) {}

  getAllStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL + '/Stockitem/GetStockItems?CompanyID=1');
  }


}
