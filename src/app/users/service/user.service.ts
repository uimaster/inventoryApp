import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import * as urls from "../../../utils/app.urls";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserList(): Observable<any> {
    const params = new HttpParams().set("CompanyID", "1");
    return this.http.get(urls.USERLIST, { params }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUserDetails(id): Observable<any> {
    const params = new HttpParams().set("UserID", id);
    return this.http.get(urls.GETUSERDETAILS, { params }).pipe(
      map((res: any) => {
        return res;
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
      })
    );
  }
}
