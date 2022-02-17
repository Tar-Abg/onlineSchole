import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TutorService} from "../../services/tutor-service.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {LessonHistory} from "../../models/tutor.model";

@Component({
  selector: 'app-lesson-history',
  templateUrl: './lesson-history.component.html',
  styleUrls: ['./lesson-history.component.scss']
})
export class LessonHistoryComponent implements OnInit {
  form: FormGroup;
  histories: LessonHistory;
  submitted: boolean;

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  getHistory(): void {
    this.submitted = true;
    const userId = this.storageService.getUserId();
    const body = {
      ...this.form.value, userId
    }

    this.tutorService.getTutorLessonHistory(body).subscribe((histories) => this.histories = histories);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      from: [null],
      to: [null],
    });
  }

}
