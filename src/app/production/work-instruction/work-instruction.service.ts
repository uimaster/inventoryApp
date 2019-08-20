import {
  GETASSEMBLYINSTRUCTIONLIST,
  GETWORKINSTRUCTIONDETAILSFORITEM
} from "./../../../utils/app.urls";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import {
  POSTWORKINSTRUCTIONDETAILS,
  GETWORKINSTRUCTIONLIST,
  GETWORKINSTRUCTIONDETAILS,
  GETASSEMBLER
} from "../../../utils/app.urls";

@Injectable()
export class WorkInstructionService {
  date = new Date();
  today = [
    ("0" + this.date.getDate()).slice(-2),
    ("0" + (this.date.getMonth() + 1)).slice(-2),
    this.date.getFullYear()
  ].join("/");

  constructor(private http: HttpClient) {}

  getWorkInstructionList(dates): Observable<any> {
    var starDate = "";
    var toDate = "";
    if (dates !== "") {
      starDate = dates[0];
    } else {
      starDate = this.today;
    }
    if (dates !== "") {
      toDate = dates[1];
    } else {
      toDate = this.today;
    }
    const params = new HttpParams()
      .set("CompanyID", "1")
      .set("FromDate", starDate)
      .set("ToDate", toDate);
    return this.http.get(GETWORKINSTRUCTIONLIST, { params }).pipe(
      tap(res => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getWorkInstructionDetailsForItem(itemId): Observable<any> {
    const params = new HttpParams().set("StockItemId", itemId);
    return this.http.get(GETWORKINSTRUCTIONDETAILSFORITEM, { params }).pipe(
      tap(res => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getWorkInstructionDetails(): Observable<any> {
    const assemblyId = localStorage.getItem("AssemblyWorkInstructionID");
    const params = new HttpParams().set(
      "AssemblyWorkInstructionID",
      assemblyId
    );
    return this.http.get(GETWORKINSTRUCTIONDETAILS, { params }).pipe(
      tap(res => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  postWorkInstructionDetails(payload): Observable<any> {
    return this.http.post(POSTWORKINSTRUCTIONDETAILS, payload).pipe(
      tap(res => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getAssembler(id) {
    const params = new HttpParams().set("AssemblerCode", id);
    return this.http.get(GETASSEMBLER, { params }).pipe(
      tap(res => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }
}
