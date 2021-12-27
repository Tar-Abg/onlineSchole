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
  }

  login(body: Login): Observable<User> {
    return this.http.post<User>(`${this.url}/Login`, body).pipe(
      tap(user => {
        if (user.token) {
          this.setSessions(user);
          this.checkUserRole(user);
        }
      })
    );
  }

  setSessions(user: User): void {
    this.storageService.setItem('auth_token', user.token);
    this.storageService.setItem('refresh_token', user.refreshToken);
    this.storageService.setItem('expirationTime', user.refreshTokenExpiration);
  }

  checkUserRole(user: User): void {
    if (user.roles.includes("Tutor")) {
      this.storageService.setItem('userRole', 1);
    } else if (user.roles.includes("Student")) {
      this.storageService.setItem('userRole', 2);
    }
  }

  extractUserFromToken(token: string): UserAuthInfo {
    return JSON.parse(atob(token.split('.')[1]));
  }

  refreshTokens(token: string): Observable<User> {
    const body = {
      refreshToken: token
    }
    return this.http.post<User>(`${this.url}/RefreshToken`, body).pipe(
      tap(user => {
        if (user.token) {
          this.setSessions(user);
        }
      })
    )
  }

  // private tokenExpired() {
  //   const token = this.storageService.getItem('auth_token')
  //   if (token) {
  //     const expiry = (JSON.parse(atob(token?.split('.')[1]))).exp;
  //     return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  //   }
  //   return null
  //
  // }

  setUserId(userId: number): void {
    this.storageService.setItem('userId', userId)
  }

  isAuthenticated(): boolean {
    return this.storageService.getItem('auth_token');
  }

  signOut(): void {
    localStorage.clear();
  }

  // for test
  getSecuredData(): Observable<any> {
    return this.http.get(`${this.url}/GetTutorSecuredData`)
  }
}
