import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../shared/models/responseModel.model";
import {map} from "rxjs/operators";
import {Student, StudentSubject, StudentTutors} from "../models/student-profile.model";
import {environment} from "../../../environments/environment";
import {Lesson, LessonHistory, LessonRequest, LessonSchedule} from "../../tutor-profile/models/tutor.model";

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {
  private readonly url = `${environment.apiUrl}/StudentProfile`;

  constructor(
    private http: HttpClient
  ) { }

  getProfileInfo(userId: number): Observable<Student> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<Student>>(`${this.url}/GetProfileInfo`, {params}).pipe(
      map(data => data.result)
    );
  }

  getSubjects(userId: number): Observable<StudentSubject[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<StudentSubject[]>>(`${this.url}/GetSubjects`, {params}).pipe(
      map(data => data.result)
    );
  }

  getStudentTutors(userId: number): Observable<StudentTutors[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<StudentTutors[]>>(`${this.url}/GetStudentTotors`, {params}).pipe(
      map(data => data.result)
    );
  }

  getLessons(tutorId: number, data: LessonRequest): Observable<LessonSchedule[]> {
    const body = {
      userId: tutorId,
      from: new Date(data.from).toISOString(),
      to: new Date(data.to).toISOString(),
      statusId: data.statusId
    }
    return this.http.post<ResponseModel<LessonSchedule[]>>(`${this.url}/GetLessons`, body).pipe(
      map(data => data.result)
    )
  }

  getStudentLessonHistory(body: any): Observable<Lesson[]> {
    return this.http.post<ResponseModel<Lesson[]>>(`${this.url}/GetStudentLessonHistory`, body).pipe(
      map(data => data.result)
    )
  }
}
