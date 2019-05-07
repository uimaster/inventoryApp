import {GETASSEMBLYINSTRUCTIONLIST, GETWORKINSTRUCTIONDETAILSFORITEM} from "./../../../utils/app.urls";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {POSTWORKINSTRUCTIONDETAILS, GETWORKINSTRUCTIONLIST, GETWORKINSTRUCTIONDETAILS, GETASSEMBLER} from '../../../utils/app.urls';

@Injectable()
export class WorkInstructionService {
    constructor(private http : HttpClient) {}

    getWorkInstructionList(): Observable<any> {
        const params = new HttpParams().set('CompanyID', '1').set('FromDate', '01-03-2019').set('ToDate', '15-04-2019');
        return this.http.get(GETWORKINSTRUCTIONLIST, {params}).pipe(tap(res => {
            return res;
        }), catchError(err => {
            console.log(err);
            return of(null);
        }));
    }

    getWorkInstructionDetailsForItem(itemId): Observable<any> {
        const params = new HttpParams().set('StockItemId', itemId);
        return this.http.get(GETWORKINSTRUCTIONDETAILSFORITEM, {params}).pipe(tap(res => {
            return res;
        }), catchError(err => {
            console.log(err);
            return of(null);
        }));
    }

    getWorkInstructionDetails(): Observable<any> {
        const assemblyId = localStorage.getItem('AssemblyWorkInstructionID');
        const params = new HttpParams().set('AssemblyWorkInstructionID', assemblyId);
        return this.http.get(GETWORKINSTRUCTIONDETAILS, {params}).pipe(tap(res => {
            return res;
        }), catchError(err => {
            console.log(err);
            return of(null);
        }));
    }

    postWorkInstructionDetails(payload): Observable<any> {
        return this.http.post(POSTWORKINSTRUCTIONDETAILS, payload).pipe(tap(res => {
            return res;
        }), catchError(err => {
            console.log(err);
            return of(null);
        }));
    }

    getAssembler(id) {
        const params = new HttpParams().set('AssemblerCode', id);
        return this.http.get(GETASSEMBLER, {params}).pipe(tap(res => {
            return res;
        }), catchError(err => {
            console.log(err);
            return of(null);
        }));
    }


}
