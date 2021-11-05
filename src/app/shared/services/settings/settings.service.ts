import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SaveInstitutions, SaveWrapUpProfile} from "../../models/registration.model";
import {Observable} from "rxjs";
import {RateAndPolitics} from "../../models/settings.model";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private url = `${environment.apiUrl}/Settings`;

  constructor(
    private http: HttpClient
  ) { }

  updateProfileInformation(body: SaveWrapUpProfile): Observable<any> {
    return this.http.put<Observable<any>>(`${this.url}/UpdateProfileInformation`, body);
  }

  updateRateAndPolitics(body: RateAndPolitics): Observable<any> {
    return this.http.put<Observable<any>>(`${this.url}/UpdateRateAndPolitics`, body);
  }

  getRateAndPolitics(userId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('subjectId', userId);
    return this.http.get<Observable<any>>(`${this.url}/GetRateAndPolitics`, {params: params});
  }
}
