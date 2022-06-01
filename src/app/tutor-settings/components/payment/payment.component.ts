import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StorageService} from "../../../shared/services/storage/storage.service";
import {Observable, Subscription} from "rxjs";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {SettingsService} from "../../../shared/services/settings/settings.service";
import {ConfirmPasswordComponent} from "../../../shared/components/confirm-password/confirm-password.component";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy{
  @ViewChild('confirmPasswordComponent') confirmPasswordComponent: ConfirmPasswordComponent
  private readonly subscription: Subscription = new Subscription();
  tutorPaymentExistence$: Observable<boolean>;
  userId: number;
  showUConfirmPassword: boolean;
  errorMassage: string;

  constructor(
    private storageService: StorageService,
    private infoService: InfosService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.subscribeRouterEvents();
    this.userId = this.storageService.getUserId();
    this.tutorPaymentExistence$ = this.infoService.tutorPaymentExistence(this.userId);
  }

  addPayment(): void {
    this.subscription.add(
      this.settingsService.createTutorPayment(this.userId).subscribe((paymentPageUrls: string) => {
        paymentPageUrls && (window.location.href = paymentPageUrls);
      })
    )
  }

  updatePayment(password: string): void {
    this.subscription.add(
      this.settingsService.updateTutorPayment(this.userId, password).subscribe((paymentPageUrls: string) => {
        paymentPageUrls && (window.location.href = paymentPageUrls);
        this.errorMassage = '';
        this.showUConfirmPassword = false;
      },
        error => {
          this.errorMassage = error.error.title;
          this.confirmPasswordComponent.errorMessage = error.error.title;
        }
        )
    )
  }

  subscribeRouterEvents(): void {
    this.subscription.add(
      this.route.queryParams.subscribe((data) => {
        if (data.userId) {
          this.settingsService.successfulAccount(data.userId).subscribe()
        }
        this.location.replaceState(this.location.path().split('?')[0], '');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
