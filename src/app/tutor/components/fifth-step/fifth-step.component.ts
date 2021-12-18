import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {Observable, Subscription} from "rxjs";
import {Country} from "../../../shared/models/infos.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {StorageService} from "../../../shared/services/storage/storage.service";

@Component({
  selector: 'app-fifth-step',
  templateUrl: './fifth-step.component.html',
  styleUrls: ['./fifth-step.component.scss']
})
export class FifthStepComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  phoneCods$: Observable<Country[]>
  form: FormGroup;
  private actionType: "CREATE" | "UPDATE" = "CREATE";

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrartionService,
    private infoService: InfosService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.formInitialization();
    this.initializeSubscriptions();

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
    this.phoneCods$ = this.infoService.getCountries();
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
          this.form.get('linkToSocialMedia')?.updateValueAndValidity()
        } else {
          this.form.get('linkToSocialMedia')?.setValidators(Validators.required);
          this.form.get('linkToSocialMedia')?.updateValueAndValidity()
        }
      })
    )
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.actionType === "CREATE") {
        this.saveContacts();
      } else {
        this.updateContacts();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveContacts(): void {
    this.subscription.add(
      this.registrationService.saveContacts(this.form.value).subscribe()
    );
  }

  updateContacts(): void {
    this.subscription.add(
      this.registrationService.updateContacts(this.form.value).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
