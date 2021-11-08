import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {SettingsService} from "../../../shared/services/settings/settings.service";
import {Subscription} from "rxjs";
import {ValidationService} from "../../../shared/services/validation/validation.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  form: FormGroup;
  wrongPassword: boolean;

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private validationService: ValidationService,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeOnCurrentPasswordChange();
  }


  initializeForm(): void {
    this.form = this.fb.group({
      userId: [this.storageService.getUserId()],
      currentPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
