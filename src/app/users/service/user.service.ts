import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import * as urls from '../../../utils/app.urls';
import { map } from 'rxjs/operators';

@Injectable()

export class UsersService {
  constructor( private http: HttpClient) {}

  getUserList() {
    const params = new HttpParams().set('CompanyID', '1');
    return this.http.get(urls.USERLIST, { params}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUserDetails(id) {
    const params = new HttpParams().set('UserID', id);
    return this.http.get( urls.GETUSERDETAILS, {params}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
