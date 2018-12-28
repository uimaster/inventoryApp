import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import * as urls from '../../../utils/app.urls';

@Injectable()
export class PlanningService {

    constructor(private http: HttpClient) {}

    getFGList(FromDate,ToDate): Observable<any> {
      const params = new HttpParams().set('CompanyID', '1').set('FromDate', FromDate).set('ToDate', ToDate);
      return this.http.get(urls.GETFGLIST, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }

    getFGDetail(FGPlanID): Observable<any> {
      const params = new HttpParams().set('FGPlanID', FGPlanID);
      return this.http.get(urls.GETFGDETAIL, {params}).pipe(
          map(res => {
              return res;
          })
      );
    }


    updateFG(payload: any): Observable<any> {
      return this.http.post(urls.UPDATEFG, payload);
    }  
    
    getRMQList(FromDate,ToDate): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1').set('FromDate', FromDate).set('ToDate', ToDate);
        return this.http.get(urls.GETRMQLIST, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }

    getRMQDetail(RMQID): Observable<any> {
        const params = new HttpParams().set('RMQID', RMQID);
        return this.http.get(urls.GETRMQDETAIL, {params}).pipe(
            map(res => {
                return res;
            })
        );
    }


    updateRMQ(payload: any): Observable<any> {
        return this.http.post(urls.UPDATERMQ, payload);
    }  

    // getBomTypes(): Observable<any> {  
    //     const params = new HttpParams().set('CompanyID', '1');
    //     return this.http.get(urls.GETBOMTYPES, {params}).pipe(
    //         map(res => {
    //             return res;
    //         })
    //     );
    // }

    // getBomLevels(): Observable<any> {  
    //     const params = new HttpParams().set('CompanyID', '1');
    //     return this.http.get(urls.GETBOMLEVELS, {params}).pipe(
    //         map(res => {
    //             return res;
    //         })
    //     );
    // }

    // getBomComponentTypes(): Observable<any> {  
    //     const params = new HttpParams().set('CompanyID', '1');
    //     return this.http.get(urls.GETBOMCOMTYPES, {params}).pipe(
    //         map(res => {
    //             return res;
    //         })
    //     );
    // }

    // getParameterTypes(): Observable<any> {  
    //     const params = new HttpParams().set('CompanyID', '1');
    //     return this.http.get(urls.GETBOMPARATYPES, {params}).pipe(
    //         map(res => {
    //             return res;
    //         })
    //     );
    // }

    getAllStocks(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1');
        return this.http.get(urls.GETSTOCK_URL, {params}).pipe(
            map(res => {
            return res;
            })
        );
    }
}
