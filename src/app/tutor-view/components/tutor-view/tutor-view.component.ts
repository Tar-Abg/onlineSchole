import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {TutorViewService} from "../../services/tutor-view.service";
import {Certificates, Institutions, ProfileInfo, Subjects, TutorAvailabilities} from "../../models/tutor-view.model";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {switchMap} from "rxjs/operators";
import {TutorBaseInfo, TutorRatings, TutorReviews} from "../../../tutor-profile/models/tutor.model";

@Component({
  selector: 'app-tutor-view',
  templateUrl: './tutor-view.component.html',
  styleUrls: ['./tutor-view.component.scss']
})
export class TutorViewComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  tutorInfo: ProfileInfo;
  institutions: Institutions[];
  certificates: Certificates[];
  availabilities: TutorAvailabilities;
  subjects: Subjects[];
  reviews: TutorReviews[];
  ratings: TutorRatings;

  bio: string;
  wrapUp: string;
  originalBioContent: string;
  originalWrapUpContent: string;

  isBioContentToggled: boolean;
  isWrapUpContentToggled: boolean;

  limit = 150;


  constructor(
    private router: ActivatedRoute,
    private tutorViewService: TutorViewService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.router.params.pipe(
        switchMap(data => {
          const userId = this.storageService.getUserId();
          this.getInstitutions(userId, data.id);
          this.getTutorCertificates(userId, data.id);
          this.getAvailabilities(userId, data.id);
          this.getTutorSubjects(userId, data.id);
          this.getTutorReviews(userId, data.id);
          this.getTutorRatings(userId, data.id);
          return this.tutorViewService.getProfileInfo(userId, data.id);
        })
      ).subscribe((tutorInfo) => {
        this.tutorInfo = tutorInfo;
        this.setTutorBaseInfo(tutorInfo);
      })
    )
  }

  getInstitutions(userId: number, tutorId: number): void {
    this.subscription.add(
      this.tutorViewService.getInstitutions(userId, tutorId).subscribe((institutions) => {
        this.institutions = institutions;
      })
    )
  }

  toggleContent(contentType: string): void {
    if (contentType === 'bio') {
      this.bio = this.formatContent(this.bio, this.originalBioContent, contentType);
    } else {
      this.wrapUp = this.formatContent(this.wrapUp, this.originalWrapUpContent, contentType);
    }
  }

  formatContent(content: string, originalContent: string, type: string) {
    if(type === 'bio') {
      return  this.formatBioContent(content, originalContent);
    } else {
      return this.formatWrapUpContent(content, originalContent);
    }
  }

  formatBioContent(content: string, originalContent: string): string {
    if (!this.isBioContentToggled) {
      if (content?.length > this.limit) {
        this.isBioContentToggled = true;
        return `${content.substr(0, this.limit)}...`;
      } else {
        return content;
      }
    } else {
      this.isBioContentToggled = false;
      return originalContent;
    }
  }

  formatWrapUpContent(content: string, originalContent: string): string {
    if (!this.isWrapUpContentToggled) {
      if (content?.length > this.limit) {
        this.isWrapUpContentToggled = true;
        return `${content.substr(0, this.limit)}...`;
      } else {
        return content;
      }
    } else {
      this.isWrapUpContentToggled = false;
      return originalContent;
    }
  }

  setTutorBaseInfo(tutorInfo: ProfileInfo): void {
    if (tutorInfo) {
      this.originalBioContent = tutorInfo.bio;
      this.bio = this.formatContent(tutorInfo.bio, this.originalBioContent, 'bio');
      this.originalWrapUpContent = tutorInfo.wrapUp;
      this.wrapUp = this.formatContent(tutorInfo.wrapUp, this.originalWrapUpContent, 'wrapUp');
    }
  }

  getTutorCertificates(userId: number, tutorId: number): void {
    this.subscription.add(
      this.tutorViewService.getTutorCertificates(userId, tutorId).subscribe(data => {
        this.certificates = data;
      })
    )
  }

  getAvailabilities(userId: number, tutorId: number): void {
    this.subscription.add(
      this.tutorViewService.getAvailabilities(userId, tutorId).subscribe(data => {
        this.availabilities = data;
      })
    )
  }

  getTutorSubjects(userId: number, tutorId: number): void {
    this.subscription.add(
      this.tutorViewService.getTutorSubjects(userId, tutorId).subscribe(data => {
        this.subjects = data;
      })
    )
  }

  getTutorReviews(userId: number, tutorId: number): void {
    this.subscription.add(
      this.tutorViewService.getReviews(userId, tutorId).subscribe(data => {
        this.reviews = data;
      })
    )
  }

  getTutorRatings(userId: number, tutorId: number): void {
    this.subscription.add(
      this.tutorViewService.getRatings(userId, tutorId).subscribe(data => {
        this.ratings = data;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
