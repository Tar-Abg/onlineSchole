import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {Observable, Subscription} from "rxjs";
import {Categories, Observables, StudentAvailableHours} from "../../../shared/models/infos.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {map, tap} from "rxjs/operators";
import {RegistrationService} from "../../../shared/services/registration/registration.service";
import {StudentWantedLessons} from "../../../shared/models/registration.model";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-second-step',
  templateUrl: './student-second-step.component.html',
  styleUrls: ['./student-second-step.component.scss']
})

export class StudentSecondStepComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  categories$: Observable<Categories[]>;
  lessonsCounts$: Observable<KeyValuePair[]>;
  availableHours: any[];
  selectedDays: any[] = [];
  isDisabledCalendar: boolean;
  private actionType: "CREATE" | "UPDATE" = "CREATE";
  form: FormGroup;
  observables: Array<Observables> = [{
    subjects$: null,
    levels$: null
  }];

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private infoService: InfosService,
    private registrationService: RegistrationService,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.initializeForm();
    this.initializeListeners();
    this.registrationService.stepNumber$.next(2);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      sessionsCountId: [null],
      isFlexible: [false],
      studentSubjects: this.fb.array([
        this.newStudentSubjects()
      ]),
      availabilities: [null],
    })
  }

  initializeListeners(): void {
    this.categories$ = this.infoService.getCategories()
    this.lessonsCounts$ = this.infoService.getStudentWantedLessonsCounts();
    this.getStudentAvailableHours();
    this.getStudentWantedLessons();
  }

  getStudentAvailableHours(): void {
    this.infoService.getStudentAvailableHours().pipe(
      map((item: StudentAvailableHours[]) => {
        return item.map((studentAvailableHours) => {
          let calendarItem: any = {};
          calendarItem[studentAvailableHours.id] = studentAvailableHours;
          calendarItem.days = [];
          for (let i = 0; i < 7; i++) {
            calendarItem.days.push({partOfDayId: studentAvailableHours.id, dayId: i + 1, checked: false})
          }
          return calendarItem
        })
      })
    ).subscribe((data: any) => this.availableHours = data);
  }

  categoryChange(event: any, index: number, form: any) {
    if (!this.observables[index]) {
      this.observables[index] = {
        subjects$: null,
        levels$: null
      }
    }
    this.observables[index].subjects$ = this.infoService.getSubjectsByCategoryId(event);
    form.get('levelId').reset()
    form.get('levelId').updateValueAndValidity();
  }

  newStudentSubjects(): FormGroup {
    return this.fb.group({
      id: [null],
      categoryId: [null, [Validators.required]],
      subjectId: [null, [Validators.required]],
      levelId: [null, []],
    });
  }

  get studentSubjects(): FormArray {
    return this.form?.get("studentSubjects") as FormArray;
  }

  subjectChange(event: any, index: number, form: any) {
    this.observables[index].levels$ = this.infoService.getLevelsBySubjectId(event).pipe(
      tap(list => {
        if (list.length) {
          form.get('levelId')?.setValidators(Validators.required);
          form.get('levelId').updateValueAndValidity()
        } else {
          form.get('levelId')?.removeValidators(Validators.required);
          form.get('levelId').updateValueAndValidity()
        }
        this.form.updateValueAndValidity()
      })
    );
  }

  removeStudentSubjects(item: AbstractControl): void {
    this.studentSubjects.controls = this.studentSubjects.controls.filter(control => control != item);
    this.studentSubjects.updateValueAndValidity();
  }

  addStudentSubjects(): void {
    this.studentSubjects.push(this.newStudentSubjects());
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.actionType === "CREATE") {
        this.saveStudentWantedLessons();
      } else {
        this.updateStudentWantedLessons();
        this.form.markAllAsTouched();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveStudentWantedLessons(): void {
    this.subscription.add(
      this.registrationService.saveStudentWantedLessons({
        ...this.form.value,
        availabilities: this.selectedDays
      }).subscribe(() => this.nextStep())
    )
  }

  updateStudentWantedLessons(): void {
    this.subscription.add(
      this.registrationService.updateStudentWantedLessons({
        ...this.form.value,
        availabilities: this.selectedDays
      }).subscribe(() => this.nextStep())
    )
  }

  getStudentWantedLessons(): void {
    this.subscription.add(
      this.registrationService.getStudentWantedLessons(this.storageService.getUserId()).subscribe((data) => {
        if (data) {
          this.actionType = "UPDATE";
          this.form.patchValue(data);
          this.patchStudentSubjects(data);
        } else {
          this.actionType = "CREATE";
        }
      })
    )
  }

  patchStudentSubjects(data: StudentWantedLessons): void {
    if (data.studentSubjects.length) {
      this.studentSubjects.controls = [];
      this.observables = [];
      data.studentSubjects.forEach(item => {
        const studentSubjects = this.newStudentSubjects();
        studentSubjects.patchValue(item);
        this.studentSubjects?.controls.push(studentSubjects);
        this.observables[this.studentSubjects?.controls.length - 1] = {
          subjects$: this.infoService.getSubjectsByCategoryId(item.categoryId),
          levels$: this.infoService.getLevelsBySubjectId(item.subjectId),
        }
      });
      this.removeSelectedDaysProperty(data);
      this.checkDaysInputs();
      this.studentSubjects.updateValueAndValidity();
    }
  }

  checkDaysInputs(): void {
    this.selectedDays.forEach((day) => {
      setTimeout(() => {
        this.availableHours.forEach((hours: any) => {
          hours.days.forEach((item: any) => {
            if (item.partOfDayId == day.partOfDayId && item.dayId == day.dayId) {
              item.checked = true
            }
          })
        })
      }, 0);
    })
  }

  removeSelectedDaysProperty(data: StudentWantedLessons): void {
    this.selectedDays = data.availabilities.map(item => {
      delete item.infoAboutStudentWantedLessonId;
      delete item.id;
      delete item.userId;
      return item;
    })
  }

  isFlexibleChange(value: any) {
    this.isDisabledCalendar = value;
    if (value) {
      this.selectedDays.length = 0;
      this.availableHours.forEach(hours => {
        hours.days.forEach((item: any) => item.checked = false);
      })
    }
  }

  selectDay(event: MatCheckboxChange, hours: any) {
    delete hours.checked;
    hours.checked = !hours.checked
    if (event.checked) {
      this.selectedDays.push(hours);
    } else {
      this.selectedDays.splice(this.selectedDays.indexOf(hours), 1);
    }
  }

  nextStep(): void {
    this.registrationService.stepNumber$.next(3);
    this.router.navigate(['student/signUp/step-three']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
