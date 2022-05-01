import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subject, Subscription} from "rxjs";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Month, TimeZones} from "../../../shared/models/infos.model";
import {ValidationService} from "../../../shared/services/validation/validation.service";
import {RegistrationService} from "../../../shared/services/registration/registration.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {DateService} from "../../../shared/services/date/date.service";
import {MessageService} from "../../../shared/services/message/message.service";

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  public form: FormGroup = {} as FormGroup;
  genderList$: Observable<KeyValuePair[]>;
  months$: Observable<Month[]>;
  timeZones$: Observable<TimeZones[]>;
  yearList: KeyValuePair[];
  emailIsExist$: Subject<boolean>;
  usernameIsExist$: Subject<boolean>;
  passwordValidation$: Subject<string>;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private infosService: InfosService,
    private validationService: ValidationService,
    private registrationService: RegistrationService,
    private storageService: StorageService,
    private dateService: DateService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.storageService.setUserType(1); // will be removed
    this.formInitialization();
    this.userId = this.storageService.getUserId();
    this.initializeSubscriptions();
    this.registrationService.stepNumber$.next(1);
  }

  formInitialization(): void {
    this.form = this.fb.group({
      userType: [this.storageService.getUserType()],
      firstName: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      lastName: [null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      userName: [null, [Validators.required, Validators.maxLength(100), this.validationService.cannotContainSpace]],
      preferredTimeZone: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      monthOfBirth: [null, [Validators.required]],
      yearOfBirth: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.validationService.emailPattern)]],
      password: [null, [Validators.required, this.validationService.cannotContainSpace, Validators.minLength(8), Validators.pattern(/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/)]],
      rePassword: [null, [Validators.required]],
    }, {validators: this.validationService.checkPasswords});
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.saveInformation();
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveInformation(): void {
    this.registrationService.saveInformation({...this.form.value, userType: 1}).subscribe((message: string) => {
      this.messageService.setNewMessage(message);
      this.messageService.setBackToMainPage(true);
    });
  }

  initializeSubscriptions(): void {
    this.genderList$ = this.infosService.getGenders();
    this.months$ = this.infosService.getMonths();
    this.yearList = this.dateService.getYears(1930);
    this.emailIsExist$ = this.registrationService.emailIsExist$;
    this.usernameIsExist$ = this.registrationService.usernameIsExist$;
    this.timeZones$ = this.infosService.getTimeZones();
    this.passwordValidation$ = this.registrationService.passwordValidation$;
    this.resetPasswordError();
  }

  resetPasswordError(): void {
    this.subscription.add(
      this.form.get('password')?.valueChanges.subscribe(
        () => this.registrationService.passwordValidation$.next('')
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
