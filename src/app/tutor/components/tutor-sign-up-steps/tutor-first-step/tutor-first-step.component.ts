import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Categories, Country, Level, Observables, Subjects} from "../../../../shared/models/infos.model";
import {InfosService} from "../../../../shared/services/infos/infos.service";
import {KeyValuePair} from "../../../../shared/models/keyValuePair.model";
import {RegistrartionService} from "../../../../shared/services/registration/registrartion.service";
import {StorageService} from "../../../../shared/services/storage/storage.service";
import {BasicInformation} from "../../../models/tutor.model";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-tutor-first-step',
  templateUrl: './tutor-first-step.component.html',
  styleUrls: ['./tutor-first-step.component.scss']
})
export class TutorFirstStepComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  categories$: Observable<Categories[]>;
  subjects$: Observable<Subjects[]>;
  levels$: Observable<Level[]>;
  cancelationHours$: Observable<KeyValuePair[]>;
  countries$: Observable<Country[]>;
  private actionType: "CREATE" | "UPDATE" = "CREATE";
  observables: Array<Observables> = [{
    subjects$: null,
    levels$: null
  }]

  constructor(
    private fb: FormBuilder,
    private infoService: InfosService,
    private registrationService: RegistrartionService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeListeners();
  }


  getBasicInformation(): void {
    this.subscription.add(
      this.registrationService.getBasicInformation(this.storageService.getUserId()).subscribe(information => {
        if (information) {
          this.actionType = "UPDATE";
          this.form.patchValue(information);
          this.patchTutorSubjects(information);
        } else {
          this.actionType = "CREATE"
        }
      })
    );
  }

  patchTutorSubjects(preferences: BasicInformation): void {
    if (preferences.tutorSubjects.length) {
      this.tutorSubjects.controls = [];
      this.observables = [];
      preferences.tutorSubjects.forEach(item => {
        const tutorSubjects = this.newTutorSubjects();
        tutorSubjects.patchValue(item);
        this.tutorSubjects?.controls.push(tutorSubjects);
        this.observables[this.tutorSubjects?.controls.length-1] = {
          subjects$: this.infoService.getSubjectsByCategoryId(item.categoryId),
          levels$: this.infoService.getLevelsBySubjectId(item.subjectId),
        }
      })
      this.tutorSubjects.updateValueAndValidity();
    }
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      hourlyRate: [null, [Validators.required]],
      cancellationId: [1],
      tutorSubjects: this.fb.array([
        this.newTutorSubjects()
      ]),
      userAddress: this.fb.group({
        countryId: [null, [Validators.required]],
        city: [null, [Validators.required]],
        streetNumber: [null, [Validators.required]],
        streetName: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        socialSecurityNumber: [null],
      })
    })
  }

  newTutorSubjects(): FormGroup {
    return this.fb.group({
      id: [null],
      categoryId: [null, [Validators.required]],
      subjectId: [null, [Validators.required]],
      levelId: [null],
    });
  }

  initializeListeners(): void {
    this.categories$ = this.infoService.getCategories();
    this.cancelationHours$ = this.infoService.getCancelationHours();
    this.countries$ = this.infoService.getCountries();
    this.getBasicInformation();
  }

  get tutorSubjects(): FormArray {
    return this.form?.get("tutorSubjects") as FormArray;
  }

  get userAddress(): FormGroup {
    return this.form.get("userAddress") as FormGroup;
  }

  addTutorSubjects(): void {
    this.tutorSubjects.push(this.newTutorSubjects());
  }

  removeTutorSubjects(item: AbstractControl): void {
    this.tutorSubjects.controls = this.tutorSubjects.controls.filter(control => control != item);
    this.tutorSubjects.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.actionType === "CREATE") {
        this.saveBasicInformation();
      } else {
        this.updateBasicInformation();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveBasicInformation(): void {
    this.subscription.add(
      this.registrationService.saveBasicInformation(this.form.value).subscribe(() => this.next.emit())
    );
  }

  updateBasicInformation(): void {
    this.subscription.add(
      this.registrationService.updateBasicInformation(this.form.value).subscribe(() => this.next.emit())
    );
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
