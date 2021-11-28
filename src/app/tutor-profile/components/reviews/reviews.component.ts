import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {TutorReviews} from "../../models/tutor.model";
import {TutorService} from "../../services/tutor-service.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() userId: number;
  reviews$: Observable<TutorReviews[]>;

  constructor(
    private tutorService: TutorService
  ) { }

  ngOnInit(): void {
    this.reviews$ = this.tutorService.getReviews(this.userId);
  }

}
