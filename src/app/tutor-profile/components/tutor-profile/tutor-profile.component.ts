import {Component, OnDestroy, OnInit} from '@angular/core';
import {TutorService} from "../../services/tutor-service.service";
import {Observable, Subscription} from "rxjs";
import {TutorBaseInfo, TutorRatings} from "../../models/tutor.model";

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss']
})
export class TutorProfileComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  ratings$: Observable<TutorRatings>;
  userId: number = 67; //will be removed
  activeTab: "PROFILE" | "START_LESSON" | "MESSAGES" | "JOBS_BOARD" | "PAYMENTS" | "LESSON_HISTORY" = "PROFILE";
  tutorBaseInfo: TutorBaseInfo;


  constructor(
    private tutorService: TutorService
  ) {
  }

  ngOnInit(): void {
    this.initializeSubscriptions();
  }

  initializeSubscriptions(): void {
    this.getBaseInfo();
    this.ratings$ = this.tutorService.getRatings(this.userId);
  }

  getBaseInfo(): void {
    this.subscription.add(
      this.tutorService.getTutorBaseInfo(this.userId).subscribe((tutorBaseInfo: TutorBaseInfo) => {
        this.tutorBaseInfo = tutorBaseInfo;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
