import { Injectable } from '@angular/core';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {StorageService} from "../shared/services/storage/storage.service";


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) { }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(this.storageService.getItem('auth_token'));
    const bearer = `Bearer ${token}`; // this.anyService.getToken();

    if (token && !request.url.includes('/RefreshToken')) {
      request = request.clone({
        setHeaders: {
          'Authorization': bearer,
        }
      });
    }

    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
          }
        }, error => {
          // Hadle Errors
        })
      );
  };
}
