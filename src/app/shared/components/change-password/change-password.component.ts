import {Component, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../services/storage/storage.service";
import {SettingsService} from "../../services/settings/settings.service";
import {ValidationService} from "../../services/validation/validation.service";
import {RegistrationService} from "../../services/registration/registration.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  private readonly subscription: Subscription = new Subscription();
  passwordValidation$: Subject<string>;
  form: FormGroup;
  wrongPassword: boolean;

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private validationService: ValidationService,
    private registrationService: RegistrationService,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeOnCurrentPasswordChange();
    this.resetPasswordError();
    this.passwordValidation$ = this.registrationService.passwordValidation$;
  }


  initializeForm(): void {
    this.form = this.fb.group({
      userId: [this.storageService.getUserId()],
      currentPassword: [null, [Validators.required]],
      password: [null],
      rePassword: [null, [Validators.required]],
    }, {validators: this.validationService.checkPasswords})
  }

  onSubmit(): void {
    this.wrongPassword = false;
    if (this.form.valid) {
      delete this.form.value.rePassword;
      const password = this.form.value.password;
      delete this.form.value.password;
      this.subscription.add(
        this.settingsService.updatePassword({...this.form.value, newPassword: password})
          .subscribe(
            () => {
              this.form.reset();
              this.form.get('userId')?.setValue(this.storageService.getUserId());
            },
            (err) => {
              if (err.error.type === "Wrong password") {
                this.wrongPassword = true;
              }
            }
          )
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  subscribeOnCurrentPasswordChange(): void {
    this.subscription.add(
      this.form.get('currentPassword')?.valueChanges.subscribe(() => this.wrongPassword = false)
    );
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
