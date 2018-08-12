import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorage {

  constructor() {
  }
  static getRefreshToken(): string {
    return localStorage.getItem('token');
  }

  static setRefreshToken(refreshToken: string) {
    localStorage.setItem('token', refreshToken);
  }
}
