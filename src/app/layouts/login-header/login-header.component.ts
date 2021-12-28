import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {
  isLoggedIn$: BehaviorSubject<boolean>;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  signOut(): void {
    this.authService.signOut().subscribe();
  }

}
