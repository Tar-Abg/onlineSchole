import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {KeyValuePair} from "../../models/keyValuePair.model";
import {map} from "rxjs/operators";
import {ResponseModel} from "../../models/responseModel.model";
import {Country, DaysOfWeek, HoursOfDay, Month} from "../../models/infos.model";

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
      map(data => data.result)
    );
  }

  getTutorExperiences(): Observable<KeyValuePair[]> {
    return this.http.get<ResponseModel<KeyValuePair[]>>(`${this.url}/GetTutorExperiences`).pipe(
      map(data => data.result)
    );
  }
}
