import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators'
import {LoadingService} from "../shared/services/loading/loading.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private _loading: LoadingService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.params.get('update') !== 'true') {
      this._loading.setLoading(true, req.url);
    }
    return next.handle(req).pipe(
      finalize(() => this._loading.setLoading(false, req.url))
    );
  }
}
