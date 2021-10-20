import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Observable} from "rxjs";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {DaysOfWeek, HoursOfDay} from "../../../shared/models/infos.model";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";

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
    private registrartionService: RegistrartionService
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
      interview: this.fb.array([this.newInterview()],
      ),
      workHistory: this.fb.array([this.newWorkHistory()],
      ),
      professionalReferencesForInstructor: this.fb.array([
        this.fb.group({
          name: [null, [Validators.required]],
          lastName: [null, [Validators.required]],
          emailAddress: [null, [Validators.required]],
          mobilePhone: [null, [Validators.required]],
        }),
        this.fb.group({
          name: [null, [Validators.required]],
          lastName: [null, [Validators.required]],
          emailAddress: [null, [Validators.required]],
          mobilePhone: [null, [Validators.required]],
        }),
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
      endOfRange: [null, [Validators.required]],
      userId: [52],
    })
  }

  newWorkHistory(): FormGroup {
    return this.fb.group({
      schoolOrInstitutionName: [null],
      startYear: [null],
      endYear: [null],
      current: [null],
      userId: [52],
    })
  }

  newProfessionalReferencesForInstructor(): FormGroup {
    return this.fb.group({
      name: [null],
      lastName: [null],
      emailAddress: [null],
      mobilePhone: [null],
      userId: [52],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      let studentsLevel = this.selectedStudentLevels.map(item => {
        return {userId: 52, studentType: item}
      })
      this.registrartionService.savePreferences({
        ...this.form.value,
        linkTutorAndStudentTypes: studentsLevel
      }).subscribe();
    } else {
      this.form.markAllAsTouched();
    }
    console.log(this.form.errors);


  }

  selectStudentType(event: Event, studentType: KeyValuePair) {
    if (this.selectedStudentLevels.includes(studentType.id)) {
      this.selectedStudentLevels = this.selectedStudentLevels.filter(item => item !== studentType.id);
    } else {
      this.selectedStudentLevels.push(studentType.id);
    }
    console.log(this.selectedStudentLevels);
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

    this.form.get('everTutored')?.valueChanges.subscribe(value => {
      if (value) {
        this.form.get('experienceYears')?.setValidators(Validators.required);
      } else {
        this.form.get('experienceYears')?.removeValidators(Validators.required)
      }
    });
    this.form.get('everTutoredOnline')?.valueChanges.subscribe(value => {
      if (value) {
        this.form.get('onlineTutoringVariant')?.setValidators(Validators.required);
      } else {
        this.form.get('onlineTutoringVariant')?.removeValidators(Validators.required)
      }
    }) ;
    this.form.get('wantToBeInstructor')?.valueChanges.subscribe(value => {
      if (value) {
        this.workHistory.setValidators(Validators.required)
        this.workHistory.controls.forEach(item => {
          item.setValidators(Validators.required);
          // item.get('userId')?.removeValidators(Validators.required);
          // item.get('startYear')?.setValidators(Validators.required);
          // item.get('schoolOrInstitutionName')?.setValidators(Validators.required);
          // item.get('endYear')?.setValidators(Validators.required);
          // item.get('current')?.setValidators(Validators.required);
          // console.log(item);
        })
      } else {
        this.workHistory.controls.forEach(item => {
          item.removeValidators(Validators.required);
        })
      }
    })



  }
}
