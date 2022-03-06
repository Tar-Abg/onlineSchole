import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Subjects} from "../../tutor-view/models/tutor-view.model";
import {ResponseModel} from "../../shared/models/responseModel.model";
import {catchError, map} from "rxjs/operators";
import {StudentProfileInfoResponse, SubjectsResponse} from "../model/student-view.model";
import {Student} from "../../student-profile/models/student-profile.model";

@Injectable({
  providedIn: 'root'
})
export class StudentViewService {
  private readonly url = `${environment.apiUrl}/Tutor`;

  constructor(
    private http: HttpClient
  ) {
  }

  getStudentProfileInfo(userId: number, tutorId: number): Observable<Student> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('studentId', tutorId);
    return this.http.get<ResponseModel<StudentProfileInfoResponse>>(`${this.url}/GetStudentProfileInfo`, {params}).pipe(
      map(data => data.result.profileInfo),
      catchError(() => of( {} as Student))
    );
  }

  getStudentSubjects(userId: number, tutorId: number): Observable<Subjects[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('studentId', tutorId);
    return this.http.get<ResponseModel<SubjectsResponse>>(`${this.url}/GetStudentSubjects`, {params}).pipe(
      map(data => data.result.subjects)
    );
  }
}
