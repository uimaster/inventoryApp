import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {GETUNIT_URL, UPDATEUNITLIST} from '../../../../utils/app.urls';
import {Unit} from '../models/unit.model';


@Injectable()
export class UnitService {

  constructor(private http: HttpClient) {}

  getAllUnits(): Observable<any> {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(GETUNIT_URL, {params}).pipe(
      map(res => {
        return res;
      })
    );
  }


  updateUnit(payload: Unit): Observable<any> {
    // const params = new HttpParams().set('CompanyID', '1');
    return this.http.post(UPDATEUNITLIST, payload);
    // .map((res: UPDATEUNITLIST) => {
    //     if (res) {
    //         return res;
    //     }
    // })
    // .catch((error) => Observable.throw('server Error.'));
  }


}
