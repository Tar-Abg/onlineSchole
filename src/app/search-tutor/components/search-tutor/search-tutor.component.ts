import {Component, OnInit} from '@angular/core';
import {SearchTutorService} from "../../services/search-tutor.service";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {SearchResultForTutor} from "../../models/search.model";

@Component({
  selector: 'app-search-tutor',
  templateUrl: './search-tutor.component.html',
  styleUrls: ['./search-tutor.component.scss']
})
export class SearchTutorComponent implements OnInit {
  tutorList$: Observable<SearchResultForTutor[] | undefined>;
  pagesCount: number;
  currentPage$: BehaviorSubject<number>;


  constructor(
    private searchTutorService: SearchTutorService
  ) {
  }

  ngOnInit(): void {
    this.tutorList$ = this.searchTutorService.tutorList$.pipe(
      tap(data => {
        if (data?.pagesCount) {
          this.pagesCount = data?.pagesCount;
        }
      }),
      map(data => data?.searchResult)
    );
    this.currentPage$ = this.searchTutorService.pageIndex$;
  }


  changePage(pageNumber: number) {
    this.currentPage$.next(pageNumber);
  }
}
