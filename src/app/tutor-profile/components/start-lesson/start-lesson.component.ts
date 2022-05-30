import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TutorService} from "../../services/tutor-service.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {LessonSchedule} from "../../models/tutor.model";
import {Observable, Subscription} from "rxjs";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {StudentProfileService} from "../../../student-profile/services/student-profile.service";

@Component({
  selector: 'app-start-lesson',
  templateUrl: './start-lesson.component.html',
  styleUrls: ['./start-lesson.component.scss']
})
export class StartLessonComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  tutorPaymentExistence$: Observable<boolean>;
  @Input() title: string = 'Entered lesson';
  @Input() userType: 'tutor' | 'student' = 'tutor';
  lessonSchedule: LessonSchedule[];
  lessonStatuses$: Observable<KeyValuePair[]>;
  isOpenEndLesson: boolean;
  isOpenCancelLesson: boolean;
  isOpenAddLesson: boolean;
  formSubmitted: boolean;
  form: FormGroup;
  userId: number;
  selectedLessonId: number;

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
    private studentProfileService: StudentProfileService,
    private storageService: StorageService,
    private infoService: InfosService,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.storageService.getUserId();
    this.lessonStatuses$ = this.infoService.getLessonStatuses();
    this.tutorPaymentExistence$ = this.infoService.tutorPaymentExistence(this.userId);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      statusId: [null],
      from: [null],
      to: [null],
    })
  }

  onSubmit(): void {
    if (this.userType === "tutor") {
      this.subscription.add(
        this.tutorService.getLessons(this.userId, this.form.value).subscribe((data) => this.lessonSchedule = data)
      );
    } else {
      this.subscription.add(
        this.studentProfileService.getLessons(this.userId, this.form.value).subscribe((data) => this.lessonSchedule = data)
      );
    }
    this.formSubmitted = true;
  }

  openCancelLessonModal(lessonId: number): void {
    this.isOpenCancelLesson = true;
    this.selectedLessonId = lessonId;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
