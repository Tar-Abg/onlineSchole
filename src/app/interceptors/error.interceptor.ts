import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators'
import {MessageService} from "../shared/services/message/message.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 422 && error.status !== 401 && error.status !== 403) {
            if (error.error.title) {
              this.messageService.setNewError(error.error.title);
            } else {
              this.messageService.setNewError('Something went wrong')
            }
          }
          return throwError(error);
        })
      );
  }
}
