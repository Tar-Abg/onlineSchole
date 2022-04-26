import {Component, OnDestroy, OnInit} from '@angular/core';
import {TutorService} from "../../services/tutor-service.service";
import {Observable, Subscription} from "rxjs";
import {TutorBaseInfo, TutorRatings} from "../../models/tutor.model";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss']
})
export class TutorProfileComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  ratings$: Observable<TutorRatings>;
  userId: number;
  activeTab: "PROFILE" | "START_LESSON" | "MESSAGES" | "JOBS_BOARD" | "PAYMENTS" | "LESSON_HISTORY" = "PROFILE";
  tutorBaseInfo: TutorBaseInfo;


  constructor(
    private tutorService: TutorService,
    private storageService: StorageService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.storageService.getUserId();
    this.initializeSubscriptions();
    this.subscribeRouterEvents();
  }

  initializeSubscriptions(): void {
    this.getBaseInfo();
    this.ratings$ = this.tutorService.getRatings(this.userId);
  }

  subscribeRouterEvents(): void {
    this.subscription.add(
      this.route.queryParams.subscribe((data) => {
        if(data.userId) {
          this.activeTab = 'MESSAGES';
        }
      })
    );
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
