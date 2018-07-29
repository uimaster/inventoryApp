import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {InterceptorSkipHeader} from './token.interceptor';
import { LOGIN_URL } from '../../shared/app.urls';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(username: string, password: string): Observable<any> {
    debugger;
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append(InterceptorSkipHeader, '');
    // const url = `${this.BASE_URL}/jwtauth/Token`;
    return this.http.post<User>(LOGIN_URL, {username, password}, {headers: headers});
  }


}
