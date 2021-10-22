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
  userId: any

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
    this.userId = localStorage.getItem('userId');
    this.userId && this.registrationService.getInformationPage(+this.userId).subscribe((user)=> {
      this.form.patchValue(user);
      this.form.get('password')?.setValue(user.userPassword.password);
      this.form.get('rePassword')?.setValue(user.userPassword.password);
    })
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
      email: [null, [Validators.required, Validators.pattern(this.validationService.emailPattern)]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],
    }, { validators: this.validationService.checkPasswords })
  }

  onSubmit(): void {
    // this.next.emit()
    if (this.form.valid) {
      if (this.userId) {
        this.registrationService.updateInformation({...this.form.value, userType: 1, id: +this.userId}).subscribe(()=> this.next.emit())
      } else {
        this.registrationService.saveInformation({...this.form.value, userType: 1}).subscribe((userId: number)=> {
          this.setUserIdInLocalStorage(userId);
          this.next.emit();
        })
      }

    } else {
      this.form.markAllAsTouched();
    }
  }

  setUserIdInLocalStorage(userId: number): void {
    localStorage.setItem('userId', JSON.stringify(userId))
  }

}
