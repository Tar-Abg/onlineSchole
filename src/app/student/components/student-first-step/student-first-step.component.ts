import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {ValidationService} from "../../../shared/services/validation/validation.service";
import {Observable, Subject, Subscription} from "rxjs";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {TimeZones} from "../../../shared/models/infos.model";
import {MessageService} from "../../../shared/services/message/message.service";

@Component({
  selector: 'app-student-first-step',
  templateUrl: './student-first-step.component.html',
  styleUrls: ['./student-first-step.component.scss']
})
export class StudentFirstStepComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  timeZones$: Observable<TimeZones[]>;
  form: FormGroup;
  genderList$: Observable<KeyValuePair[]>;
  emailIsExist$: Subject<boolean>;
  usernameIsExist$: Subject<boolean>;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private validationService: ValidationService,
    private infosService: InfosService,
    private registrationService: RegistrartionService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.registrationService.stepNumber$.next(1);
    this.storageService.setUserType(2); // will be removed
    this.initializeForm();
    this.genderList$ = this.infosService.getGenders();
    this.emailIsExist$ = this.registrationService.emailIsExist$;
    this.usernameIsExist$ = this.registrationService.usernameIsExist$;
    this.timeZones$ = this.infosService.getTimeZones();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userType: [this.storageService.getUserType()],
      firstName: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      lastName: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      userName: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      preferredTimeZone: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.validationService.emailPattern), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      password: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      rePassword: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],

    }, {validators: this.validationService.checkPasswords})
  }

  onSubmit(): void {
    if (this.form.valid) {
        this.saveInformation();
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveInformation(): void {
    this.subscription.add(
      this.registrationService.saveInformation({
        ...this.form.value,
        userType: this.storageService.getUserType()
      }).subscribe((message: string) => {
        this.messageService.setNewMessage(message);
        this.messageService.setBackToMainPage(true);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
