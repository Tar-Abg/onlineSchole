import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {ValidationService} from "../../../shared/services/validation/validation.service";
import {Observable, Subject, Subscription} from "rxjs";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {SaveInformation} from "../../../shared/models/registration.model";

@Component({
  selector: 'app-student-first-step',
  templateUrl: './student-first-step.component.html',
  styleUrls: ['./student-first-step.component.scss']
})
export class StudentFirstStepComponent implements OnInit, OnDestroy {
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  private subscription: Subscription = new Subscription();
  form: FormGroup;
  genderList$: Observable<KeyValuePair[]>;
  private actionType: "CREATE" | "UPDATE" = "CREATE";
  emailIsExist$: Subject<boolean>;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private validationService: ValidationService,
    private infosService: InfosService,
    private registrationService: RegistrartionService
  ) {
  }

  ngOnInit(): void {
    this.storageService.setUserType(2); // will be removed
    this.initializeForm();
    this.genderList$ = this.infosService.getGenders();
    this.getInformationForStudent();
    this.emailIsExist$ = this.registrationService.emailIsExist$;
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userType: [this.storageService.getUserType()],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      gender: [null],
      email: [null, [Validators.required, Validators.pattern(this.validationService.emailPattern)]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],

    }, {validators: this.validationService.checkPasswords})
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.actionType === "UPDATE") {
        this.updateInformation();
      } else {
        this.saveInformation();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  updateInformation(): void {
    this.subscription.add(
      this.registrationService.updateInformation({
        ...this.form.value,
        userType: this.storageService.getUserType(),
        id: this.storageService.getUserId()
      }).subscribe(() => this.next.emit())
    );
  }

  saveInformation(): void {
    this.subscription.add(
      this.registrationService.saveInformation({
        ...this.form.value,
        userType: this.storageService.getUserType()
      }).subscribe((userId: number) => {
        this.storageService.setUserIdInLocalStorage(userId);
        this.next.emit();
      })
    );
  }

  getInformationForStudent(): void {
    const userId = this.storageService.getUserId();
    if (userId) {
      this.subscription.add(
        this.registrationService.getInformationPage(userId).subscribe((user) => {
          this.actionType = "UPDATE";
          this.patchFormValue(user);
        }, () => {
          this.actionType = "CREATE";
          this.storageService.clearUserId();
        })
      );
    }
  }

  patchFormValue(user: SaveInformation): void {
    this.form.patchValue(user);
    this.form.get('password')?.setValue(user.userPassword.password);
    this.form.get('rePassword')?.setValue(user.userPassword.password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
