import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {TutorService} from "../../services/tutor-service.service";
import {TutorSubjects} from "../../models/tutor.model";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  @Input() userId: number;
  subjects$: Observable<TutorSubjects[]>;

  constructor(
    private tutorService: TutorService
  ) { }

  ngOnInit(): void {
    this.subjects$ = this.tutorService.getSubjects(this.userId);
  }

}
