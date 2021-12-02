import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Login, User} from "../../models/auth.model";
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
  ) { }

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
}
