import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subject, Subscription} from "rxjs";
import {SettingsService} from "../../shared/services/settings/settings.service";
import {StorageService} from "../../shared/services/storage/storage.service";
import {MessageService} from "../../shared/services/message/message.service";
import {AuthService} from "../../shared/services/auth/auth.service";
import {InfosService} from "../../shared/services/infos/infos.service";
import {TutorBaseInfo, TutorForHomePage} from "../../tutor-profile/models/tutor.model";
import {Quotes} from "../../shared/models/infos.model";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  isLoggedIn$: Subject<boolean>;
  tutors$: Observable<TutorForHomePage[]>;
  quotes$: Observable<Quotes[]>;
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
    private infoService: InfosService,
  ) {
  }

  ngOnInit(): void {
    this.subscribeConfirmResetPassword();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.getTutors();
    this.getQuotes();
  }

  subscribeConfirmResetPassword(): void {
    this.subscription.add(
      this.route.queryParams.subscribe(data => {
        data.login && this.confirmEmail(data.token, data.userId);
        data.resetPassword && this.confirmResetPassword(data.token, data.userId);
      })
    );
  }

  getTutors(): void {
    this.tutors$ = this.infoService.getTutors();
  }

  getQuotes(): void {
    this.quotes$ = this.infoService.getQuotes();
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

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
