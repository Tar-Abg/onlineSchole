import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../../services/registration/registration.service";
import {StorageService} from "../../services/storage/storage.service";
import {SaveCertificates} from "../../models/registration.model";

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  private readonly subscription: Subscription = new Subscription();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  @Input() isLoggedIn: boolean = true;
  form: FormGroup;
  private actionType: "CREATE" | "UPDATE" = "CREATE";
  todayDate = new Date();

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
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
      institutionName: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      qualification: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
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
    const body = this.checkIfEmpty();
    this.subscription.add(
      this.registrationService.saveCertificates(body).subscribe(() => this.next.emit())
    )
  }

  updateCertificates(): void {
    const body = this.checkIfEmpty();
    this.subscription.add(
      this.registrationService.updateCertificates(body).subscribe(() => this.next.emit())
    )
  }

  checkIfEmpty(): any {
    let formArray = this.formArray.value;
    formArray.forEach((form: any) => {
      const copyForm = JSON.parse(JSON.stringify(form));
      delete copyForm.userId
      delete copyForm.id
      const isEmpty = Object.values(copyForm).every(x => (x === null || x === ''));
      isEmpty ? formArray = formArray.filter((item: any) => item !== form): formArray = formArray;
    });
    formArray = !formArray.length ? [this.formArray.value[0]] : formArray;
    return formArray;
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
