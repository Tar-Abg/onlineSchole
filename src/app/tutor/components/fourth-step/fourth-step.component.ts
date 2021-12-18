import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Observable, Subscription} from "rxjs";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {Country, DaysOfWeek, HoursOfDay, StudentLevel} from "../../../shared/models/infos.model";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {ValidationService} from "../../../shared/services/validation/validation.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {tap} from "rxjs/operators";
import {Preferences} from "../../../shared/models/registration.model";

@Component({
  selector: 'app-fourth-step',
  templateUrl: './fourth-step.component.html',
  styleUrls: ['./fourth-step.component.scss']
})
export class FourthStepComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  studentLevels: StudentLevel[];
  hoursPerWeekForTutor$: Observable<KeyValuePair[]>;
  daysOfWeek$: Observable<DaysOfWeek[]>;
  hoursOfDay$: Observable<HoursOfDay[]>;
  tutorExperiences$: Observable<KeyValuePair[]>;
  phoneCods$: Observable<Country[]>
  private actionType: "CREATE" | "UPDATE" = "CREATE";


  constructor(
    private fb: FormBuilder,
    private infoService: InfosService,
    private registrationService: RegistrartionService,
    private validationService: ValidationService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.formInitialization();
    this.initializeListeners();
  }

  formInitialization(): void {
    const workHistory = this.fb.group({
      schoolOrInstitutionName: [null],
      startYear: [null],
      endYear: [null],
      current: [false]
    });
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      everTutored: [null, [Validators.required]],
      experienceYears: [null],
      everTutoredOnline: [null, [Validators.required]],
      hoursPerWeekCurrently: [null, [Validators.required]],
      onlineTutoringVariant: [null],
      linkTutorAndStudentTypes: [null, [Validators.required]],
      wantToBeInstructor: [null, [Validators.required]],
      interview: this.fb.array([this.newInterview()]),
      workHistory: this.fb.array([
        workHistory
      ]),
      professionalReferencesForInstructor: this.fb.array([
        this.newProfessionalReferencesForInstructor(),
        this.newProfessionalReferencesForInstructor(),
      ])
    })
    this.wantToBeInstructorChanged(workHistory);

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
    const workHistory = this.fb.group({
      schoolOrInstitutionName: [null, [Validators.required]],
      startYear: [null, [Validators.required]],
      endYear: [null, [Validators.required]],
      current: [false, [Validators.required]]
    });
    this.wantToBeInstructorChanged(workHistory)
    return workHistory;
  }

  newProfessionalReferencesForInstructor(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      lastName: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      emailAddress: [null, [Validators.required, Validators.pattern(this.validationService.emailPattern), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      mobilePhone: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      numberId: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      let studentsLevel: { studentType: number }[] = [];
      this.studentLevels.forEach(level => {
        if (level.checked) {
          studentsLevel.push({studentType: level.id})
        }
      })
      if (this.actionType === "CREATE") {
        this.savePreferences(studentsLevel);
      } else {
        this.updatePreferences(studentsLevel);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  savePreferences(studentsLevel: { studentType: number }[]): void {
    this.subscription.add(
      this.registrationService.savePreferences({
        ...this.form.value,
        workHistory: this.form.value.wantToBeInstructor ? this.form.value.workHistory : null,
        linkTutorAndStudentTypes: studentsLevel
      }).subscribe(() => this.next.emit())
    );
  }

  updatePreferences(studentsLevel: { studentType: number }[]): void {
    this.subscription.add(
      this.registrationService.updatePreferences({
        ...this.form.value,
        workHistory: this.form.value.wantToBeInstructor ? this.form.value.workHistory : null,
        linkTutorAndStudentTypes: studentsLevel
      }).subscribe(() => this.next.emit())
    )
  }

  selectStudentType(target: any, studentType: StudentLevel) {
    this.updateStudentTypeList(target, studentType);
    this.checkStudentLevelAndUpdateForm();
  }

  checkStudentLevelAndUpdateForm(): void {
    let levelsIsEmpty = true;
    this.studentLevels.forEach(level => {
      if (level.checked) {
        levelsIsEmpty = false;
        return
      }
    })
    levelsIsEmpty ? this.form.get('linkTutorAndStudentTypes')?.setValue(null) : null;
  }

  updateStudentTypeList(target: any, studentType: StudentLevel): void {
    let type = this.studentLevels.find((level) => level === studentType);
    if (target.checked) {
      type ? type.checked = true : null;
      this.form.get('linkTutorAndStudentTypes')?.setValue(true);
    } else {
      type ? type.checked = false : null;
    }
  }

  removeInterview(item: AbstractControl) {
    this.interview.controls = this.interview.controls.filter(control => control != item);
    this.interview.updateValueAndValidity();
  }

  removeWorkHistory(item: AbstractControl) {
    this.workHistory.controls = this.workHistory.controls.filter(control => control != item);
    this.workHistory.updateValueAndValidity();
  }

  removeReferencesForInstructor(item: AbstractControl) {
    this.professionalReferencesForInstructor.controls = this.professionalReferencesForInstructor.controls.filter(control => control != item);
    this.professionalReferencesForInstructor.updateValueAndValidity();
  }

  private initializeListeners(): void {
    this.getStudentLevels();
    this.phoneCods$ = this.infoService.getCountries();
    this.hoursPerWeekForTutor$ = this.infoService.getHoursPerWeekForTutor();
    this.daysOfWeek$ = this.infoService.getDaysOfWeek();
    this.hoursOfDay$ = this.infoService.getHoursOfDay();
    this.tutorExperiences$ = this.infoService.getTutorExperiences();
    this.subscribeToEverTutoredValueChange();
    this.subscribeToEverTutoredOnlineValueChange();
    this.subscribeToWantToBeInstructorValueChange();
  }

  getStudentLevels(): void {
    this.infoService.getStudentLevels().pipe(
      tap((studentLevels: KeyValuePair[]) => {
        this.studentLevels = studentLevels.map(item => {
          let modifyedItem = item as StudentLevel
          modifyedItem.checked = false
          return modifyedItem
        })
      }),
    ).subscribe(() => {
      this.getPreferencesPage();
    });
  }

  getPreferencesPage(): void {
    this.subscription.add(
      this.registrationService.getPreferencesPage(this.storageService.getUserId()).subscribe(preferences => {
        if (preferences) {
          preferences.linkTutorAndStudentTypes.forEach(item => {
            let studentLevel = this.studentLevels?.find(level => level.id === item.studentType);
            if (studentLevel) {
              studentLevel.checked = true;
              this.form.get('linkTutorAndStudentTypes')?.setValue(true)
            }
          })
          this.actionType = "UPDATE";
          this.form.patchValue(preferences);
          this.patchInterview(preferences);
          this.patchWorkHistory(preferences);
          this.patchProfessionalReferencesForInstructor(preferences);
        } else {
          this.actionType = "CREATE";
        }
      })
    );
  }

  patchInterview(preferences: Preferences): void {
    if (preferences.interview.length) {
      this.interview.controls = [];
      preferences.interview.forEach(item => {
        const interview = this.newInterview();
        interview.patchValue(item);
        this.interview?.controls.push(interview);
      })
      this.interview.updateValueAndValidity();
    }
  }

  patchWorkHistory(preferences: Preferences): void {
    if (preferences.workHistory.length) {
      this.workHistory.controls = [];
      preferences.workHistory.forEach(item => {
        const workHistory = this.newWorkHistory();
        workHistory.patchValue(item);
        this.workHistory?.controls.push(workHistory);
      })
      this.workHistory.updateValueAndValidity();
    }
  }

  patchProfessionalReferencesForInstructor(preferences: Preferences): void {
    if (preferences.professionalReferencesForInstructor.length) {
      this.professionalReferencesForInstructor.controls = [];
      preferences.professionalReferencesForInstructor.forEach(item => {
        const professionalReferencesForInstructor = this.newProfessionalReferencesForInstructor();
        professionalReferencesForInstructor.patchValue(item);
        this.professionalReferencesForInstructor?.controls.push(professionalReferencesForInstructor);
      })
      this.professionalReferencesForInstructor.updateValueAndValidity();
    }
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

  wantToBeInstructorChanged(form: FormGroup): void {
    this.subscription.add(
      form.get('current')?.valueChanges.subscribe(value => {
        if (value === true) {
          form.get('endYear')?.reset();
          form.get('endYear')?.removeValidators(Validators.required);
          form.get('endYear')?.disable();
          form.get('endYear')?.updateValueAndValidity();
        } else {
          form.get('endYear')?.enable();
          form.get('endYear')?.addValidators(Validators.required);
        }
        form.get('endYear')?.updateValueAndValidity();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
