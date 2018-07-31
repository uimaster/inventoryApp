import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { LoginRequest, LoginResponse } from '../models/user.model';
import { InterceptorSkipHeader} from './token.interceptor';
import { LOGIN_URL } from '../../shared/app.urls';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(payload: LoginRequest): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(payload.username + ':' + payload.password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append(InterceptorSkipHeader, '');
    return this.http.post(LOGIN_URL, payload, {headers: headers})
    .map((res: LoginResponse) => {
      if (res) {
          return res;
      }
    })
    .catch((error) => Observable.throw('server Error.'));
  }


}
