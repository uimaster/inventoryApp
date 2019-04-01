import { GETASSEMBLYINSTRUCTIONLIST, GETWORKINSTRUCTIONDETAILSFORITEM} from "./../../../utils/app.urls";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class WorkInstructionService {
  constructor(private http: HttpClient) {}

  getWorkInstructionList(): Observable<any> {
    return this.http.get(GETASSEMBLYINSTRUCTIONLIST).pipe(
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
    const params = new HttpParams().set('StockItemId', itemId);
    return this.http.get(GETWORKINSTRUCTIONDETAILSFORITEM, {params}).pipe(
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
