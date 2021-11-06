import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {Subscription} from "rxjs";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {SaveCertificates, SaveInstitutions} from "../../../shared/models/registration.model";

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  form: FormGroup;
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  private actionType: "CREATE" | "UPDATE" = "CREATE";

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrartionService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.formInitialization();
    this.registrationService.getCertificates(this.storageService.getUserId()).subscribe((certificates)=> {
      if (certificates.length > 0) {
        this.actionType = "UPDATE";
        this.patchFormValue(certificates)
      } else {
        this.actionType = "CREATE";
      }
    })
  }

  formInitialization(): void {
    const form = this.createNewForm();
    this.updateValueAndValidity(form);
    this.form = this.fb.group({
      formArray: this.fb.array([form])
    })
    this.formArray.updateValueAndValidity();
  }

  createNewForm(): FormGroup {
    return this.fb.group({
      institutionName: [null, [Validators.required]],
      qualification: [null, [Validators.required]],
      date: [null, [Validators.required]],
      userId:[this.storageService.getUserId()],
      id: []
    })
  }

  get formArray(): FormArray {
    return this.form.get('formArray') as FormArray;
  }

  addNewForm(): void {
    const form = this.createNewForm();
    this.updateValueAndValidity(form);
    this.formArray.controls.push(form);
    this.formArray.updateValueAndValidity();

  }

  onSubmit(): void {
    if (this.actionType === "CREATE") {
      this.saveCertificates();
    } else {
      this.updateCertificates();
    }
  }

  updateValueAndValidity(form: FormGroup): void {
    this.subscription.add(
      form.valueChanges.subscribe(() => this.formArray.updateValueAndValidity())
    );
  }

  removeForm(form: any): void {
    this.formArray.controls = this.formArray.controls.filter(item => item !== form);
    this.formArray.updateValueAndValidity();
  }

  private saveCertificates(): void {
    this.subscription.add(
      this.registrationService.saveCertificates(this.formArray.value).subscribe(() => this.next.emit())
    )
  }

  private updateCertificates(): void {
    this.subscription.add(
      this.registrationService.updateCertificates(this.formArray.value).subscribe(() => this.next.emit())
    )
  }

  patchFormValue(institutions: SaveCertificates[]): void {
    this.formArray.controls = [];
    institutions.forEach(item => {
      let form = this.createNewForm();
      form.patchValue(item)
      form.valueChanges.subscribe(() => this.formArray.updateValueAndValidity())
      this.formArray.controls.push(form)
      this.formArray.updateValueAndValidity()
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
