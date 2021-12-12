import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Login, User, UserAuthInfo} from "../../models/auth.model";
import {tap} from "rxjs/operators";
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = `${environment.apiUrl}/User`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    console.log(this.tokenExpired());
  }

  login(body: Login): Observable<User> {
    return this.http.post<User>(`${this.url}/Login`, body).pipe(
      tap(user => {
        if (user.token){
          this.setSessions(user);
          this.checkUserRole(user);
        }
      })
    );
  }

  setSessions(user: User): void {
    this.storageService.setItem('auth_token', user.token);
    this.storageService.setItem('expirationTime', user.refreshTokenExpiration);
  }

  checkUserRole(user: User): void {
    if (user.roles.includes("Tutor")) {
      this.storageService.setItem('userRole', 1);
    } else if (user.roles.includes("Student")){
      this.storageService.setItem('userRole', 2);
    }
  }

  parseToken(token: string): UserAuthInfo {
    return JSON.parse(atob(token.split('.')[1]));
  }

  getRefreshTokens(id: number): Observable<any> {
    return this.http.get(`${this.url}/GetRefreshTokens/${id}`)
  }

  getTutorSecuredData(): Observable<any> {
    return this.http.get(`${this.url}/GetTutorSecuredData`)
  }

  refreshToken(token: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(`${this.url}/RefreshToken`, {}, httpOptions )
  }

  private tokenExpired() {
    const token = this.storageService.getItem('auth_token')
    if (token) {
      const expiry = (JSON.parse(atob(token?.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    } return null

  }

  isAuthenticated(): boolean {
    return this.storageService.getItem('auth_token') && !this.tokenExpired();
  }
}
