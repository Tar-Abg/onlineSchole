import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../services/storage/storage.service";
import {InfosService} from "../../services/infos/infos.service";
import {ValidationService} from "../../services/validation/validation.service";
import {Observable, Subscription} from "rxjs";
import {Country} from "../../models/infos.model";
import {PersonalInformation} from "../../models/settings.model";
import {SettingsService} from "../../services/settings/settings.service";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  countries$: Observable<Country[]>;
  form: FormGroup;
  isOpenPasswordModal: boolean = true;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private infoService: InfosService,
    private settingService: SettingsService,
    private validationService: ValidationService
  ) {
  }

  ngOnInit(): void {
    this.formInitialization();
    this.countries$ = this.infoService.getCountries();
    this.getPersonalInformation();
  }

  formInitialization(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      mobileCode: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.validationService.emailPattern)]],
      userAddress: this.fb.group({
        countryId: [null, [Validators.required]],
        city: [null, [Validators.required]],
        streetNumber: [null, [Validators.required]],
        streetName: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        tutorBasicInformationId: [null],
      })
    });
    this.form.disable();
  }

  get userAddress(): FormGroup {
    return this.form.get('userAddress') as FormGroup;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isOpenPasswordModal = true;
    } else {
      this.form.markAllAsTouched();
    }
  }

  getPersonalInformation(): void {
    if (this.storageService.getUserId()) {
      this.subscription.add(
        this.settingService.getPersonalInformation(this.storageService.getUserId()).subscribe(
          (data: PersonalInformation) => this.form.patchValue(data)
        )
      )
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
