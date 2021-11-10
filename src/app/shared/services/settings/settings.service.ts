import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SaveWrapUpProfile, TutorAvailabilities, TutorSubjects, UpdatePassword} from "../../models/registration.model";
import {Observable} from "rxjs";
import {PersonalInformation, RateAndPolitics} from "../../models/settings.model";
import {map} from "rxjs/operators";
import {ResponseModel} from "../../models/responseModel.model";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private url = `${environment.apiUrl}/Settings`;

  constructor(
    private http: HttpClient
  ) {
  }

  updateProfileInformation(body: SaveWrapUpProfile): Observable<any> {
    return this.http.put<Observable<any>>(`${this.url}/UpdateProfileInformation`, body);
  }

  updateRateAndPolitics(body: RateAndPolitics): Observable<any> {
    return this.http.put<Observable<any>>(`${this.url}/UpdateRateAndPolitics`, body);
  }

  getRateAndPolitics(userId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<any>>(`${this.url}/GetRateAndPolitics`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  saveAvailabilities(body: TutorAvailabilities): Observable<any> {
    return this.http.post<ResponseModel<any>>(`${this.url}/SaveAvailabilities`, body);
  }

  updateAvailabilities(body: TutorAvailabilities): Observable<any> {
    return this.http.put<ResponseModel<any>>(`${this.url}/UpdateAvailabilities`, body);
  }

  getAvailabilities(userId: number): Observable<TutorAvailabilities[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<TutorAvailabilities[]>>(`${this.url}/GetAvailabilities`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  getTutorSubjects(userId: number): Observable<TutorSubjects[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<TutorSubjects[]>>(`${this.url}/GetTutorSubjects`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  getStudentSubjects(userId: number): Observable<TutorSubjects[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<TutorSubjects[]>>(`${this.url}/GetStudentSubjects`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  updateTutorSubjects(body: TutorSubjects): Observable<any> {
    return this.http.put<ResponseModel<any>>(`${this.url}/UpdateTutorSubjects`, body);
  }

  updateStudentSubjects(body: TutorSubjects): Observable<any> {
    return this.http.put<ResponseModel<any>>(`${this.url}/UpdateStudentSubjects`, body);
  }

  updatePassword(body: UpdatePassword): Observable<any> {
    return this.http.put<ResponseModel<any>>(`${this.url}/UpdatePassword`, body);
  }

  updatePersonalInformation(body: PersonalInformation, password: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('password', password);
    return this.http.put<ResponseModel<PersonalInformation>>(`${this.url}/UpdatePersonalInformation`, body, {params: params});
  }

}
