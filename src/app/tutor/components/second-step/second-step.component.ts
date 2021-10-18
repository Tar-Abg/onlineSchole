import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  public form: FormGroup;
  countries$: Observable<Country[]>;
  institutionalLevels$: Observable<KeyValuePair[]>;
  public dynamicFormList: FormGroup[] = [];

  constructor(
    private fb: FormBuilder,
    private infoService: InfosService,
    private registrationService: RegistrartionService
  ) {
  }

  ngOnInit(): void {
    this.formInitialization();
    this.countries$ = this.infoService.getCountries();
    this.institutionalLevels$ = this.infoService.getInstitutionalLevels();
  }

  addNewForm(): void {
    const form = this.createNewForm();
    this.dynamicFormList.push(form);
  }

  onSubmit(): void {
    // let formList: any[] = [];
    // let isValidAllForms = true;
    //
    // if (this.form.valid) {
    //   this.dynamicFormList.forEach((form: FormGroup) => {
    //       if (form.valid) {
    //         formList.push(
    //           {
    //             ...form.value,
    //             startDate: form.value.startDate ? form.value.startDate.toISOString() : null,
    //             graduationDate: form.value.graduationDate ? form.value.graduationDate.toISOString() : null,
    //             userId: 51
    //           }
    //         )
    //       } else {
    //         form.markAllAsTouched();
    //         isValidAllForms = false;
    //       }
    //     }
    //   )
    // } else {
    //   this.form.markAllAsTouched();
    //   isValidAllForms = false;
    // }
    //
    // if (isValidAllForms) {
    //   formList.push(
    //     {
    //       ...this.form.value,
    //       userId: 51
    //     });
    //   this.registrationService.saveInstitutions(formList).subscribe(() => this.next.emit());
    // }
    this.next.emit();
  }

  formInitialization(): void {
    this.form = this.createNewForm();
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
    })
  }

  removeForm(form: FormGroup): void {
    this.dynamicFormList = this.dynamicFormList.filter(item => item !== form);
  }

}
