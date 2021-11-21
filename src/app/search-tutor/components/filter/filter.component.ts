import {Component, OnInit} from '@angular/core';
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Observable} from "rxjs";
import {Categories, DaysOfWeek, Subjects} from "../../../shared/models/infos.model";
import {MatSelectChange} from "@angular/material/select";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {map} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchTutorService} from "../../services/search-tutor.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  categories$: Observable<Categories[]>;
  subjects$: Observable<Subjects[]>;
  availableHours$: Observable<DaysOfWeek[]>;
  genderList$: Observable<KeyValuePair[]>;
  studentLevels$: Observable<KeyValuePair[]>;
  sortForTutorSearch$: Observable<KeyValuePair[]>;
  form: FormGroup;

  constructor(
    private infoService: InfosService,
    private fb: FormBuilder,
    private searchTutorService: SearchTutorService
  ) {
  }

  ngOnInit(): void {
    this.initializeSubscriptions();
    this.initializeForm();
    this.submit();
  }

  getSubject(event: MatSelectChange) {
    this.subjects$ = this.infoService.getSubjectsByCategoryId(event.value);
  }

  initializeSubscriptions(): void {
    this.categories$ = this.infoService.getCategories();
    this.availableHours$ = this.infoService.getDaysOfWeek();
    this.sortForTutorSearch$ = this.infoService.getSortForTutorSearch();
    this.getGenderList();
    this.getStudentLevels();
  }

  getGenderList(): void {
    this.genderList$ = this.infoService.getGenders().pipe(
      map(levels => {
        levels.unshift({id: 999, description: 'All'});
        return levels;
      })
    );
  }

  getStudentLevels(): void {
    this.studentLevels$ = this.infoService.getStudentLevels().pipe(
      map(levels => {
        levels.unshift({id: 999, description: 'All'});
        return levels;
      })
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      categoryId: [null],
      subjectId: [null],
      availabilities: [null],
      genderId: [null],
      minHourlyRate: [null],
      maxHourlyRate: [null],
      studentLevelId: [null],
      sortId: [null],
    })
  }

  submit(): void {
    const body = {
      ...this.form.value,
      genderId: this.form.value.genderId === 999 ? null : this.form.value.genderId,
      studentLevelId: this.form.value.studentLevelId === 999 ? null : this.form.value.studentLevelId,
    }
    this.searchTutorService.formValue$.next(body);
  }
}
