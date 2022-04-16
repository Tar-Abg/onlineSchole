import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Observable, Subscription} from "rxjs";
import {Month, States} from "../../../shared/models/infos.model";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {DateService} from "../../../shared/services/date/date.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {tap} from "rxjs/operators";
import {RegistrationService} from "../../../shared/services/registration/registration.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-student-fifth-step',
  templateUrl: './student-fifth-step.component.html',
  styleUrls: ['./student-fifth-step.component.scss']
})
export class StudentFifthStepComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  form: FormGroup;
  isUserFromUS$: Observable<boolean>;
  months$: Observable<Month[]>;
  yearList: KeyValuePair[];
  states$: Observable<States[]>;

  constructor(
    private fb: FormBuilder,
    private infoService: InfosService,
    private dateService: DateService,
    private storageService: StorageService,
    private registrationService: RegistrationService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.registrationService.stepNumber$.next(5);
    this.initializeForm();
    this.initializeListeners();
  }

  getIsUserFromUS(): void {
    this.isUserFromUS$ = this.infoService.getIsUserAmerican().pipe(
      tap(value => {
        if (value) {
         this.addBillingAddress();
        }
      })
    );
  }

  initializeListeners(): void {
    this.getIsUserFromUS();
    this.months$ = this.infoService.getMonths();
    this.yearList = this.dateService.getYearsForCard();
    this.states$ = this.infoService.getStates();
  }

  addBillingAddress(): void {
    this.form.addControl('billingAddress', this.fb.group({
      stateId: [null, Validators.required],
      streetNumber: [null, Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      apartment: [null, Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      zipCode: [null, Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      city: [null, Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
    }))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      userId: [this.storageService.getUserId()],
      cardNumber: [null, Validators.required],
      name: [null, Validators.required],
      expMonth: [null, Validators.required],
      expYear: [null, Validators.required],
      cvc: [null, Validators.required],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const body = {
        ...this.form.value,
        cardNumber: this.form.value.cardNumber.toString()
      }
      this.subscription.add(
        this.registrationService.saveCardDetails(body).subscribe(user => {
          if (user.token) {
            this.authService.setSessions(user);
            this.storageService.setItem('userType', 2);
            this.router.navigate([`student/profile`]);
          }
        })
      )
    } else {
      this.form.markAllAsTouched();
    }
  }

  get billingAddress(): FormGroup {
    return this.form.get('billingAddress') as FormGroup;
  }

  previousStep(): void {
    this.registrationService.stepNumber$.next(4);
    this.router.navigate(['student/signUp/step-four']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
