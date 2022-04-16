import {Component, OnInit} from '@angular/core';
import {switchMap} from "rxjs/operators";
import {BehaviorSubject, of, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {RegistrationService} from "../../../shared/services/registration/registration.service";
import {MessageService} from "../../../shared/services/message/message.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-sign-up',
  templateUrl: './student-sign-up.component.html',
  styleUrls: ['./student-sign-up.component.scss']
})
export class StudentSignUpComponent implements OnInit {
  private readonly subscription: Subscription = new Subscription();
  stepNumber$: BehaviorSubject<number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private registrationService: RegistrationService,
    private messageService: MessageService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.subscribeOnRouterChange();
    this.stepNumber$ = this.registrationService.stepNumber$;
  }


  subscribeOnRouterChange(): void {
    this.subscription.add(
      this.route.queryParams.pipe(
        switchMap((params) => {
          if (params.token && params.userId) {
            this.storageService.setUserIdInLocalStorage(+params.userId);
            this.location.replaceState(this.location.path().split('?')[0], '');
            return this.registrationService.confirmEmail(params.userId, params.token);
          } else {
            return of(null)
          }
        })
      ).subscribe((data) => {
          if (data) {
            this.registrationService.stepNumber$.next(2);
            this.router.navigate(['step-two'], {relativeTo: this.route});
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
