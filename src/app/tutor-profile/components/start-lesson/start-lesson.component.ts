import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TutorService} from "../../services/tutor-service.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {LessonSchedule} from "../../models/tutor.model";
import {Observable, Subscription} from "rxjs";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {StudentProfileService} from "../../../student-profile/services/student-profile.service";
import {MessageService} from "../../../shared/services/message/message.service";

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
  isOpenEndLessonForTutor: boolean;
  isOpenEndLessonForStudent: boolean;
  isOpenCancelLesson: boolean;
  isOpenAddLesson: boolean;
  formSubmitted: boolean;
  form: FormGroup;
  userId: number;
  selectedLesson: LessonSchedule;

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
    private studentProfileService: StudentProfileService,
    private storageService: StorageService,
    private infoService: InfosService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.storageService.getUserId();
    this.lessonStatuses$ = this.infoService.getLessonStatuses();
    this.tutorPaymentExistence$ = this.infoService.tutorPaymentExistence(this.userId);
    this.checkIsChargeSafety();
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

  openCancelLessonModal(lesson: LessonSchedule): void {
    this.isOpenCancelLesson = true;
    this.selectedLesson = lesson;
  }

  checkIsChargeSafety(): void {
    if (this.userType === 'tutor') {
      this.subscription.add(
        this.tutorService.isChargeSafety(this.userId).subscribe(
          () => {},
          (error) => this.messageService.setNewError(error.error.title)
        )
      )
    }
  }

  startLesson(lesson: LessonSchedule): void {
    if (this.userType === 'tutor' ) {
      this.startLessonForTutor(lesson);
    } else if (this.userType === 'student') {
      this.joinLesson(lesson);
    }
  }

  startLessonForTutor(lesson: LessonSchedule): void {
    this.subscription.add(
      this.tutorService.startLesson(lesson.id).subscribe(
        (updatedLesson: LessonSchedule) => {
          lesson.start = false;
          lesson.cancel = false;
          lesson.end = true;
          lesson.actualStartTime = updatedLesson.actualStartTime;
          window.open(lesson.meetingLink, '_blank');
        },
        (error) => this.messageService.setNewError(error.error.title)
      )
    )
  }

  joinLesson(lesson: LessonSchedule): void {
    this.subscription.add(
      this.studentProfileService.joinLesson(lesson.id).subscribe(() => {
          lesson.join = false;
          lesson.end = true;
          window.open(lesson.meetingLink, '_blank')
        },
        (err) => this.messageService.setNewError(err.error.title)
      ),
    )
  }

  endLesson(lesson: LessonSchedule): void {
    if (this.userType === 'tutor') {
      this.isOpenEndLessonForTutor = true;
    } else {
      this.isOpenEndLessonForStudent = true;
    }
    this.selectedLesson = lesson;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
