import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Country} from "../../models/infos.model";
import {KeyValuePair} from "../../models/keyValuePair.model";
import {InfosService} from "../../services/infos/infos.service";
import {RegistrartionService} from "../../services/registration/registrartion.service";
import {StorageService} from "../../services/storage/storage.service";
import {SaveInstitutions} from "../../models/registration.model";


@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit, OnDestroy{
  private readonly subscription: Subscription = new Subscription();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  countries$: Observable<Country[]>;
  institutionalLevels$: Observable<KeyValuePair[]>;
  private actionType: "CREATE" | "UPDATE" = "CREATE";
  @Input() isLoggedIn: boolean = true;
  @Input() showPrevious: boolean = true;


  constructor(
    private fb: FormBuilder,
    private infoService: InfosService,
    private registrationService: RegistrartionService,
    private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    this.formInitialization();
    this.initializeSubscriptions();
  }

  addNewForm(): void {
    const form = this.createNewForm();
    this.subscribeForFormValueChange(form)
    this.formArray.controls.push(form)
  }

  onSubmit(): void {
    if (this.formArray.valid) {
      if (this.actionType === "CREATE") {
        this.saveInstitutions();
      } else {
        this.updateInstitutions();
      }
    } else {
      this.formArray.markAllAsTouched()
    }
  }

  formInitialization(): void {
    const form = this.createNewForm();
    this.subscribeForFormValueChange(form);
    this.form = this.fb.group({
      formArray: this.fb.array([form])
    })
    this.formArray.updateValueAndValidity();
  }

  get formArray(): FormArray {
    return this.form.get('formArray') as FormArray;
  }

  createNewForm(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required]],
      educationalLevel: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      city: [null, [Validators.required]],
      major: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      graduationDate: [null, [Validators.required]],
      degreeInProgress: [false, [Validators.required]],
      pdfFromInstitution: [null],
      userId: [this.storageService.getUserId()],
      pdfName: [null],
      id: [null]
    })
  }

  removeForm(form: any): void {
    this.formArray.controls = this.formArray.controls.filter(item => item !== form);
    this.formArray.updateValueAndValidity();
  }

  initializeSubscriptions(): void {
    this.countries$ = this.infoService.getCountries();
    this.institutionalLevels$ = this.infoService.getInstitutionalLevels();
    this.getInstitutionsPage();
  }

  getInstitutionsPage(): void {
    const userId = this.storageService.getUserId();
    if (userId) {
      this.subscription.add(
        this.registrationService.getInstitutionsPage(userId).subscribe((institutions) => {
          if (institutions.length) {
            this.actionType = "UPDATE";
            this.patchFormValue(institutions);
          } else {
            this.actionType = "CREATE";
          }
        })
      )
    }
  }

  saveInstitutions(): void {
    this.subscription.add(
      this.registrationService.saveInstitutions(this.formArray.value).subscribe(() => this.next.emit())
    )
  }

  updateInstitutions(): void {
    if (this.formArray.valid) {
      this.subscription.add(
        this.registrationService.updateInstitutions(this.formArray.value).subscribe(() => this.next.emit())
      )
    } else {
      this.form.markAllAsTouched();
    }
  }

  patchFormValue(institutions: SaveInstitutions[]): void {
    this.formArray.controls = [];
    institutions.forEach(item => {
      let form = this.createNewForm();
      this.subscribeForFormValueChange(form);
      form.patchValue(item)
      this.formArray.controls.push(form)
      this.formArray.updateValueAndValidity()
    })
  }


  subscribeForFormValueChange(form: FormGroup): void {
    this.degreeInProgressChanged(form);
    this.subscription.add(
      form.valueChanges.subscribe(val => {
        this.formArray.updateValueAndValidity();
      })
    );
  }

  fileUploaded(event: any, formGroup: any) {
    let reader = new FileReader();
    let file = event.files[0];
    reader.readAsDataURL(file)
    formGroup.get('pdfName')?.setValue(file.name);
    reader.onload = () => {
      formGroup.get('pdfFromInstitution')?.setValue(reader.result);
      this.formArray.updateValueAndValidity();
    };
  }

  degreeInProgressChanged(form: FormGroup): void {
    this.subscription.add(
      form.get('degreeInProgress')?.valueChanges.subscribe(value => {
        if (value === true) {
          form.get('graduationDate')?.reset();
          form.get('graduationDate')?.removeValidators(Validators.required);
          form.get('pdfFromInstitution')?.addValidators(Validators.required);
        } else {
          form.get('graduationDate')?.addValidators(Validators.required);
          form.get('pdfFromInstitution')?.removeValidators(Validators.required);
          form.get('pdfFromInstitution')?.updateValueAndValidity();
          form.get('pdfFromInstitution')?.reset();
          form.get('pdfName')?.reset();
        }
        form.get('graduationDate')?.updateValueAndValidity();
        form.get('pdfFromInstitution')?.updateValueAndValidity();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
