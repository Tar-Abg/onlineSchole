import {Component, OnInit} from '@angular/core';
import {switchMap} from "rxjs/operators";
import {of, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {MessageService} from "../../../shared/services/message/message.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './student-sign-up.component.html',
  styleUrls: ['./student-sign-up.component.scss']
})
export class StudentSignUpComponent implements OnInit {
  private readonly subscription: Subscription = new Subscription();
  stepNumber: number = 1;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private registrationService: RegistrartionService,
    private messageService: MessageService,
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
        })),
    );
  }
}
