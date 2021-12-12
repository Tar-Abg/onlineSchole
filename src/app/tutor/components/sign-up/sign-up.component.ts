import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {of, Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {MessageService} from "../../../shared/services/message/message.service";
import {Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  stepNumber: number = 1;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private registrationService: RegistrartionService,
    private messageService: MessageService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.subscribeOnRouterChange();
  }

  changeStepNumber(direction: 'BACK' | "FORWARD"): void {
    direction === "FORWARD" ? this.stepNumber++ : this.stepNumber--;
  }

  subscribeOnRouterChange(): void {
    this.subscription.add(
      this.route.queryParams.pipe(
        switchMap((params) => {
          if (params.token && params.userId) {
            this.storageService.setUserIdInLocalStorage(+params.userId);
            this.location.replaceState(this.location.path().split('?')[0], '');
            return this.registrationService.confirmEmail(params.userId, params.token)
          } else {
            return of(null)
          }
        })
      ).subscribe((data) => {
          if (data) {
            this.stepNumber = 2;
          }
        },
        (error => {
          if (error.error.type === 'Invalid token error') {
           this.messageService.setNewMessage(error.error.title);
           this.messageService.setBackToMainPage(true);
          }
        }))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
