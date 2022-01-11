import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Login, User, UserAuthInfo} from "../../models/auth.model";
import {map, tap} from "rxjs/operators";
import {StorageService} from "../storage/storage.service";
import {Router} from "@angular/router";
import {ResponseModel} from "../../models/responseModel.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = `${environment.apiUrl}/User`;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
  ) {
    this.isAuthenticated() ? this.isLoggedIn$.next(true) : this.isLoggedIn$.next(false);
  }

  login(body: Login): Observable<User> {
    return this.http.post<ResponseModel<User>>(`${this.url}/Login`, body).pipe(
      map(data => data.result),
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
    this.isLoggedIn$.next(true);
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
    return this.http.post<ResponseModel<User>>(`${this.url}/RefreshToken`, body).pipe(
      map(data => data.result),
      tap(user => {
        if (user.token) {
          this.setSessions(user);
        } else {
          localStorage.clear();
          this.router.navigate(['/']);
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

  signOut(): Observable<any> {
    const body = {
      refreshToken: JSON.parse(this.storageService.getItem('refresh_token'))
    }
    return this.http.post(`${this.url}/Logout`, body).pipe(
      tap(() => {
        this.isLoggedIn$.next(false);
        this.router.navigate(['/']);
        localStorage.clear();
      })
    )
  }

  // for test
  getSecuredData(): Observable<any> {
    return this.http.get(`${this.url}/GetTutorSecuredData`)
  }
}
