import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {SettingsService} from "../../shared/services/settings/settings.service";
import {StorageService} from "../../shared/services/storage/storage.service";
import {MessageService} from "../../shared/services/message/message.service";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  isLoggedIn$: Subject<boolean>;
  userIdFromUrl: number;
  isOpenLogin: boolean;
  isOpenResetPassword: boolean;
  isOpenChangePassword: boolean;
  isOpenMessageModal: boolean;
  isOpenRegistration: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private storageService: StorageService,
    private messageService: MessageService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe(data => {
        data.login && this.confirmEmail(data.token, data.userId);
        data.resetPassword && this.confirmResetPassword(data.token, data.userId);
      })
    );
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  confirmEmail(token: string, userId: number): void {
    this.subscription.add(
      this.settingsService.confirmMail(userId, token).subscribe(() => {
          this.isOpenLogin = true;
          this.router.navigate([]);
        },
        error => {
          this.messageService.setNewMessage(error.error.title)
          this.router.navigate([]);
        })
    )
  }

  confirmResetPassword(token: string, userId: number): void {
    this.userIdFromUrl = userId;
    this.subscription.add(
      this.authService.confirmChangePassword(userId, token).subscribe(() => {
          this.isOpenChangePassword = true;
          this.isOpenResetPassword = false;
          this.router.navigate([]);
        },
        error => {
          this.messageService.setNewMessage(error.error.title)
          this.router.navigate([]);
        })
    )
  }

  navigateToSearchTutor(): void {
    this.router.navigate(['searchTutor']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
