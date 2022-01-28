import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {UserAuthInfo, UserRole} from "../../shared/models/auth.model";
import {StorageService} from "../../shared/services/storage/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() openLogin: EventEmitter<void> = new EventEmitter<void>();
  @Output() openRegister: EventEmitter<void> = new EventEmitter<void>();
  isLoggedIn$: BehaviorSubject<boolean>;
  loggedUser$: BehaviorSubject<UserAuthInfo | null> = new BehaviorSubject<UserAuthInfo | null>(null);
  isOpenNestedDropdown: boolean;


  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.loggedUser$ = this.authService.loggedUser$;
    this.getLoggedUser();
  }

  signOut(): void {
    this.authService.signOut().subscribe();
  }

  getLoggedUser(): void {
    const token = this.storageService.getItem('auth_token');
    token && this.authService.extractUserFromToken(token)
  }

  navigateToSettings(): void {
    this.router.navigate([`${UserRole[this.userType]}/settings`]);
  }

  navigateToProfile(): void {
    this.router.navigate([`${UserRole[this.userType]}/profile`]);
  }

  get userType(): number {
    return this.storageService.getItem('userRole');
  }
}
