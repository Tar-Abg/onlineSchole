import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, of, Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {MessageService} from "../../../shared/services/message/message.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  stepNumber$: BehaviorSubject<number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private registrationService: RegistrartionService,
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
            return this.registrationService.confirmEmail(params.userId, params.token)
          } else {
            return of(null)
          }
        })
      ).subscribe((data) => {
          this.registrationService.stepNumber$.next(2);
          data && this.router.navigate(['step-two'], {relativeTo: this.route});
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
