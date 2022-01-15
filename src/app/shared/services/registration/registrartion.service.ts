import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {
  Address, CardDetails,
  Preferences,
  SaveCertificates,
  SaveContacts,
  SaveInformation,
  SaveInstitutions, SaveTermsForTutor, SaveWrapUpProfile, StudentWantedLessons
} from "../../models/registration.model";
import {catchError, map} from "rxjs/operators";
import {ResponseModel} from "../../models/responseModel.model";
import {BasicInformation} from "../../../tutor/models/tutor.model";
import {User} from "../../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrartionService {
  private url = `${environment.apiUrl}/Registration`;
  emailIsExist$: Subject<boolean> = new Subject<boolean>();
  usernameIsExist$: Subject<boolean> = new Subject<boolean>();
  stepNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(private http: HttpClient) {
  }

  // information
  saveInformation(form: SaveInformation): Observable<string> {
    delete form.rePassword;
    const body = {
      ...form,
      userPassword: {
        password: form.password,
        email: form.email
      }
    }
    delete body.password
    return this.http.post<ResponseModel<string>>(`${this.url}/SaveInformation`, body).pipe(
      map(data => data.result),
      catchError(err => {
        if (err.error?.type === 'Email existence error') {
          this.emailIsExist$.next(true);
        }
        if (err.error?.type === 'Username existence error') {
          this.usernameIsExist$.next(true);
        }
        throw new Error(err.error?.type);
      })
    );
  }

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

  saveBasicInformation(body: SaveCertificates): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}/SaveBasicInformation`, body);
  }

  getBasicInformation(id: number): Observable<BasicInformation> {
    let params = new HttpParams();
    params = params.append('userId', id);
    return this.http.get<ResponseModel<BasicInformation>>(`${this.url}/GetBasicInformation`, {params: params}).pipe(
      map(data => data.result)
    )
  }

  updateBasicInformation(body: SaveCertificates): Observable<any> {
    return this.http.put<ResponseModel<any>>(`${this.url}/UpdateBasicInformation`, body);
  }

  saveWrapUpProfile(body: SaveWrapUpProfile): Observable<any> {
    return this.http.post(`${this.url}/SaveWrapUpProfile`, body);
  }

  getWrapUpProfile(id: number): Observable<SaveWrapUpProfile> {
    let params = new HttpParams();
    params = params.append('userId', id);
    return this.http.get<ResponseModel<SaveWrapUpProfile>>(`${this.url}/GetWrapUpProfile`, {params: params}).pipe(
      map(data => data.result)
    )
  }

  updateWrapUpProfile(body: SaveWrapUpProfile): Observable<any> {
    return this.http.put<ResponseModel<any>>(`${this.url}/UpdateWrapUpProfile`, body);
  }

  saveTermsForTutor(body: SaveTermsForTutor): Observable<any> {
    return this.http.post<ResponseModel<any>>(`${this.url}/SaveTermsForTutor`, body);
  }

  saveStudentAddress(body: Address): Observable<any> {
    return this.http.post<ResponseModel<any>>(`${this.url}/SaveAddress`, body);
  }

  updateStudentAddress(body: Address): Observable<any> {
    return this.http.put<ResponseModel<any>>(`${this.url}/UpdateAddress`, body);
  }

  getStudentAddressPage(userId: number): Observable<Address> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<Address>>(`${this.url}/GetAddressPage`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  saveStudentWantedLessons(body: StudentWantedLessons): Observable<any> {
    return this.http.post<ResponseModel<any>>(`${this.url}/SaveStudentWantedLessons`, body);
  }

  updateStudentWantedLessons(body: StudentWantedLessons): Observable<any> {
    return this.http.put<ResponseModel<any>>(`${this.url}/UpdateStudentWantedLessons`, body);
  }

  getStudentWantedLessons(userId: number): Observable<StudentWantedLessons> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<StudentWantedLessons>>(`${this.url}/GetStudentWantedLessons`, {params: params}).pipe(
      map(data => data.result)
    );
  }

  confirmEmail(userId: number, token: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('token', token);
    return this.http.put<ResponseModel<any>>(`${this.url}/ConfirmEmail`, {},{params: params}).pipe(
      map(data => data.result)
    );
  }

  saveCardDetails(body: CardDetails): Observable<User> {
    return this.http.post<ResponseModel<User>>(`${this.url}/SaveCardDetails`, body).pipe(
      map(data => data.result)
    );
  }

}
