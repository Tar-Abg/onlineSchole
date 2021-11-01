import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Observable, Subscription} from "rxjs";
import {Country} from "../../../shared/models/infos.model";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";

@Component({
  selector: 'app-student-third-step',
  templateUrl: './student-third-step.component.html',
  styleUrls: ['./student-third-step.component.scss']
})
export class StudentThirdStepComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  countries$: Observable<Country[]>;
  private actionType: "CREATE" | "UPDATE" = "CREATE";

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private infoService: InfosService,
    private registrationService: RegistrartionService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeListeners();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      countryId: [null, [Validators.required]],
      city: [null, [Validators.required]],
      streetNumber: [null, [Validators.required]],
      streetName: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
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
      this.registrationService.saveStudentAddress(this.form.value).subscribe(() => this.next.emit())
    );
  }
  private updateAddress(): void {
    this.subscription.add(
      this.registrationService.updateStudentAddress(this.form.value).subscribe(() => this.next.emit())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
