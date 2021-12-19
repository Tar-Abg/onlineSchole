import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Observable, Subscription} from "rxjs";
import {Country} from "../../../shared/models/infos.model";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-third-step',
  templateUrl: './student-third-step.component.html',
  styleUrls: ['./student-third-step.component.scss']
})
export class StudentThirdStepComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  form: FormGroup;
  countries$: Observable<Country[]>;
  private actionType: "CREATE" | "UPDATE" = "CREATE";

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private infoService: InfosService,
    private registrationService: RegistrartionService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeListeners();
    this.registrationService.stepNumber$.next(3);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      countryId: [null, [Validators.required]],
      city: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      streetNumber: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      streetName: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      zipCode: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.actionType === "CREATE") {
        this.saveAddress();
      } else {
        this.updateAddress();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private initializeListeners(): void {
    this.countries$ = this.infoService.getCountries();
    this.getBasicInformation();
  }

  private getBasicInformation(): void {
    this.subscription.add(
      this.registrationService.getStudentAddressPage(this.storageService.getUserId()).subscribe(address => {
        if (address) {
          this.actionType = "UPDATE";
          this.form.patchValue(address);
        } else {
          this.actionType = "CREATE"
        }
      })
    );
  }

  private saveAddress(): void {
    this.subscription.add(
      this.registrationService.saveStudentAddress(this.form.value).subscribe(() => this.nextStep())
    );
  }
  private updateAddress(): void {
    this.subscription.add(
      this.registrationService.updateStudentAddress(this.form.value).subscribe(() => this.nextStep())
    );
  }

  nextStep(): void {
    this.registrationService.stepNumber$.next(4);
    this.router.navigate(['student/signUp/step-four']);
  }

  previousStep(): void {
    this.registrationService.stepNumber$.next(2);
    this.router.navigate(['student/signUp/step-two']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
