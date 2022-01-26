import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {UserRole} from "../../shared/models/auth.model";
import {StorageService} from "../../shared/services/storage/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() openLogin: EventEmitter<void> = new EventEmitter<void>();
  isLoggedIn$: BehaviorSubject<boolean>;
  isOpenNestedDropdown: boolean;


  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  signOut(): void {
    this.authService.signOut().subscribe();
  }

  navigateToSettings(): void {
    this.router.navigate([`${UserRole[this.userType]}/settings`]);
  }

  get userType(): number {
    return this.storageService.getItem('userRole');
  }
}
