import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, filter, map, switchMap} from "rxjs/operators";
import {StorageService} from "../../shared/services/storage/storage.service";
import {ResponseModel} from "../../shared/models/responseModel.model";
import {SearchTutor, TutorSearchResponse} from "../models/search.model";

@Injectable({
  providedIn: 'root'
})
export class SearchTutorService {
  formValue$: BehaviorSubject<SearchTutor | null> = new BehaviorSubject<SearchTutor | null>(null);
  pageIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  tutorList$: Observable<TutorSearchResponse | null>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.tutorList$ = combineLatest([this.formValue$, this.pageIndex$]).pipe(
      filter(([formValue, pageIndex]) => !!formValue && !!pageIndex),
      switchMap(([formValue, pageNumber] ) => {
        return this.getTutors({...formValue, pageNumber}).pipe(
          catchError(() => of(null))
        );
      }),
    );
  }

  getTutors(body: any): Observable<TutorSearchResponse> {
    let params = new HttpParams();
    params = params.append('userId', this.storageService.getUserId());
    return this.http.post<ResponseModel<TutorSearchResponse>>(`${environment.apiUrl}/SearchUser/GetCertificatesPage`, body, {params: params}).pipe(
      map(data => data.result)
    );
  }
}
