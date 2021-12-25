import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TutorService} from "../../services/tutor-service.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {LessonSchedule} from "../../models/tutor.model";
import {Observable} from "rxjs";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";

@Component({
  selector: 'app-start-lesson',
  templateUrl: './start-lesson.component.html',
  styleUrls: ['./start-lesson.component.scss']
})
export class StartLessonComponent implements OnInit {
  lessonSchedule$: Observable<LessonSchedule[]>;
  lessonStatuses$: Observable<KeyValuePair[]>;
  isOpenEndLesson: boolean;
  isOpenCancelLesson: boolean;
  isOpenAddLesson: boolean;
  form: FormGroup;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
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
    this.lessonSchedule$ = this.tutorService.getLessons(this.userId, this.form.value);
  }

}
