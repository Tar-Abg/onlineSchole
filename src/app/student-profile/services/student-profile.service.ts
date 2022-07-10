import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../shared/models/responseModel.model";
import {map} from "rxjs/operators";
import {Student, StudentSubject, StudentTutors} from "../models/student-profile.model";
import {environment} from "../../../environments/environment";
import {
  LastPayment,
  Lesson,
  LessonRequest,
  LessonSchedule, PaymentDetail, PaymentFile, PaymentHistoryResponse
} from "../../tutor-profile/models/tutor.model";

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

  getLastPayments(tutorId: number): Observable<LastPayment[]> {
    let params = new HttpParams();
    params = params.append('userId', tutorId)
    return this.http.post<ResponseModel<LastPayment[]>>(`${this.url}/GetLastPayments`, null,{params}).pipe(
      map(data => data.result)
    );
  }

  getPaymentHistory(tutorId: number, from: string, to: string): Observable<PaymentHistoryResponse> {
    let params = new HttpParams();
    params = params.append('userId', tutorId);
    params = params.append('from', from);
    params = params.append('to', to);
    return this.http.post<ResponseModel<PaymentHistoryResponse>>(`${this.url}/GetPaymentHistory`, null,{params}).pipe(
      map(data => data.result)
    );
  }


  joinLesson(lessonId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('lessonId', lessonId)
    return this.http.put<ResponseModel<any>>(`${this.url}/JoinLesson`, null,{params})
  }

  getCertainPayment(paymentId: number): Observable<PaymentDetail> {
    let params = new HttpParams();
    params = params.append('paymentId', paymentId)
    return this.http.post<ResponseModel<PaymentDetail>>(`${this.url}/GetCertainPayment`, null,{params}).pipe(
      map(data => data.result)
    )
  }

  getPaymentHistoryPrintable(userId: number, from: string, to: string ): Observable<PaymentFile> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('from', from);
    params = params.append('to', to);
    return this.http.get<ResponseModel<PaymentFile>>(`${this.url}/getPaymentHistoryPrintable`,{params}).pipe(
      map(data => data.result)
    )
  }

  getCertainPaymentPrintable(userId: number, chargeId: number): Observable<PaymentFile> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('from', chargeId);
    return this.http.get<ResponseModel<PaymentFile>>(`${this.url}/GetCertainPaymentPrintable`,{params}).pipe(
      map(data => data.result)
    )
  }
}
