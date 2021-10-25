import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {
  Preferences,
  SaveCertificates,
  SaveContacts,
  SaveInformation,
  SaveInstitutions
} from "../../models/registration.model";
import {map} from "rxjs/operators";
import {ResponseModel} from "../../models/responseModel.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrartionService {
  private url = `${environment.apiUrl}/Registration`

  constructor(private http: HttpClient) {
  }

  // information
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

  // information end

  // Institutions
  saveInstitutions(body: SaveInstitutions[]): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}/SaveInstitutions`, body);
  }

  updateInstitutions(body: SaveInstitutions[]): Observable<any> {
    return this.http.put<Observable<any>>(`${this.url}/UpdateInstitutions`, body);
  }

  getInstitutionsPage(userId: number): Observable<SaveInstitutions[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<SaveInstitutions[]>>(`${this.url}/GetInstitutionsPage`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  // Institutions end


  // Certificates
  saveCertificates(body: SaveCertificates[]): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}/SaveCertificates`, body);
  }

  updateCertificates(body: SaveCertificates[]): Observable<any> {
    return this.http.put<Observable<any>>(`${this.url}/UpdateCertificates`, body);
  }

  getCertificates(userId: number): Observable<SaveCertificates[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<SaveCertificates[]>>(`${this.url}/GetCertificatesPage`, {params: params}).pipe(
      map(data => data.result)
    );
  }
  // Certificates end

  // Preferences
  savePreferences(body: Preferences): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}/SavePreferences`, body);
  }

  updatePreferences(body: Preferences): Observable<any> {
    return this.http.put<Observable<any>>(`${this.url}/UpdatePreferences`, body);
  }

  getPreferencesPage(userId: number): Observable<Preferences> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<Preferences>>(`${this.url}/GetPreferencesPage`, {params: params}).pipe(
      map(data => data.result)
    );
  }
  // Preferences end

  // Contacts
  saveContacts(body: SaveContacts): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}/SaveContacts`, body);
  }

  updateContacts(body: SaveContacts): Observable<any> {
    return this.http.put<Observable<any>>(`${this.url}/UpdateContacts`, body);
  }

  getContactsPage(userId: number): Observable<SaveContacts> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<SaveContacts>>(`${this.url}/GetContactsPage`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  // Contacts end

}
