import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TutorProfileRoutingModule} from './tutor-profile-routing.module';
import {TutorProfileComponent} from './components/tutor-profile/tutor-profile.component';
import {AvailabilityComponent} from './components/availability/availability.component';
import {SubjectsComponent} from './components/subjects/subjects.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {RatingsComponent} from './components/ratings/ratings.component';
import {ReviewsComponent} from './components/reviews/reviews.component';


@NgModule({
  declarations: [
    TutorProfileComponent,
    AvailabilityComponent,
    SubjectsComponent,
    CalendarComponent,
    RatingsComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    TutorProfileRoutingModule,
  ]
})
export class TutorProfileModule {
}
