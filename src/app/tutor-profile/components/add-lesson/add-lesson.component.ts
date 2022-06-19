import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {Observable, Subscription} from "rxjs";
import {Categories, HoursOfDay, LevelForTutor, Minutes, SubjectsForTutor} from "../../../shared/models/infos.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {TutorService} from "../../services/tutor-service.service";

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit, OnDestroy {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  private readonly subscription: Subscription = new Subscription();
  hoursOfDay$: Observable<HoursOfDay[]>;
  categories$: Observable<Categories[]>;
  subjects$: Observable<SubjectsForTutor[]>;
  levels$: Observable<LevelForTutor[]>;
  minutes$: Observable<Minutes[]>;
  form: FormGroup;
  minDate = new Date();
  linkErrorMessage: string;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private infoService: InfosService,
    private tutorService: TutorService,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.hoursOfDay$ = this.infoService.getHoursOfDay();
    this.categories$ = this.infoService.getTutorCategories(this.storageService.getUserId());
    this.minutes$ = this.infoService.getMinutes();
    this.getSubjects();
    this.getLevels();
    this.clearLinkError();
  }

  getSubjects(): void {
    this.subscription.add(
      this.form.get('categoryId')?.valueChanges.subscribe(categoryId => {
        this.subjects$ = this.infoService.getSubjectsByCategoryIdForTutor(this.storageService.getUserId(), categoryId);
      })
    );
  }

  getLevels(): void {
    this.subscription.add(
      this.form.get('subjectId')?.valueChanges.subscribe(subjectId => {
        this.levels$ = this.infoService.getLevelsBySubjectIdForTutor(this.storageService.getUserId(), subjectId);
      })
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      tutorId: [this.storageService.getUserId(), [Validators.required]],
      userName: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      lessonStartDate: [null, [Validators.required]],
      hour: [null],
      minute: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      subjectId: [null, [Validators.required]],
      meetingLink: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      levelId: [null],
      lessonPlan: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(15), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      hourlyRate: [null],
      hourId: [null, [Validators.required]],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.addLesson();
    } else {
      this.form.markAllAsTouched();
    }
  }

  addLesson(): void {
    this.subscription.add(
      this.tutorService.addLesson(this.form.value).subscribe(
        () => this.onClose.emit(),
        (error) => {
          if (error.error.title) {
            error.error.type === 'Invalid meeting link error' ?
              this.linkErrorMessage = error.error.title
              : this.errorMessage = error.error.title;
          }
        }
      ),
    );
  }

  clearLinkError(): void {
    this.subscription.add(
      this.form.get('meetingLink')?.valueChanges.subscribe(() => {
        this.linkErrorMessage = '';
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
