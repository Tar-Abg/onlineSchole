import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {SettingsService} from "../../../shared/services/settings/settings.service";
import {Observable, Subscription} from "rxjs";
import {TutorAvailabilities, TutorSubjects} from "../../../shared/models/registration.model";
import {BasicInformation} from "../../../tutor/models/tutor.model";
import {tap} from "rxjs/operators";
import {Categories} from "../../../shared/models/infos.model";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  form: FormGroup;
  observables: any = [{
    subjects$: null,
    levels$: null
  }];
  categories$: Observable<Categories[]>;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private infoService: InfosService,
    private settingService: SettingsService
  ) { }

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
      tutorBasicInformationId: [null],
      levelId: [null],
      subjectId: [null],
      categoryId: [null],
      userId:[this.storageService.getUserId()],
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

  removeForm(form: any): void {
    this.formArray.controls = this.formArray.controls.filter(item => item !== form);
    this.formArray.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.form.valid) {
        this.updateTutorSubjects();
    }
  }

  updateTutorSubjects(): void {
    this.subscription.add(
      this.settingService.updateTutorSubjects(this.formArray.value).subscribe()
    );
  }

  patchTutorSubjects(data: TutorSubjects[]): void {
    if (data.length) {
      this.formArray.controls = [];
      this.observables = [];
      data.forEach(item => {
        const tutorSubjects = this.createNewForm();
        tutorSubjects.patchValue(item);
        this.formArray?.controls.push(tutorSubjects);
        this.observables[this.formArray?.controls.length-1] = {
          subjects$: this.infoService.getSubjectsByCategoryId(item.categoryId),
          levels$: this.infoService.getLevelsBySubjectId(item.subjectId),
        }
      })
      this.formArray.updateValueAndValidity();
    }
  }

  getTutorSubjects(): void {
    this.subscription.add(
      this.settingService.getTutorSubjects(this.storageService.getUserId()).subscribe(data => {
        this.patchTutorSubjects(data);
      })
    )
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
