import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../shared/models/responseModel.model";
import {map} from "rxjs/operators";
import {
  Certificates,
  Institutions,
  InstitutionsResponse,
  ProfileInfo, Ratings,
  Reviews, Subjects,
  TutorAvailabilities,
  TutorCertificates,
  TutorProfileInfo, TutorSubjects
} from "../models/tutor-view.model";
import {TutorRatings, TutorReviews} from "../../tutor-profile/models/tutor.model";

@Injectable({
  providedIn: 'root'
})
export class TutorViewService {
  private readonly url = `${environment.apiUrl}/Student`;

  constructor(
    private http: HttpClient
  ) {
  }

  getProfileInfo(userId: number, tutorId: number): Observable<ProfileInfo> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('tutorId', tutorId);
    return this.http.get<ResponseModel<TutorProfileInfo>>(`${this.url}/GetTutorProfileInfo`, {params}).pipe(
      map(data => data.result.profileInfo)
    );
  }

  getInstitutions(userId: number, tutorId: number): Observable<Institutions[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('tutorId', tutorId);
    return this.http.get<ResponseModel<InstitutionsResponse>>(`${this.url}/GetInstitutions`, {params}).pipe(
      map(data => data.result.institutions)
    );
  }

  getTutorCertificates(userId: number, tutorId: number): Observable<Certificates[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('tutorId', tutorId);
    return this.http.get<ResponseModel<TutorCertificates>>(`${this.url}/GetTutorCertificates`, {params}).pipe(
      map(data => data.result.certificatesAndQualifications)
    );
  }

  getAvailabilities(userId: number, tutorId: number): Observable<TutorAvailabilities> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('tutorId', tutorId);
    return this.http.get<ResponseModel<TutorAvailabilities>>(`${this.url}/GetAvailabilities`, {params}).pipe(
      map(data => data.result)
    );
  }

  getTutorSubjects(userId: number, tutorId: number): Observable<Subjects[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('tutorId', tutorId);
    return this.http.get<ResponseModel<TutorSubjects>>(`${this.url}/GetTutorSubjects`, {params}).pipe(
      map(data => data.result.subjects)
    );
  }

  getReviews(userId: number, tutorId: number): Observable<TutorReviews[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('tutorId', tutorId);
    return this.http.get<ResponseModel<Reviews>>(`${this.url}/GetReviews`, {params}).pipe(
      map(data => data.result.reviews)
    );
  }

  getRatings(userId: number, tutorId: number): Observable<TutorRatings> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('tutorId', tutorId);
    return this.http.get<ResponseModel<Ratings>>(`${this.url}/GetRatings`, {params}).pipe(
      map(data => data.result.ratings)
    );
  }
}
