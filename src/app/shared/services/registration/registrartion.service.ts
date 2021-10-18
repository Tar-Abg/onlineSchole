import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {SaveCertificates, SaveInformation, SaveInstitutions} from "../../models/registration.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrartionService {
  private url = `${environment.apiUrl}/Registration`

  constructor(private http: HttpClient) { }

  saveInformation(form: SaveInformation): Observable<any> {
    delete form.rePassword;
    const body = {
      ...form,
      userPassword: {
        password: form.password,
        email: form.email
      }
    }
    delete body.password
    return this.http.post<Observable<any>>(`${this.url}/SaveInformation`, body);
  }

  saveInstitutions(body: SaveInstitutions[]): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}/SaveInstitutions`, body);
  }

  saveCertificates(body: SaveCertificates[]): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}/SaveCertificates`, body);
  }


}
