import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../../../shared/services/registration/registration.service";
import {Observable, Subscription} from "rxjs";
import {Country} from "../../../shared/models/infos.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fifth-step',
  templateUrl: './fifth-step.component.html',
  styleUrls: ['./fifth-step.component.scss']
})
export class FifthStepComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  phoneCods$: Observable<Country[]>
  form: FormGroup;
  private actionType: "CREATE" | "UPDATE" = "CREATE";
  showConfirmRegister = false;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private infoService: InfosService,
    private storageService: StorageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.formInitialization();
    this.initializeSubscriptions();
    this.registrationService.stepNumber$.next(5);
  }

  formInitialization(): void {
    this.form = this.fb.group({
      userId: [this.storageService.getUserId()],
      mobileCode: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      linkToSocialMedia: [null, [Validators.required]],
      socialMediaExistance: [false, [Validators.required]],
    })
  }

  initializeSubscriptions(): void {
    this.phoneCods$ = this.infoService.getCountriesForTutor();
    this.getContactsPage();
    this.socialMediaExistenceChange();
  }

  getContactsPage(): void {
    this.subscription.add(
      this.registrationService.getContactsPage(this.storageService.getUserId()).subscribe((contacts) => {
        if (contacts) {
          this.actionType = "UPDATE";
          this.form.patchValue(contacts);
        } else {
          this.actionType = "CREATE";
        }
      })
    )
  }

  socialMediaExistenceChange(): void {
    this.subscription.add(
      this.form.get('socialMediaExistance')?.valueChanges.subscribe((value) => {
        if (value) {
          this.form.get('linkToSocialMedia')?.removeValidators(Validators.required);
          this.form.get('linkToSocialMedia')?.reset();
          this.form.get('linkToSocialMedia')?.disable();
          this.form.get('linkToSocialMedia')?.updateValueAndValidity()
        } else {
          this.form.get('linkToSocialMedia')?.enable();
          this.form.get('linkToSocialMedia')?.setValidators(Validators.required);
          this.form.get('linkToSocialMedia')?.updateValueAndValidity()
        }
      })
    )
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.showConfirmRegister = true;
    } else {
      this.form.markAllAsTouched();
    }
  }

  register(): void {
    if (this.actionType === "CREATE") {
      this.saveContacts();
    } else {
      this.updateContacts();
    }
  }

  saveContacts(): void {
    this.subscription.add(
      this.registrationService.saveContacts(this.form.getRawValue()).subscribe(() => {
        this.showConfirmRegister = false;
        this.router.navigate(['/']);
      })
    );
  }

  updateContacts(): void {
    this.subscription.add(
      this.registrationService.updateContacts(this.form.getRawValue()).subscribe(() => {
        this.showConfirmRegister = false;
        this.router.navigate(['/']);
      })
    );
  }

  previousStep(): void {
    this.registrationService.stepNumber$.next(4);
    this.router.navigate(['tutor/signUp/step-four']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
