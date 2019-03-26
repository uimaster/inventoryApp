import { UPDATENOTIFICATION } from './../../../utils/app.urls';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { GETNOTIFICATION } from '../../../utils/app.urls';

@Injectable()

export class NotificationService {
  constructor ( private http: HttpClient) {}

  getNotification(): Observable<any> {
    const userId = localStorage.getItem('userID');
    const params = new HttpParams().set('UserID', userId);
    return this.http.get(GETNOTIFICATION, {params}).pipe(
      map(res => {
        return res;
      })
    );
  }

  updateNotification(payload): Observable<any> {
    const params = new HttpParams().set('NotificationUserID', payload);
    return this.http.get(UPDATENOTIFICATION, {params}).pipe(
      map(res => {
        return res;
      })
    );
  }
}
