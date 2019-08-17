import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import * as urls from "../../../utils/app.urls";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserList(): Observable<any> {
    const params = new HttpParams().set("CompanyID", "1");
    return this.http.get(urls.USERLIST, { params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }

  getUserType(): Observable<any> {
    const params = new HttpParams().set("CompanyID", "1");
    return this.http.get(urls.GETUSERTYPE, { params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }

  getUserMaster(): Observable<any> {
    return this.http.get(urls.GETUSERMASTER, {}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }

  getUserDetails(id): Observable<any> {
    const params = new HttpParams().set("UserID", id);
    return this.http.get(urls.GETUSERDETAILS, { params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }

  getUserTabDetails(userid, rightid): Observable<any> {
    const params = new HttpParams()
      .set("UserID", userid)
      .set("UserRightID", rightid);
    return this.http.get(urls.GETUSERTABDETAILS, { params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }

  getUserMenuDetails(userid, rightid): Observable<any> {
    const params = new HttpParams()
      .set("UserID", userid)
      .set("UserRightID", rightid);
    return this.http.get(urls.GETUSERMENUDETAILS, { params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }

  createUser(payload: any): Observable<any> {
    return this.http.post(urls.CREATEUSER, payload).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }

  createUserRights(payload: any): Observable<any> {
    return this.http.post(urls.UPDATEUSERMENURIGHTS, payload).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }
}
