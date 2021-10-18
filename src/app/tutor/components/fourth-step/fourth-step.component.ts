import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Observable} from "rxjs";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {DaysOfWeek, HoursOfDay} from "../../../shared/models/infos.model";

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

  constructor(
    private fb: FormBuilder,
    private infoService: InfosService
  ) {
  }

  ngOnInit(): void {

    this.formInitialization();
    this.studentLevels$ = this.infoService.getStudentLevels();
    this.hoursPerWeekForTutor$ = this.infoService.getHoursPerWeekForTutor();
    this.daysOfWeek$ = this.infoService.getDaysOfWeek();
    this.hoursOfDay$ = this.infoService.getHoursOfDay();
    this.tutorExperiences$ = this.infoService.getTutorExperiences();
  }

  formInitialization(): void {
    this.form = this.fb.group({
      everTutored: [null, [Validators.required]],
      experienceYears: [null, [Validators.required]],
      everTutoredOnline: [null, [Validators.required]],
      hoursPerWeekCurrently: [null, [Validators.required]],
      onlineTutoringVariant: [null, [Validators.required]],
      linkTutorAndStudentTypes: [null, [Validators.required]],
      wantToBeInstructor: [null, [Validators.required]],
      interview: this.fb.array([
          this.fb.group({
            dayOfWeek: [null, [Validators.required]],
            startOfRange: [null, [Validators.required]],
            endOfRange: [null, [Validators.required]],
          })
        ],
      ),
      workHistory: this.fb.array([
          this.fb.group({
            schoolOrInstitutionName: [null, [Validators.required]],
            startYear: [null, [Validators.required]],
            endYear: [null, [Validators.required]],
            current: [null, [Validators.required]],
          })
        ],
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
        })
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
    this.professionalReferencesForInstructor.push(this.newInterview());
  }

  addWorkHistory() {
    this.workHistory.push(this.newWorkHistory());
  }

  newInterview(): FormGroup {
    return this.fb.group({
      dayOfWeek: [null, [Validators.required]],
      startOfRange: [null, [Validators.required]],
      endOfRange: [null, [Validators.required]],
    })
  }

  newWorkHistory(): FormGroup {
    return this.fb.group({
      schoolOrInstitutionName: [null, [Validators.required]],
      startYear: [null, [Validators.required]],
      endYear: [null, [Validators.required]],
      current: [null, [Validators.required]],
    })
  }

  newProfessionalReferencesForInstructor(): FormGroup {
    return this.fb.group({
      name: [null],
      lastName: [null],
      emailAddress: [null],
      mobilePhone: [null],
    })
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
