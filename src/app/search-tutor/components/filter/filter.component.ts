import {Component, OnInit} from '@angular/core';
import {InfosService} from "../../../shared/services/infos/infos.service";
import {Observable} from "rxjs";
import {Categories, DaysOfWeek, Subjects} from "../../../shared/models/infos.model";
import {MatSelectChange} from "@angular/material/select";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {map} from "rxjs/operators";

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

  constructor(
    private infoService: InfosService
  ) {
  }

  ngOnInit(): void {
    this.initializeSubscriptions();
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

}
