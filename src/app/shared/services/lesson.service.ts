import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {LastPayment} from "../../tutor-profile/models/tutor.model";
import {ResponseModel} from "../models/responseModel.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private url = `${environment.apiUrl}/lesson`


  constructor(
    private http: HttpClient
  ) { }


  endLesson(body: any): Observable<LastPayment[]> {
    return this.http.post<ResponseModel<LastPayment[]>>(`${this.url}/EndLesson`, body).pipe(
      map(data => data.result)
    );
  }

}
