import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {StorageService} from "../shared/services/storage/storage.service";
import {AuthService} from "../shared/services/auth/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean;
  private accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = JSON.parse(this.storageService.getItem('auth_token'));

    return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
      catchError(err => {
        // in case of 401 http error
        if (err instanceof HttpErrorResponse && err.status === 401) {
          // get refresh tokens
          const refreshToken = JSON.stringify(this.storageService.getItem('refresh_token'));
          // if there are tokens then send refresh token request
          if (refreshToken && accessToken) {
            return this.refreshToken(req, next);
          }

          // otherwise logout and redirect to login page
          return this.logoutAndRedirect(err);
        }

        // in case of 403 http error (refresh token failed)
        if (err instanceof HttpErrorResponse && err.status === 403) {
          // logout and redirect to login page
          return this.logoutAndRedirect(err);
        }
        // if error has status neither 401 nor 403 then just return this error
        return throwError(err);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (token) {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return request;
  }

  private logoutAndRedirect(err: any): Observable<HttpEvent<any>> {
    this.authService.signOut().subscribe();
    this.router.navigateByUrl('/');

    return throwError(err);
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshingInProgress) {
      this.refreshingInProgress = true;
      this.accessTokenSubject.next(null);
      const refreshToken = JSON.parse(this.storageService.getItem('refresh_token'));
      return this.authService.refreshTokens(refreshToken).pipe(
        switchMap((res) => {
          this.refreshingInProgress = false;
          this.accessTokenSubject.next(res.token);
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, res.token));
        })
      );
    } else {
      // wait while getting new token
      return this.accessTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, token));
        }));
    }
  }
}
