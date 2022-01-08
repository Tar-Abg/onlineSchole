import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InfosService} from "../../services/infos/infos.service";
import {Observable} from "rxjs";
import {KeyValuePair} from "../../models/keyValuePair.model";
import {TutorService} from "../../../tutor-profile/services/tutor-service.service";
import {SearchTutor} from "../../../tutor-profile/models/tutor.model";

@Component({
  selector: 'app-jobs-board-dashboard',
  templateUrl: './jobs-board-dashboard.component.html',
  styleUrls: ['./jobs-board-dashboard.component.scss']
})
export class JobsBoardDashboardComponent implements OnInit {
  students$: Observable<SearchTutor[]>;
  sortForStudentSearch$: Observable<KeyValuePair[]>;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private infoService: InfosService,
    private tutorService: TutorService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      subjectId: [2, [Validators.required]],
      sortId: [],
    });
    this.sortForStudentSearch$ = this.infoService.getSortForStudentSearch();
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.form.valid && (this.students$ = this.tutorService.getStudents(this.form.value));
  }
}
