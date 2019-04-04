import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import * as urls from '../../../../utils/app.urls';

@Injectable()
export class AssemblyInstructionService {

    constructor(private http: HttpClient) {}

    getAssemblyInstructionList(): Observable<any> {
      const params = new HttpParams().set('CompanyID', '1');
      return this.http.get(urls.GETASSEMBLYINSTRUCTIONLIST, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }

    getDetails(aiID): Observable<any> {
      const params = new HttpParams().set('AssemblyInstructionID', aiID);
      return this.http.get(urls.GETASSEMBLYINSTRUCTIONDETAILS, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }

    updateAI(payload: any): Observable<any> {
      return this.http.post(urls.POSTASSEMBLYINSTRUCTIONDETAILS, payload);
    }   

    getAllStocks(StockGroupID) {
        const params = new HttpParams().set('CompanyID', '1').set('StockGroupID', StockGroupID);
        return this.http.get(urls.GETSTOCKITEMGROUP, {params})
        .map((res: any) => {
            return res;
        })
        .catch((error) => Observable.throw('server Error.'));
    }

    getFGItemBOMList(stockItemID): Observable<any> {
        const params = new HttpParams().set('StockitemID', stockItemID);
        return this.http.get(urls.GETFGITEMBOMLIST, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }
}
