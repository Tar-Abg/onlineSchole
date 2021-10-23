import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Country} from "../../../shared/models/infos.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup
  countries$: Observable<Country[]>;
  institutionalLevels$: Observable<KeyValuePair[]>;
  userId: any

  constructor(
    private fb: FormBuilder,
    private infoService: InfosService,
    private registrationService: RegistrartionService
  ) {
  }

  ngOnInit(): void {
    this.countries$ = this.infoService.getCountries();
    this.institutionalLevels$ = this.infoService.getInstitutionalLevels();
    this.userId = localStorage.getItem('userId');
    this.formInitialization();

    this.userId && this.registrationService.getInstitutionsPage(+this.userId).subscribe((institutions) => {
      console.log(institutions)
      this.formArray.controls = [];
      institutions.forEach(item => {
        let form = this.createNewForm();
        form.patchValue(item)
        this.formArray.controls.push(form)
      })
      // this.formArray.patchValue(institutions)
    })
    console.log(this.userId);
  }

  addNewForm(): void {
    const form = this.createNewForm();
    this.formArray.controls.push(form)
    // this.dynamicFormList.push(form);
  }

  onSubmit(): void {
    // if (this.formArray.valid) {
    //     this.registrationService.saveInstitutions(this.formArray.value).subscribe(() => this.next.emit());
    // } else {
    //   this.formArray.markAllAsTouched()
    // }
    // console.log(this.formArray.valid)
    // console.log()
    this.next.emit();
  }

  formInitialization(): void {
    // this.form = this.createNewForm();
    this.form = this.fb.group({
      formArray:  this.fb.array([this.createNewForm()])
    })
  }
  get formArray(): FormArray {
    return this.form.get('formArray') as FormArray
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
      userId: [+this.userId],

    })
  }

  removeForm(form: any): void {
      this.formArray.controls = this.formArray.controls.filter(item => item !== form);
    console.log(this.formArray.controls);
  }

}
