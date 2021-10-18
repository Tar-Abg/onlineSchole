import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Month} from "../../../shared/models/infos.model";
import {ValidationService} from "../../../shared/services/validation/validation.service";
import {SaveInformation} from "../../../shared/models/registration.model";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup = {} as FormGroup;
  genderList$: Observable<KeyValuePair[]>;
  months$: Observable<Month[]>;
  yearList: KeyValuePair[];
  readonly emailPattern = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])";

  constructor(
    private fb: FormBuilder,
    private infosService: InfosService,
    private validationService: ValidationService,
    private registrationService: RegistrartionService
  ) { }

  ngOnInit(): void {
   this.formInitialization();

    this.genderList$ = this.infosService.getGenders();
    this.months$ = this.infosService.getMonths();
    this.yearList = this.getYears(1930);
  }

  getYears(startYear: number): KeyValuePair[] {
    let yearList: KeyValuePair[] = [];
    const thisYear = new Date().getFullYear();
    let year = startYear;
    while (year <= thisYear ) {
      yearList.push({id: year, description: year.toString()});
      year++
    }
    return yearList
  }

  formInitialization(): void {
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      monthOfBirth: [null, [Validators.required]],
      yearOfBirth: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],
    }, { validators: this.validationService.checkPasswords })
  }

  onSubmit(): void {
    console.log(222)
    this.next.emit()
    // if (this.form.valid) {
    //   this.registrationService.saveInformation({...this.form.value, userType: 1}).subscribe(()=> this.next.emit())
    // } else {
    //   this.form.markAllAsTouched();
    // }
  }
}
