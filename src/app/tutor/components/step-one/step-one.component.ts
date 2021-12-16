import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subject, Subscription} from "rxjs";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Month, TimeZones} from "../../../shared/models/infos.model";
import {ValidationService} from "../../../shared/services/validation/validation.service";
import {SaveInformation} from "../../../shared/models/registration.model";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
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
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup = {} as FormGroup;
  genderList$: Observable<KeyValuePair[]>;
  months$: Observable<Month[]>;
  timeZones$: Observable<TimeZones[]>;
  yearList: KeyValuePair[];
  emailIsExist$: Subject<boolean>;
  usernameIsExist$: Subject<boolean>;
  // private actionType: "CREATE" | "UPDATE" = "CREATE";
  userId: number;

  constructor(
    private fb: FormBuilder,
    private infosService: InfosService,
    private validationService: ValidationService,
    private registrationService: RegistrartionService,
    private storageService: StorageService,
    private dateService: DateService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.storageService.setUserType(1) // will be removed
    this.formInitialization();
    this.userId = this.storageService.getUserId();
    this.initializeSubscriptions();
  }

  formInitialization(): void {
    this.form = this.fb.group({
      userType: [this.storageService.getUserType()],
      firstName: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      lastName: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      userName: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      preferredTimeZone: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      monthOfBirth: [null, [Validators.required]],
      yearOfBirth: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.validationService.emailPattern)]],
      password: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      rePassword: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    }, {validators: this.validationService.checkPasswords})
  }

  onSubmit(): void {
    if (this.form.valid) {
      // if (this.actionType === "UPDATE") {
      //   this.updateInformation();
      // } else {
        this.saveInformation();
      // }
    } else {
      this.form.markAllAsTouched();
    }
  }

  updateInformation(): void {
    this.registrationService.updateInformation({
      ...this.form.value,
      userType: 1,
      id: this.userId
    }).subscribe(() => this.next.emit());
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
    // this.userId && this.getInformationForUser();
    this.emailIsExist$ = this.registrationService.emailIsExist$;
    this.usernameIsExist$ = this.registrationService.usernameIsExist$;
    this.timeZones$ = this.infosService.getTimeZones();
  }

  // getInformationForUser(): void {
  //   this.subscription.add(
  //     this.registrationService.getInformationPage(this.userId).subscribe((user) => {
  //       this.actionType = "UPDATE";
  //       this.patchFormValue(user);
  //     }, () => {
  //       this.actionType = "CREATE";
  //       this.storageService.clearUserId();
  //     })
  //   );
  // }

  patchFormValue(user: SaveInformation): void {
    this.form.patchValue(user);
    this.form.get('password')?.setValue(user.userPassword.password);
    this.form.get('rePassword')?.setValue(user.userPassword.password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
