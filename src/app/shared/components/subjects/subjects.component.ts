import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categories, Observables} from "../../models/infos.model";
import {StorageService} from "../../services/storage/storage.service";
import {InfosService} from "../../services/infos/infos.service";
import {SettingsService} from "../../services/settings/settings.service";
import {TutorSubjects} from "../../models/registration.model";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})

export class SubjectsComponent implements OnInit {
  private readonly subscription: Subscription = new Subscription();
  form: FormGroup;
  observables: Array<Observables> = [{
    subjects$: null,
    levels$: null
  }];
  categories$: Observable<Categories[]>;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private infoService: InfosService,
    private settingService: SettingsService
  ) {
  }

  ngOnInit(): void {
    this.formInitialization();
    this.categories$ = this.infoService.getCategories();
    this.getTutorSubjects();
  }

  private formInitialization(): void {
    this.form = this.fb.group({
      formArray: this.fb.array([this.createNewForm()])
    });
  }

  createNewForm(): FormGroup {
    return this.fb.group({
      levelId: [null],
      subjectId: [null],
      categoryId: [null],
      userId: [this.storageService.getUserId()],
      userType: [this.storageService.getUserType()],
      id: [null]
    });
  }

  get formArray(): FormArray {
    return this.form.get('formArray') as FormArray;
  }

  addNewForm(): void {
    const form = this.createNewForm();
    form.valueChanges.subscribe(() => this.formArray.updateValueAndValidity());
    this.formArray.controls.push(form);
    this.formArray.updateValueAndValidity();
  }

  removeForm(form: any, index: number): void {
    this.formArray.controls = this.formArray.controls.filter((item) => item !== form);
    this.observables.splice(index, 1);
    this.formArray.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.updateTutorSubjects();
    }
  }

  updateTutorSubjects(): void {
    if (this.storageService.getUserType() === 1) {
      this.subscription.add(
        this.settingService.updateTutorSubjects(this.formArray.value).subscribe()
      );
    } else {
      this.subscription.add(
        this.settingService.updateStudentSubjects(this.formArray.value).subscribe()
      );
    }
  }

  patchTutorSubjects(data: TutorSubjects[]): void {
    if (data.length) {
      this.formArray.controls = [];
      this.observables = [];
      data.forEach(item => {
        const tutorSubjects = this.createNewForm();
        tutorSubjects.patchValue(item);
        this.formArray?.controls.push(tutorSubjects);
        this.observables[this.formArray?.controls.length - 1] = {
          subjects$: this.infoService.getSubjectsByCategoryId(item.categoryId),
          levels$: this.infoService.getLevelsBySubjectId(item.subjectId),
        }
      })
      this.formArray.updateValueAndValidity();
    }
  }

  getTutorSubjects(): void {
    if (this.storageService.getUserType() === 1) {
      this.subscription.add(
        this.settingService.getTutorSubjects(this.storageService.getUserId()).subscribe(data => {
          this.patchTutorSubjects(data);
        })
      );
    } else {
      this.subscription.add(
        this.settingService.getStudentSubjects(this.storageService.getUserId()).subscribe(data => {
          this.patchTutorSubjects(data);
        })
      );
    }
  }

  categoryChange(event: any, index: number) {
    if (!this.observables[index]) {
      this.observables[index] = {
        subjects$: null,
        levels$: null
      }
    }
    this.observables[index].subjects$ = this.infoService.getSubjectsByCategoryId(event);
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
        this.form.updateValueAndValidity();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
