import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {Lesson} from "../../../tutor-profile/models/tutor.model";
import {StudentProfileService} from "../../services/student-profile.service";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Observable} from "rxjs";
import {Subjects, TutorsForStudent} from "../../../shared/models/infos.model";

@Component({
  selector: 'app-lesson-history',
  templateUrl: './lesson-history.component.html',
  styleUrls: ['./lesson-history.component.scss']
})
export class LessonHistoryComponent implements OnInit {
  form: FormGroup;
  histories: Lesson[];
  submitted: boolean;
  subjects$: Observable<Subjects[]>;
  tutorsForStudent$: Observable<TutorsForStudent[]>;

  constructor(
    private fb: FormBuilder,
    private studentProfileService: StudentProfileService,
    private storageService: StorageService,
    private infoService: InfosService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.makeSubscriptions();
  }

  makeSubscriptions(): void {
    const userId = this.storageService.getUserId();
    this.subjects$ = this.infoService.findAllSubjectsForStudent(userId);
    this.tutorsForStudent$ = this.infoService.getTutorsForStudent(userId);
  }

  getHistory(): void {
    this.submitted = true;
    const userId = this.storageService.getUserId();
    const body = {
      ...this.form.value, userId: userId
    }

    this.studentProfileService.getStudentLessonHistory(body).subscribe((histories) => this.histories = histories);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      from: [null],
      to: [null],
      tutorId: [null],
      subjectId: [null],
    });
  }

}
