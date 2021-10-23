import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Observable} from "rxjs";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {DaysOfWeek, HoursOfDay} from "../../../shared/models/infos.model";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {ValidationService} from "../../../shared/services/validation/validation.service";

@Component({
  selector: 'app-fourth-step',
  templateUrl: './fourth-step.component.html',
  styleUrls: ['./fourth-step.component.scss']
})
export class FourthStepComponent implements OnInit {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  studentLevels$: Observable<KeyValuePair[]>;
  hoursPerWeekForTutor$: Observable<KeyValuePair[]>;
  daysOfWeek$: Observable<DaysOfWeek[]>;
  hoursOfDay$: Observable<HoursOfDay[]>;
  tutorExperiences$: Observable<KeyValuePair[]>;
  selectedStudentLevels: number[] = [];

  constructor(
    private fb: FormBuilder,
    private infoService: InfosService,
    private registrartionService: RegistrartionService,
    private validationService: ValidationService,
  ) {
  }

  ngOnInit(): void {
    this.formInitialization();
    this.initializeListeners();
  }

  formInitialization(): void {
    this.form = this.fb.group({
      userId: [52],
      everTutored: [null, [Validators.required]],
      experienceYears: [null],
      everTutoredOnline: [null, [Validators.required]],
      hoursPerWeekCurrently: [null, [Validators.required]],
      onlineTutoringVariant: [null],
      linkTutorAndStudentTypes: [null, [Validators.required]],
      wantToBeInstructor: [null, [Validators.required]],
      interview: this.fb.array([this.newInterview()]),
      workHistory: this.fb.array([
        this.fb.group({
          schoolOrInstitutionName: [null],
          startYear: [null],
          endYear: [null],
          current: [false]
        })
      ]),
      professionalReferencesForInstructor: this.fb.array([
        this.newProfessionalReferencesForInstructor(),
        this.newProfessionalReferencesForInstructor(),
      ])
    })
  }

  get interview(): FormArray {
    return this.form.get("interview") as FormArray
  }

  get workHistory(): FormArray {
    return this.form.get("workHistory") as FormArray
  }

  get professionalReferencesForInstructor(): FormArray {
    return this.form.get("professionalReferencesForInstructor") as FormArray
  }

  addInterview() {
    this.interview.push(this.newInterview());
  }

  addProfessionalReferencesForInstructor() {
    this.professionalReferencesForInstructor.push(this.newProfessionalReferencesForInstructor());
  }

  addWorkHistory() {
    this.workHistory.push(this.newWorkHistory());
  }

  newInterview(): FormGroup {
    return this.fb.group({
      dayOfWeek: [null, [Validators.required]],
      startOfRange: [null, [Validators.required]],
      endOfRange: [null, [Validators.required]]
    });
  }

  newWorkHistory(): FormGroup {
    return this.fb.group({
      schoolOrInstitutionName: [null, [Validators.required]],
      startYear: [null, [Validators.required]],
      endYear: [null, [Validators.required]],
      current: [false, [Validators.required]]
    });
  }

  newProfessionalReferencesForInstructor(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      emailAddress: [null, [Validators.required, Validators.pattern(this.validationService.emailPattern)]],
      mobilePhone: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    // if (this.form.valid) {
    //   let studentsLevel = this.selectedStudentLevels.map(item => {
    //     return {studentType: item}
    //   })
    //   this.registrartionService.savePreferences({
    //     ...this.form.value,
    //     workHistory: this.form.value.wantToBeInstructor ? this.form.value.workHistory : null,
    //     linkTutorAndStudentTypes: studentsLevel
    //   }).subscribe(()=> this.next.emit());
    // } else {
    //   this.form.markAllAsTouched();
    // }

    this.next.emit();
  }

  selectStudentType(event: Event, studentType: KeyValuePair) {
    if (this.selectedStudentLevels.includes(studentType.id)) {
      this.selectedStudentLevels = this.selectedStudentLevels.filter(item => item !== studentType.id);
    } else {
      this.selectedStudentLevels.push(studentType.id);
    }
  }

  removeInterview(item: AbstractControl) {
    this.interview.controls = this.interview.controls.filter(control => control != item);
  }

  removeWorkHistory(item: AbstractControl) {
    this.workHistory.controls = this.workHistory.controls.filter(control => control != item);
  }

  removeReferencesForInstructor(item: AbstractControl) {
    this.professionalReferencesForInstructor.controls = this.professionalReferencesForInstructor.controls.filter(control => control != item);
  }

  private initializeListeners(): void {
    this.studentLevels$ = this.infoService.getStudentLevels();
    this.hoursPerWeekForTutor$ = this.infoService.getHoursPerWeekForTutor();
    this.daysOfWeek$ = this.infoService.getDaysOfWeek();
    this.hoursOfDay$ = this.infoService.getHoursOfDay();
    this.tutorExperiences$ = this.infoService.getTutorExperiences();
    this.subscribeToEverTutoredValueChange();
    this.subscribeToEverTutoredOnlineValueChange();
    this.subscribeToWantToBeInstructorValueChange();

  }

  subscribeToEverTutoredValueChange(): void {
    this.form.get('everTutored')?.valueChanges.subscribe(value => {
      if (value) {
        this.form.get('experienceYears')?.setValidators(Validators.required);
      } else {
        this.form.get('experienceYears')?.removeValidators(Validators.required)
      }
    });
  }

  subscribeToEverTutoredOnlineValueChange(): void {
    this.form.get('everTutoredOnline')?.valueChanges.subscribe(value => {
      if (value) {
        this.form.get('onlineTutoringVariant')?.setValidators(Validators.required);
      } else {
        this.form.get('onlineTutoringVariant')?.removeValidators(Validators.required)
      }
    });
  }

  subscribeToWantToBeInstructorValueChange(): void {
    this.form.get('wantToBeInstructor')?.valueChanges.subscribe(value => {
      if (value) {
        this.workHistory.controls.forEach(item => {
          item.get('startYear')?.setValidators(Validators.required);
          item.get('schoolOrInstitutionName')?.setValidators(Validators.required);
          item.get('endYear')?.setValidators(Validators.required);
          item.get('current')?.setValidators(Validators.required);
        })
      } else {
        this.workHistory.controls.forEach(item => {
          item.get('startYear')?.clearValidators();
          item.get('startYear')?.updateValueAndValidity();
          item.get('schoolOrInstitutionName')?.clearValidators();
          item.get('schoolOrInstitutionName')?.updateValueAndValidity();
          item.get('endYear')?.clearValidators();
          item.get('endYear')?.updateValueAndValidity();
          item.get('current')?.clearValidators();
          item.get('current')?.updateValueAndValidity();
        })
      }
    });
  }
}
