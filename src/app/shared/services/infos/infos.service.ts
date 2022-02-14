import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {KeyValuePair} from "../../models/keyValuePair.model";
import {map, shareReplay} from "rxjs/operators";
import {ResponseModel} from "../../models/responseModel.model";
import {
  Categories,
  Country,
  DaysOfWeek,
  HoursOfDay,
  Level,
  LevelForTutor,
  Minutes,
  Month,
  States,
  Subjects,
  SubjectsForTutor,
  TimeZones, TutorsForStudent
} from "../../models/infos.model";

@Injectable({
  providedIn: 'root'
})
export class InfosService {
  private url = `${environment.apiUrl}/Info`

  constructor(private http: HttpClient) {
  }

  getGenders(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetGenders`).pipe(
      map(data => data.result)
    );
  }

  getMonths(): Observable<Month[]> {
    return this.http.get<ResponseModel<Month[]>>(`${this.url}/GetMonths`).pipe(
      map(data => data.result)
    );
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<ResponseModel<Country[]>>(`${this.url}/GetCountries`).pipe(
      map(data => data.result)
    );
  }

  getInstitutionalLevels(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetInstitutionalLevels`).pipe(
      map(data => data.result)
    );
  }

  getStudentLevels(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetStudentLevels`).pipe(
      map(data => data.result)
    );
  }

  getHoursPerWeekForTutor(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetHoursPerWeekForTutor`).pipe(
      map(data => data.result)
    );
  }

  getDaysOfWeek(): Observable<DaysOfWeek[]> {
    return this.http.get<ResponseModel<DaysOfWeek[]>>(`${this.url}/getDaysOfWeek`).pipe(
      map(data => data.result)
    );
  }

  getHoursOfDay(): Observable<HoursOfDay[]> {
    return this.http.get<ResponseModel<HoursOfDay[]>>(`${this.url}/GetHoursOfDay`).pipe(
      map(data => data.result),
      shareReplay()
    );
  }

  getTutorExperiences(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetTutorExperiences`).pipe(
      map(data => data.result)
    );
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get<ResponseModel<Categories[]>>(`${this.url}/GetCategories`).pipe(
      map(data => data.result)
    );
  }

  getSubjectsByCategoryId(id: number): Observable<Subjects[]> {
    let params = new HttpParams();
    params = params.append('categoryId', id);
    return this.http.get<ResponseModel<Subjects[]>>(`${this.url}/FindAllSubjectsByCategoryId`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  getLevelsBySubjectId(id: number): Observable<Level[]> {
    let params = new HttpParams();
    params = params.append('subjectId', id);
    return this.http.get<ResponseModel<Level[]>>(`${this.url}/GetLevelsBySubjectId`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  getCancelationHours(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetCancelationHours`).pipe(
      map(data => data.result)
    );
  }
  getStudentWantedLessonsCounts(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetStudentWantedLessonsCounts`).pipe(
      map(data => data.result)
    );
  }

  getStudentAvailableHours(): any {
    return this.http.get<ResponseModel<any[]>>(`${this.url}/GetStudentAvailableHours`).pipe(
      map(data => data.result)
    );
  }

  getStates(): Observable<States[]> {
    return this.http.get<ResponseModel<States[]>>(`${this.url}/GetStates`).pipe(
      map(data => data.result)
    );
  }

  getIsUserAmerican(): Observable<boolean> {
    return this.http.get<ResponseModel<boolean>>(`${this.url}/IsUserAmerican`).pipe(
      map(data => data.result)
    );
  }

  getSortForTutorSearch(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetSortForTutorSearch`).pipe(
      map(data => data.result)
    );
  }

  getTimeZones(): Observable<TimeZones[]> {
    return this.http.get<ResponseModel<TimeZones[]>>(`${this.url}/GetTimeZones`).pipe(
      map(data => data.result)
    );
  }

  getDaysOfWeekForCalendar(date: string): Observable<DaysOfWeek[]> {
    let params = new HttpParams();
    params = params.append('date', date)
    return this.http.get<ResponseModel<DaysOfWeek[]>>(`${this.url}/GetDaysOfWeekForCalendar`, {params}).pipe(
      map(data => data.result),
      shareReplay()
    );
  }

  getTutorCategories(tutorId: number): Observable<Categories[]> {
    let params = new HttpParams();
    params = params.append('tutorId', tutorId)
    return this.http.get<ResponseModel<Categories[]>>(`${this.url}/GetTutorCategories`, {params}).pipe(
      map(data => data.result),
    )
  }

  getSubjectsByCategoryIdForTutor(tutorId: number, categoryId: number): Observable<SubjectsForTutor[]> {
    let params = new HttpParams();
    params = params.append('tutorId', tutorId)
    params = params.append('categoryId', categoryId)
    return this.http.get<ResponseModel<SubjectsForTutor[]>>(`${this.url}/FindAllSubjectsByCategoryIdForTutor`, {params}).pipe(
      map(data => data.result)
    );
  }

  getLevelsBySubjectIdForTutor(tutorId: number, subjectId: number): Observable<LevelForTutor[]> {
    let params = new HttpParams();
    params = params.append('tutorId', tutorId)
    params = params.append('subjectId', subjectId)
    return this.http.get<ResponseModel<LevelForTutor[]>>(`${this.url}/GetLevelsBySubjectIdForTutor`, {params}).pipe(
      map(data => data.result)
    );
  }

  getMinutes(): Observable<Minutes[]> {
    return this.http.get<ResponseModel<Minutes[]>>(`${this.url}/GetMinutes`).pipe(
      map(data => data.result)
    );
  }

  getLessonStatuses(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetLessonStatuses`).pipe(
      map(data => data.result)
    );
  }

  getSortForStudentSearch(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetSortForStudentSearch`).pipe(
      map(data => data.result)
    );
  }

  findAllSubjectsForTutor(tutorId: number): Observable<Subjects[]> {
    let params = new HttpParams();
    params = params.append('tutorId', tutorId)
    return this.http.get<ResponseModel<Subjects[]>>(`${this.url}/FindAllSubjectsForTutor`, {params}).pipe(
      map(data => data.result)
    );
  }

  findAllSubjectsForStudent(studentId: number): Observable<Subjects[]> {
    let params = new HttpParams();
    params = params.append('studentId', studentId)
    return this.http.get<ResponseModel<Subjects[]>>(`${this.url}/FindAllSubjectsForStudent`, {params}).pipe(
      map(data => data.result)
    );
  }

  getTutorsForStudent(userId: number): Observable<TutorsForStudent[]> {
    let params = new HttpParams();
    params = params.append('userId', userId)
    return this.http.get<ResponseModel<TutorsForStudent[]>>(`${this.url}/GetTutorsForStudent`, {params}).pipe(
      map(data => data.result)
    );
  }

}
