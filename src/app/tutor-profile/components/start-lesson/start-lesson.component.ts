import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TutorService} from "../../services/tutor-service.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {LessonSchedule} from "../../models/tutor.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-start-lesson',
  templateUrl: './start-lesson.component.html',
  styleUrls: ['./start-lesson.component.scss']
})
export class StartLessonComponent implements OnInit {
  lessonSchedule$: Observable<LessonSchedule[]>;
  isOpenEndLesson: boolean;
  isOpenCancelLesson: boolean;
  isOpenAddLesson: boolean;
  form: FormGroup;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.storageService.getUserId();
  }

  initializeForm(): void{
    this.form = this.fb.group({
      statusId: [null],
      startDate: [null],
      endDate: [null],
    })
  }

  onSubmit(): void {
    this.lessonSchedule$ = this.tutorService.getLessons(this.userId, this.form.value.startDate, this.form.value.statusId || 1);
  }

}
