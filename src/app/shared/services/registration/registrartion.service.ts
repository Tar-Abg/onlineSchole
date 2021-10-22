import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {SaveCertificates, SaveInformation, SaveInstitutions} from "../../models/registration.model";
import {map} from "rxjs/operators";
import {ResponseModel} from "../../models/responseModel.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrartionService {
  private url = `${environment.apiUrl}/Registration`

  constructor(private http: HttpClient) { }

  saveInformation(form: SaveInformation): Observable<number> {
    delete form.rePassword;
    const body = {
      ...form,
      userPassword: {
        password: form.password,
        email: form.email
      }
    }
    delete body.password
    return this.http.post<ResponseModel<number>>(`${this.url}/SaveInformation`, body).pipe(
      map(data => data.result)
    );
  }

  updateInformation(form: SaveInformation): Observable<number> {
    delete form.rePassword;
    const body = {
      ...form,
      userPassword: {
        password: form.password,
        email: form.email
      }
    }
    delete body.password
    return this.http.put<ResponseModel<number>>(`${this.url}/UpdateInformation`, body).pipe(
      map(data => data.result)
    );
  }


  getInformationPage(userId: number): Observable<SaveInformation> {
    let params = new HttpParams();
    params = params.append('id', userId);
    return this.http.get<ResponseModel<SaveInformation>>(`${this.url}/GetInformationPage`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  getInstitutionsPage(userId: number): Observable<SaveInstitutions[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<SaveInstitutions[]>>(`${this.url}/GetInstitutionsPage`, {params: params}).pipe(
      map(data => data.result)
    );
  }


  saveInstitutions(body: SaveInstitutions[]): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}/SaveInstitutions`, body);
  }

  saveCertificates(body: SaveCertificates[]): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}/SaveCertificates`, body);
  }

  savePreferences(body: any): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}/SavePreferences`, body);
  }


}
