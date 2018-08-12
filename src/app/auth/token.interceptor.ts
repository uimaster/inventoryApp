import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';
import { LocalStorage } from '../../utils/localStorage';

@Injectable()


export class TokenInterceptor implements HttpInterceptor {
  public cachedRequests = [];

  constructor(private router: Router, public inj: Injector, public loaderInject: Injector) { }



  private applyCredentials = (req: HttpRequest<any>, token: string) => {
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'application/json, multipart/form-data, text/plain;charset=UTF-8',
        'X-Requested-With' : 'XMLHttpRequest',
        // 'DeviceType': '1'
      }
    });
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({headers}));
    }

    const auth = this.inj.get(AuthService);

    const authReq = this.applyCredentials(req, LocalStorage.getRefreshToken());

    return next.handle(authReq)

      .map((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {

          return event;

        }

      })

      .catch((error: any) => {

        if (error instanceof HttpErrorResponse) {
          console.log('error:', error);
          if (error.status === 401) {

            console.log('Unauthorized');
            localStorage.setItem('isLogin', 'false');
            return auth.refreshToken()

              .flatMap((res) => {
                if  (res.message === 'Success') {
                  LocalStorage.setRefreshToken(res.data[0].bearerToken);
                  return next.handle(this.applyCredentials(req, LocalStorage.getRefreshToken()));
                }
              });

          } else if (error.status === 403) { // log back in!!

            this.router.navigate(['/login']);

          }

        } else {

          return Observable.throw(error);

        }

      });

  }
}
