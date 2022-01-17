import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TutorService} from "../../services/tutor-service.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {LessonSchedule} from "../../models/tutor.model";
import {Observable} from "rxjs";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {StudentProfileService} from "../../../student-profile/services/student-profile.service";

@Component({
  selector: 'app-start-lesson',
  templateUrl: './start-lesson.component.html',
  styleUrls: ['./start-lesson.component.scss']
})
export class StartLessonComponent implements OnInit {
  @Input() title: string = 'Entered lesson';
  @Input() userType: 'tutor' | 'student' = 'tutor';
  lessonSchedule$: Observable<LessonSchedule[]>;
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
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.storageService.getUserId();
    this.lessonStatuses$ = this.infoService.getLessonStatuses();
  }

  initializeForm(): void{
    this.form = this.fb.group({
      statusId: [null],
      from: [null],
      to: [null],
    })
  }

  onSubmit(): void {
    if (this.userType === "tutor") {
      this.lessonSchedule$ = this.tutorService.getLessons(this.userId, this.form.value);
    } else {
      this.lessonSchedule$ = this.studentProfileService.getLessons(this.userId, this.form.value);
    }
    this.formSubmitted = true;
  }

  openCancelLessonModal(lessonId: number): void {
    this.isOpenCancelLesson = true;
    this.selectedLessonId = lessonId;
  }
}
