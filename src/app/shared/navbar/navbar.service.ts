import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { GETNOTIFICATION } from '../../../utils/app.urls';

@Injectable()

export class NotificationService {
  constructor ( private http: HttpClient) {}

  getNotification(): Observable<any> {
    return this.http.get(GETNOTIFICATION).pipe(
      map(res => {
        return res;
      })
      // catchError(err => {
      //   console.log(err);
      //   return err;
      // })
    );
  }
}
