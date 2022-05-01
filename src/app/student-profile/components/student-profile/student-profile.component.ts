import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentProfileService} from "../../services/student-profile.service";
import {Student} from "../../models/student-profile.model";
import {Subscription} from "rxjs";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  activeTab: "PROFILE" | "START_LESSON" | "MESSAGES"  | "PAYMENTS" | "LESSON_HISTORY"  | "FIND_TUTOR" = "PROFILE";
  profileInfo: Student;

  constructor(
    private studentProfileService: StudentProfileService,
    private storageService: StorageService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getProfileInfo();
    this.subscribeRouterEvents();
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

  getProfileInfo(): void {
    const userId = this.storageService.getUserId();
    this.subscription.add(
      this.studentProfileService.getProfileInfo(userId).subscribe(
        profileInfo => this.profileInfo = profileInfo
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
