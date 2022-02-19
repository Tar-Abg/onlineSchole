import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SettingsService} from "../../shared/services/settings/settings.service";
import {StorageService} from "../../shared/services/storage/storage.service";
import {MessageService} from "../../shared/services/message/message.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
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
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe(data => {
        data.login && this.confirmEmail(data.token);
      })
    )
  }

  confirmEmail(token: string): void {
    const userId = this.storageService.getUserId();
    this.subscription.add(
      this.settingsService.confirmMail(userId, token).subscribe(data => {
          this.isOpenLogin = true;
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
