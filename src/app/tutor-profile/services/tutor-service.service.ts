import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {
  LessonRequest,
  LessonSchedule, SearchTutor,
  SelectedDay,
  TutorAvailabilities,
  TutorBaseInfo,
  TutorCertificates,
  TutorInstitutions,
  TutorRatings,
  TutorReviews,
  TutorSubjects
} from "../models/tutor.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ResponseModel} from "../../shared/models/responseModel.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private readonly url = `${environment.apiUrl}/TutorProfile`

  constructor(
    private http: HttpClient
  ) { }

  getTutorBaseInfo(tutorId: number): Observable<TutorBaseInfo> {
    let params = new HttpParams();
    params = params.append('userId', tutorId)
    return this.http.get<ResponseModel<TutorBaseInfo>>(`${this.url}/GetProfileInfo`, {params}).pipe(
      map(data => data.result)
    )
  }

  getAvailabilities(tutorId: number): Observable<TutorAvailabilities> {
    let params = new HttpParams();
    params = params.append('userId', tutorId)
    return this.http.get<ResponseModel<TutorAvailabilities>>(`${this.url}/GetAvailabilities`, {params}).pipe(
      map(data => data.result)
    )
  }

  getSubjects(tutorId: number): Observable<TutorSubjects[]> {
    let params = new HttpParams();
    params = params.append('userId', tutorId)
    return this.http.get<ResponseModel<TutorSubjects[]>>(`${this.url}/GetSubjects`, {params}).pipe(
      map(data => data.result)
    )
  }

  getInstitutions(tutorId: number): Observable<TutorInstitutions[]> {
    let params = new HttpParams();
    params = params.append('userId', tutorId)
    return this.http.get<ResponseModel<TutorInstitutions[]>>(`${this.url}/GetInstitutions`, {params}).pipe(
      map(data => data.result)
    )
  }

  getCertificates(tutorId: number): Observable<TutorCertificates[]> {
    let params = new HttpParams();
    params = params.append('userId', tutorId)
    return this.http.get<ResponseModel<TutorCertificates[]>>(`${this.url}/GetCertificates`, {params}).pipe(
      map(data => data.result)
    )
  }

  getRatings(tutorId: number): Observable<TutorRatings> {
    let params = new HttpParams();
    params = params.append('tutorId', tutorId)
    return this.http.get<ResponseModel<TutorRatings>>(`${this.url}/GetRatings`, {params}).pipe(
      map(data => data.result)
    )
  }

  getReviews(tutorId: number): Observable<TutorReviews[]> {
    let params = new HttpParams();
    params = params.append('tutorId', tutorId)
    return this.http.get<ResponseModel<TutorReviews[]>>(`${this.url}/GetReviews`, {params}).pipe(
      map(data => data.result)
    )
  }

  getCalendar(tutorId: number, date: string): Observable<SelectedDay[]> {
    let params = new HttpParams();
    params = params.append('userId', tutorId)
    params = params.append('date', date)
    return this.http.get<ResponseModel<SelectedDay[]>>(`${this.url}/GetCalendar`, {params}).pipe(
      map(data => data.result)
    )
  }

  getLessons(tutorId: number, data: LessonRequest): Observable<LessonSchedule[]> {
    let params = new HttpParams();
    params = params.append('userId', tutorId);
    params = params.append('from', new Date(data.from).toISOString());
    params = params.append('to', new Date(data.to).toISOString());
    params = params.append('statusId', data.statusId);
    return this.http.get<ResponseModel<LessonSchedule[]>>(`${this.url}/GetLessons`, {params}).pipe(
      map(data => data.result)
    )
  }

  addLesson(body: any): Observable<any> {
    return this.http.post(`${this.url}/AddLesson`, body);
  }

  getStudents(body: any): Observable<SearchTutor[]> {
    let params = new HttpParams();
    params = params.append('subjectId', body.subjectId);
    params = params.append('sortId',  body.sortId);
    return this.http.post<ResponseModel<SearchTutor[]>>(`${environment.apiUrl}/SearchUser/GetStudents`, null, {params}).pipe(
      map(data => data.result),
      map(students => {
        return students.map(student => {
          student.isOpenDetail = false;
          return student
        })
      }),
    )
  }
}
