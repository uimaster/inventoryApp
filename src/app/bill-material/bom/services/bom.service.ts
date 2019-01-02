import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import * as urls from '../../../../utils/app.urls';

@Injectable()
export class BomService {

    constructor(private http: HttpClient) {}

    getAllBoms(): Observable<any> {
      const params = new HttpParams().set('CompanyID', '1');
      return this.http.get(urls.GETBOMLIST, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }

    getBomData(bomId): Observable<any> {
      const params = new HttpParams().set('BomID', bomId);
      return this.http.get(urls.GETBOMDETAIL, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }


    updateBom(payload: any): Observable<any> {
      return this.http.post(urls.UPDATEBOM, payload);
    }   

    getBomTypes(): Observable<any> {  
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(urls.GETBOMTYPES, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getBomLevels(): Observable<any> {  
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(urls.GETBOMLEVELS, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getBomComponentTypes(): Observable<any> {  
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(urls.GETBOMCOMTYPES, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getParameterTypes(): Observable<any> {  
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(urls.GETBOMPARATYPES, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getAllStocks(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(urls.GETSTOCK_URL, {params}).pipe(
            map(res => {
            return res;
            })
        );
    }
}
