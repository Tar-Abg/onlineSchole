import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InfosService} from "../../services/infos/infos.service";
import {Observable} from "rxjs";
import {KeyValuePair} from "../../models/keyValuePair.model";
import {TutorService} from "../../../tutor-profile/services/tutor-service.service";
import {SearchTutor} from "../../../tutor-profile/models/tutor.model";
import {Subjects} from "../../models/infos.model";
import {StorageService} from "../../services/storage/storage.service";

@Component({
  selector: 'app-jobs-board-dashboard',
  templateUrl: './jobs-board-dashboard.component.html',
  styleUrls: ['./jobs-board-dashboard.component.scss']
})
export class JobsBoardDashboardComponent implements OnInit {
  students$: Observable<SearchTutor[]>;
  sortForStudentSearch$: Observable<KeyValuePair[]>;
  subjects$: Observable<Subjects[]>;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private infoService: InfosService,
    private tutorService: TutorService,
    private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeListeners();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      subjectId: [null, [Validators.required]],
      sortId: [null],
    });
  }

  initializeListeners(): void {
    this.sortForStudentSearch$ = this.infoService.getSortForStudentSearch();
    this.subjects$ = this.infoService.findAllSubjectsForTutor(this.storageService.getUserId());
  }

  onSubmit(): void {
    this.form.valid && (this.students$ = this.tutorService.getStudents(this.form.value));
  }
}
